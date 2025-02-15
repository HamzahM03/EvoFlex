export const heightToCm = (heightFeet, heightInches) => {

  return ((heightFeet * 12) + heightInches) * 2.54;
}

export const weightToKg = (weight) => {
  return weight / 2.205;
}

export const calculateCalories = (gender, age, weight, heightFeet, heightInches, activityLevel) => {
  
  // Convert weight to kg
  const weightKg = weightToKg(weight);
  
  // Convert height to cm
  const heightCm = heightToCm(heightFeet, heightInches);

  const genderLower = gender.toLowerCase();

  // Calculate BMR using the Harris-Benedict equation
  let bmr;
  if (genderLower === "male") {
    bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
  } else if (genderLower === "female") {
    bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
  } else {
    // If gender is non-binary, use a basic average BMR calculation
    bmr = 500 + (11 * weightKg) + (4.5 * heightCm) - (4.5 * age);
  }

  // Adjust BMR based on activity level
  let activityMultiplier;
  switch (activityLevel) {
    case "sedentary":
      activityMultiplier = 1.2;
      break;
    case "light":
      activityMultiplier = 1.375;
      break;
    case "moderate":
      activityMultiplier = 1.55;
      break;
    case "active":
      activityMultiplier = 1.725;
      break;
    case "extra-active":
      activityMultiplier = 1.9;
      break;
    default:
      activityMultiplier = 1.2; // Default to sedentary
      break;
  }

  // Calculate daily caloric needs
  const dailyCalories = Math.round(bmr * activityMultiplier);

  return dailyCalories;
};
