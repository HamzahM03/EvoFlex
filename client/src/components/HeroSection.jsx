import styles from "../styles/HeroSection.module.css";

function HeroSection() {
  return (
    <section className={styles.hero}>
      <h1>Transform Your Fitness Journey</h1>
      <p>Track your calories, workouts, and progress with EvoFlex.</p>
      <a href="/calorie-calculator" className={styles.ctaButton}>Get Started</a>
    </section>
  );
}

export default HeroSection;
