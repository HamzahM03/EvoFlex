export const calculateCalories = (age, gender, heightCm, weightKg, activityLevel, goalType) => {
  // Basal Metabolic Rate (BMR) Calculation using Mifflin-St Jeor Equation
  let bmr;
  if (gender === "male") {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    "sedentary": 1.2,
    "lightly active": 1.375,
    "moderately active": 1.55,
    "very active": 1.725,
    "super active": 1.9
  };

  const dailyCalories = bmr * (activityMultipliers[activityLevel] || 1.2);

  // Adjust for goal type
  if (goalType === "weight_loss") return dailyCalories - 500;  // Lose 1 lb per week
  if (goalType === "weight_gain") return dailyCalories + 500;  // Gain 1 lb per week
  if (goalType === "muscle_gain") return dailyCalories + 250;  // Slight surplus for muscle gain
  return dailyCalories; // Maintenance or recomposition
};

// Calculate Macros (Protein, Carbs, Fats) based on calorie needs
export const calculateMacros = (calories, goalType) => {
  let proteinPercentage, fatPercentage, carbPercentage;

  if (goalType === "weight_loss") {
    proteinPercentage = 0.40; // Higher protein intake
    fatPercentage = 0.30;
    carbPercentage = 0.30;
  } else if (goalType === "muscle_gain") {
    proteinPercentage = 0.30;
    fatPercentage = 0.25;
    carbPercentage = 0.45;
  } else {
    proteinPercentage = 0.25;
    fatPercentage = 0.30;
    carbPercentage = 0.45;
  }

  return {
    protein: Math.round((calories * proteinPercentage) / 4),  // 1g protein = 4 kcal
    fats: Math.round((calories * fatPercentage) / 9),         // 1g fat = 9 kcal
    carbs: Math.round((calories * carbPercentage) / 4)        // 1g carb = 4 kcal
  };
};
