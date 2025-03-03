import { useState } from "react";
import styles from "../styles/CalorieCalculator.module.css"; 
import { calculateMacros, calculateCalories } from "../utility/calculations";

function CalorieCalculator() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [goalType, setGoalType] = useState("maintenance");
  const [calories, setCalories] = useState(null);
  const [macros, setMacros] = useState(null);

  const handleCalculate = () => {
    const totalCalories = calculateCalories(age, gender, height, weight, activityLevel, goalType);
    setCalories(Math.round(totalCalories));

    const calculatedMacros = calculateMacros(totalCalories, goalType);
    setMacros(calculatedMacros);
  };

  return (
    <div className={styles.container}>
      <h2>Calorie & Macro Calculator</h2>

      <label>Age:</label>
      <input type="number" className={styles.input} value={age} onChange={(e) => setAge(e.target.value)} />

      <label>Gender:</label>
      <select className={styles.select} value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <label>Weight (kg):</label>
      <input type="number" className={styles.input} value={weight} onChange={(e) => setWeight(e.target.value)} />

      <label>Height (cm):</label>
      <input type="number" className={styles.input} value={height} onChange={(e) => setHeight(e.target.value)} />

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
