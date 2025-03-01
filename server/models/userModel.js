import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Authentication
  verifyOtp: { type: String, default: '' },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: Boolean, default: false} ,
  resetOtp: { type: String, default: '' },
  resetOtpExpireAt: {type: Number, default: 0 },

  // Fitness Profile
  age: { type: Number, required: true },
  gender: { type: String, enum:["male", "female", "other"], required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  weightGoal: { type: Number, required:true },
  activityLevel: {
    type: String,
    enum: ["sedentary", "lightly active", "moderately active", "very active", "super active"],
    required: true
  },

  // Fitness Goals
  goalType: {
    type: String,
    enum: ["weight_loss", "muscle_gain", "weight_gain", "maintenance", "recomposition"],
    required: true
  },

  // Main Goal
  targetCalories: { type: Number, default:0 },
  macros: {
    protein: { type: Number, default:0 },
    carbs: { type:Number, default:0 },
    fats: { type:Number, default:0 },
  }



}, {timestamps: true});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;