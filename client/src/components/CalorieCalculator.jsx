import { useState } from "react";
import { calculateCalories, calculateMacros } from "../utils/calculations";
import styles from "../styles/CalorieCalculator.module.css"; // Import CSS module

function CalorieCalculator() {
  const [unit, setUnit] = useState("metric"); // ✅ State to track unit selection (metric/imperial)
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goalType, setGoalType] = useState("maintenance");
  const [calories, setCalories] = useState(null);
  const [macros, setMacros] = useState(null);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric"); // ✅ Toggle between metric & imperial
    setWeight(""); // Reset values when switching
    setHeight("");
    setHeightFeet("");
    setHeightInches("");
  };

  const handleCalculate = () => {
    let weightKg, heightCm;

    if (unit === "imperial") {
      weightKg = weight * 0.453592; // Convert lbs to kg
      heightCm = heightFeet * 30.48 + heightInches * 2.54; // Convert ft/in to cm
    } else {
      weightKg = parseFloat(weight);
      heightCm = parseFloat(height);
    }

    const totalCalories = calculateCalories(age, gender, heightCm, weightKg, activityLevel, goalType);
    setCalories(Math.round(totalCalories));

    const calculatedMacros = calculateMacros(totalCalories, goalType);
    setMacros(calculatedMacros);
  };

  return (
    <div className={styles.container}>
      <h2>Calorie & Macro Calculator</h2>

      {/* ✅ Toggle Button for Metric/Imperial */}
      <button className={styles.toggleButton} onClick={toggleUnit}>
        Switch to {unit === "metric" ? "Imperial (lbs, ft/in)" : "Metric (kg, cm)"}
      </button>

      <label>Age:</label>
      <input type="number" className={styles.input} value={age} onChange={(e) => setAge(e.target.value)} />

      <label>Gender:</label>
      <select className={styles.select} value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      {/* ✅ Dynamic Inputs Based on Unit Selection */}
      {unit === "metric" ? (
        <>
          <label>Weight (kg):</label>
          <input type="number" className={styles.input} value={weight} onChange={(e) => setWeight(e.target.value)} />

          <label>Height (cm):</label>
          <input type="number" className={styles.input} value={height} onChange={(e) => setHeight(e.target.value)} />
        </>
      ) : (
        <>
          <label>Weight (lbs):</label>
          <input type="number" className={styles.input} value={weight} onChange={(e) => setWeight(e.target.value)} />

          <label>Height (ft & in):</label>
          <input
            type="number"
            className={styles.input}
            placeholder="Feet"
            value={heightFeet}
            onChange={(e) => setHeightFeet(e.target.value)}
          />
          <input
            type="number"
            className={styles.input}
            placeholder="Inches"
            value={heightInches}
            onChange={(e) => setHeightInches(e.target.value)}
          />
        </>
      )}

      <label>Activity Level:</label>
      <select className={styles.select} value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)}>
        <option value="sedentary">Sedentary</option>
        <option value="lightly active">Lightly Active</option>
        <option value="moderately active">Moderately Active</option>
        <option value="very active">Very Active</option>
        <option value="super active">Super Active</option>
      </select>

      <label>Goal Type:</label>
      <select className={styles.select} value={goalType} onChange={(e) => setGoalType(e.target.value)}>
        <option value="maintenance">Maintain Weight</option>
        <option value="weight_loss">Lose Weight</option>
        <option value="muscle_gain">Gain Muscle</option>
        <option value="weight_gain">Gain Weight</option>
      </select>

      <button className={styles.button} onClick={handleCalculate}>Calculate</button>

      {calories !== null && (
        <div className={styles.result}>
          <h3>Daily Calories Needed: <strong>{calories} kcal</strong></h3>
          <h4>Macronutrient Breakdown:</h4>
          <p>Protein: {macros?.protein}g</p>
          <p>Carbs: {macros?.carbs}g</p>
          <p>Fats: {macros?.fats}g</p>
        </div>
      )}
    </div>
  );
}

export default CalorieCalculator;
