import styles from "../styles/WhyChooseUs.module.css";
import Card from "./Card"; // Import reusable Card component

function WhyChooseUs() {
  const whyChooseUsData = [
    { title: "📊 Science-Based Tracking", description: "We use proven formulas to calculate your calorie needs accurately." },
    { title: "🎯 Customizable Goals", description: "Tailor your fitness journey with personalized goals and meal plans." },
    { title: "📱 All-In-One Solution", description: "Track calories, log workouts, and monitor progress all in one place." },
    { title: "🚀 Easy to Use", description: "Our simple interface makes tracking fitness effortless." },
  ];

  return (
    <section id="why" className={styles.whyChooseUs}>
      <h2>Why Choose EvoFlex?</h2>
      <div className={styles.whyGrid}>
        {whyChooseUsData.map((item, index) => (
          <Card key={index} title={item.title} description={item.description} />
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
