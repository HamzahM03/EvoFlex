import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

const userAuth = async (req,res, next)=>{ 
  const {token} = req.cookies;

  if(!token){
    return res.status(401).json({success: false, message: "Not Authorized. Login again"});

  }

  try {
    
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        userId: tokenDecode.id, 
    };
    
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ success: false, message: "Invalid token. Authentication failed." });
    }
    return res.status(500).json({ success: false, message: "Internal Server Error" });
}
}

export default userAuth;