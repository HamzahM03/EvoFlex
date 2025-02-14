import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Results.module.css"; // Create this CSS file for styling

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const calculatedCalories = location.state?.calculatedCalories;

  // Define surplus and deficit for weight gain/loss
  const calorieSurplus = calculatedCalories ? calculatedCalories + 500 : null;
  const calorieDeficit = calculatedCalories ? calculatedCalories - 500 : null;

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.title}>Your Daily Caloric Needs</h2>

      {calculatedCalories ? (
        <div className={styles.calorieInfo}>
          <p>🔹 **Maintenance Calories**: {calculatedCalories} calories/day</p>
          <p>📉 **To Lose Weight**: {calorieDeficit} calories/day</p>
          <p>📈 **To Gain Weight**: {calorieSurplus} calories/day</p>
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
