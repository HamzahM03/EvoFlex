import Joi from "joi";

export const registrationSchema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  dateOfBirth: Joi.date().optional(),
  age: Joi.number().integer().positive().required(),
  gender: Joi.string().valid("male", "female", "other").required(),

  // Height (Metric or Imperial)
  height: Joi.alternatives()
    .try(Joi.number().min(50).max(300)) // Ensures realistic height range in cm
    .when("preferredUnit", { is: "metric", then: Joi.required() }),

  heightFeet: Joi.alternatives()
    .try(Joi.number().integer().min(1).max(8), Joi.string().pattern(/^\d+$/))
    .when("preferredUnit", { is: "imperial", then: Joi.required() }),

  heightInches: Joi.alternatives()
    .try(Joi.number().integer().min(0).max(11), Joi.string().pattern(/^\d+$/))
    .when("preferredUnit", { is: "imperial", then: Joi.required() }),

  // Weight (Ensure Positive Value)
  weight: Joi.alternatives()
    .try(Joi.number().min(1), Joi.string().pattern(/^\d+$/))
    .required(),

  weightGoal: Joi.number().min(1).required(), // Ensures goal weight is valid

  activityLevel: Joi.string().valid(
    "sedentary", "lightly active", "moderately active", "very active", "super active"
  ).required(),

  goalType: Joi.string().valid(
    "weight_loss", "muscle_gain", "weight_gain", "maintenance", "recomposition"
  ).required(),

  preferredUnit: Joi.string().valid("metric", "imperial").optional(),

  profilePic: Joi.string().uri().optional()
});
