import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";
import crypto from "crypto";

export const register = async (req, res) => {
  try {
    // Step 1: Extract and Normalize Data
    let { name, email, password, age, gender, height, weight, weightGoal, activityLevel, goalType } = req.body;
    email = email?.toLowerCase().trim(); // Ensures case insensitivity

    // Step 2: Validate Required Fields (Improved)
    const requiredFields = ["name", "email", "password", "age", "gender", "height", "weight", "weightGoal", "activityLevel", "goalType"];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(", ")}` 
      });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Step 3: Check if User Already Exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Step 4: Hash Password (Security Best Practice)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 5: Calculate Calories & Macros
    const targetCalories = calculateCalories(age, gender, height, weight, activityLevel, goalType);
    const macros = calculateMacros(targetCalories, goalType);

    // Step 6: Create & Save User
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
      height,
      weight,
      weightGoal,
      activityLevel,
      goalType,
      targetCalories,
      macros,
    });

    await user.save();

    // Step 7: Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // Step 8: Set Secure Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Step 9: Send Welcome Email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to EvoFlex",
      text: `Welcome to EvoFlex! Your account has been created successfully. Start tracking your fitness journey now!`,
    };

    await transporter.sendMail(mailOptions);

    // Step 10: Respond with Success Message
    return res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (error) {
    // Proper Error Handling
    console.error("Registration Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const login = async (req,res)=>{
  const {email, password} = req.body;
  const normalizedEmail = email?.toLowerCase();

  if(!normalizedEmail || !password) {
    return res.status(400).json({success: false, message: "Email and Password are required"})
  }

  try {

    const user = await userModel.findOne({email: normalizedEmail});

    if(!user){
      return res.status(401).json({success:false, message: "Invalid email or password"});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(401).json({success: false, message: "Invalid email or password"});
    }
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    
    return res.status(200).json({success: true, message: "Login successful"});

  } catch (error) {
    return res.status(500).json({success:false, message: error.message})
  }
}

export const logout = async (req,res)=>{
  try {
   await res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    })

    return res.status(200).json({success: true, message: "Logged out"})
    
  } catch (error) {
    return res.status(500).json({success:false, message: error.message})
  }
}


// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req,res)=>{
  try {
    const userId = req.user.userId;
    
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.verifyOtp && user.verifyOtpExpireAt > Date.now()) {
      return res.status(429).json({ success: false, message: "An OTP has already been sent. Please wait before requesting a new one." });
    }
    

    if(user.isAccountVerified){
      return res.json({success: false, message: "Account already verified"});
    }

  //Generate a 6-digit OTP
   const otp = String(Math.floor(100000 + Math.random() * 900000));
   // Hash OTP before storing
   const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

   user.verifyOtp = hashedOtp;

   user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

   await user.save();

   const mailOptions = {
     from: process.env.SENDER_EMAIL,
     to: user.email,
     subject: 'Account Verification OTP',
     text: `Your OTP is ${otp}. Verify your account using this OTP.`
   }
   await transporter.sendMail(mailOptions);

   res.json({success: true, message: "Verification OTP sent to email"});

  } catch (error) {
    res.json({success: false, message: error.message});
  }
}

// Verify the email using otp
export const verifyEmail = async (req,res)=>{
  const {otp} = req.body;


  if(!otp){
    return res.json({success: false, message: "Missing OTP"});
  }

  try {
    const user = await userModel.findById(req.user.userId);
    
    if(!user){
      return res.json({success: false, message: "User not found"});
    }

    const hashedOtpInput = crypto.createHash("sha256").update(otp).digest("hex");
    if (user.verifyOtp !== hashedOtpInput) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success: false, message: "OTP Expired"});
    }

      user.isAccountVerified = true;
      user.verifyOtp = '';
      user.verifyOtpExpireAt = 0;

      await user.save();

      return res.json({success: true, message: "Email verified successfully"});

  } catch (error) {
    return res.json({success: false, message: error.message});
  }
}

// Check if user is authenticated
export const isAuthenticated = async (req,res)=>{
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({success: false, message: error.message});
  }
}

// Send Password Reset OTP
export const sendResetOtp = async (req,res)=>{
  const {email} = req.body;
  const normalizedEmail = email?.toLowerCase();

  if(!email){
    return res.json({success: false, message: "Email is required"})
  }

  try {
    const user = await userModel.findOne({email: normalizedEmail});
    if(!user){
      return res.json({success: false, message: "User not found"});
    }

    // Prevent OTP spam: Check if a valid OTP already exists
    if (user.resetOtp && user.resetOtpExpireAt > Date.now()) {
      return res.status(429).json({ success: false, message: "An OTP has already been sent. Please wait before requesting a new one." });
    }

   //Generate a 6-digit OTP
   const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Hash OTP before storing
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    user.resetOtp = hashedOtp;
    user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes expiry

   await user.save();

   const mailOptions = {
     from: process.env.SENDER_EMAIL,
     to: user.email,
     subject: 'Password Reset OTP',
     text: `Your OTP for resetting your password is ${otp}.
            Use this OTP to proceed with resetting your password.`
   }
   await transporter.sendMail(mailOptions);
    
   return res.json({success: true, message: "OTP sent to your email"});

  } catch (error) {
    return res.json({success: false, message: error.message})
  }

}

// Reset User Password
export const resetPassword = async(req,res)=>{
  const {email, otp, newPassword} = req.body;
  const normalizedEmail = email?.toLowerCase();

  if(!email || !otp || !newPassword){
    return res.json({success: false, message: "Email,OTP, and new password are required"});
  }

  try {
    const user = await userModel.findOne({email: normalizedEmail});
    if(!user){
      return res.json({success: false, message: "User not found"});
    }
    
    const hashedOtpInput = crypto.createHash("sha256").update(otp).digest("hex");

    if (user.resetOtp !== hashedOtpInput) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if(user.resetOtpExpireAt < Date.now()){
      return res.json({success: false, message: "OTP Expired"});
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }
    

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({success: true, message: "Password has been reset successfully"});

  } catch (error) {
    return res.json({ success:false, message: error.message });
  }
}
