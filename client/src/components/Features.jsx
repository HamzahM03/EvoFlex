import styles from "../styles/Features.module.css";

function Features() {
  return (
    <section id="features" className={styles.features}>
      <h2>Key Features</h2>
      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <h3>📊 Calorie & Macro Tracking</h3>
          <p>Log your meals and track daily calories, protein, carbs, and fats.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>📱 Barcode Scanner</h3>
          <p>Scan food barcodes to quickly log nutritional info.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>🥗 Food Database</h3>
          <p>Access a large database of foods with detailed nutritional values.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>🏋️‍♂️ Exercise Logging</h3>
          <p>Track workouts and calories burned to stay on top of fitness goals.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>🎯 Goal Setting</h3>
          <p>Set weight loss, muscle gain, or maintenance goals.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>🔔 Reminders & Streaks</h3>
          <p>Stay motivated with daily reminders and streak tracking.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
