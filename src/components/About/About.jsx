import styles from "./About.module.css";

function About() {
  return (
    <section id="about" className={styles.aboutSection}>
      <h2>About Evo Flex</h2>
      <p>
        Evo Flex is your go-to platform for tracking your calories and macronutrients based on your fitness goals. 
        Whether you want to lose weight, maintain, or gain muscle, we provide tailored recommendations to help you 
        stay on track.
      </p>
    </section>
  );
}

export default About;
