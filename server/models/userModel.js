import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    username: { type: String, unique: true, sparse: true }, // Optional
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" }, // Optional profile picture

    // Authentication
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Date, default: null }, // Store as Date instead of Number
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Date, default: null }, // Store as Date instead of Number

    // Fitness Profile
    dateOfBirth: { type: Date, default: null }, // Optional DOB
    age: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    heightCm: { type: Number, required: true, min: 1 }, // Ensures realistic height
    weightKg: { type: Number, required: true, min: 1 }, // Ensures realistic weight
    weightGoal: { type: Number, required: true, min: 1 }, // Ensures valid goal
    activityLevel: {
      type: String,
      enum: [
        "sedentary",
        "lightly active",
        "moderately active",
        "very active",
        "super active",
      ],
      required: true,
    },

    // Fitness Goals
    goalType: {
      type: String,
      enum: ["weight_loss", "muscle_gain", "weight_gain", "maintenance", "recomposition"],
      required: true,
    },

    // Main Goal
    targetCalories: { type: Number, default: 0, min: 0 },
    macros: {
      protein: { type: Number, default: 0, min: 0 },
      carbs: { type: Number, default: 0, min: 0 },
      fats: { type: Number, default: 0, min: 0 },
    },

    // User Preferences
    preferredUnit: { type: String, enum: ["metric", "imperial"], default: "metric" }, // Optional Unit Preference
    role: { type: String, enum: ["user", "admin"], default: "user" }, // Optional Role for Admins

    // Session Management (Future-Proofing)
    tokenExpireAt: { type: Date, default: null }, // Allows manual JWT expiration handling

  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
