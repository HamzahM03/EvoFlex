import styles from "../styles/WhyChooseUs.module.css";

function WhyChooseUs() {
  return (
    <section id="why" className={styles.whyChooseUs}>
      <h2>Why Choose EvoFlex?</h2>
      <div className={styles.whyGrid}>
        <div className={styles.whyCard}>
          <h3>Science-Based Tracking</h3>
          <p>We use proven formulas to calculate your calorie needs accurately.</p>
        </div>
        <div className={styles.whyCard}>
          <h3>Customizable Goals</h3>
          <p>Tailor your fitness journey with personalized goals and meal plans.</p>
        </div>
        <div className={styles.whyCard}>
          <h3>All-In-One Solution</h3>
          <p>Track calories, log workouts, and monitor progress all in one place.</p>
        </div>
        <div className={styles.whyCard}>
          <h3>Easy to Use</h3>
          <p>Our simple interface makes tracking fitness effortless.</p>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
