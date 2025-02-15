import styles from "./LearnMore.module.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function LearnMore() {
  return (
    <>
    <section className={styles.learnMoreContainer}>
      <h1>Learn More About Evo Flex</h1>
      <p>
        Evo Flex is designed to help you track your caloric intake and reach your fitness goals effortlessly.
      </p>

      <h2>Features</h2>
      <ul>
        <li>🆓 Use CaloriCalc without an account to quickly estimate your daily caloric needs.</li>
        <li>🔐 Create an account to save your progress, track goals, and monitor changes over time.</li>
        <li>🍽️ View personalized meal plans based on your caloric and macronutrient needs.</li>
        <li>📊 Access insights and trends on your calorie intake to optimize your fitness journey.</li>
      </ul>

      <h2>How It Works</h2>
      <p>
        Enter your personal details like age, height, weight, and activity level to get a tailored daily calorie goal. 
        Whether you aim to lose weight, maintain, or gain muscle, Evo Flex will guide you with science-backed calculations.
      </p>

      <h2>Get Started</h2>
      <p>Ready to take control of your nutrition? Click below to start tracking today!</p>
      <Link to="/form" className={styles.getStartedButton}>Get Started</Link>
      <Link to="/">Go Home</Link>
    </section>
    </>
  );
}

export default LearnMore;
