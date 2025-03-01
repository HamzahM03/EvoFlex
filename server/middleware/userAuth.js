import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => { 
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
  }

  try {
    // Decode token
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID
    const user = await userModel.findById(tokenDecode.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found. Please log in again." });
    }

    if (user.tokenExpireAt && user.tokenExpireAt < new Date()) {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    }

    // Attach user info to request
    req.user = {
      userId: user._id,
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token. Authentication failed." });
    }
    
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default userAuth;
