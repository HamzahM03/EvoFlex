import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Results.module.css"; // Create this CSS file for styling
import { assignMacros } from "../Utils/calculations";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the values passed via location.state
  const { calculatedCalories, goal, weight } = location.state || {};  // Safely access state with optional chaining
 
 // Calculate macros based on goal
 const macros = calculatedCalories ? assignMacros(goal, weight, calculatedCalories) : null;

  // Define surplus and deficit for weight gain/loss
  const calorieSurplus = calculatedCalories ? calculatedCalories + 500 : null;
  const calorieDeficit = calculatedCalories ? calculatedCalories - 500 : null;

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>Your Daily Caloric Needs</h2>

      {calculatedCalories ? (
        <div className={styles.calorieInfo}>
          {/* Conditionally render based on the goal */}
          {goal === "lose" && calorieDeficit && (
            <p>📉 **To Lose Weight**: {calorieDeficit} calories/day</p>
          )}
          <p>🔹 **Maintenance Calories**: {calculatedCalories} calories/day</p>
          {goal === "gain" && calorieSurplus && (
            <p>📈 **To Gain Weight**: {calorieSurplus} calories/day</p>
          )}

          {/* Display macronutrients */}
          {macros && (
            <div>
              <h3>Macronutrient Breakdown</h3>
              <p>🍗 **Protein**: {macros.protein.grams}g ({macros.protein.calories} calories)</p>
              <p>🥑 **Fat**: {macros.fat.grams}g ({macros.fat.calories} calories)</p>
              <p>🍞 **Carbs**: {macros.carbs.grams}g ({macros.carbs.calories} calories)</p>
            </div>
          )}
        </div>
      ) : (
        <p className={styles.errorText}>⚠ No data received. Please go back and submit the form.</p>
      )}

      

      <button className={styles.backButton} onClick={() => navigate("/")}>
        ⬅ Go Back
      </button>
    </div>
  );
}

export default Results;
