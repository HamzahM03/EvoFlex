import styles from "../styles/Features.module.css";

function Features() {
  return (
    <section id="features" className={styles.features}>
      <h2>Key Features</h2>
      <div className={styles.featuresGrid}>
        <div className={styles.featureCard}>
          <h3>Calorie Tracking</h3>
          <p>Monitor your daily intake with ease.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Workout Logging</h3>
          <p>Keep track of your workouts and progress.</p>
        </div>
        <div className={styles.featureCard}>
          <h3>Goal-Based Recommendations</h3>
          <p>Personalized suggestions for better results.</p>
        </div>
      </div>
    </section>
  );
}

export default Features;
