import styles from "../styles/Features.module.css";
import Card from "./Card";

function Features() {
  const featuresData = [
    { title: "📊 Calorie & Macro Tracking", description: "Log your meals and track daily calories, protein, carbs, and fats." },
    { title: "📱 Barcode Scanner", description: "Scan food barcodes to quickly log nutritional info." },
    { title: "🥗 Food Database", description: "Access a large database of foods with detailed nutritional values." },
    { title: "🏋️‍♂️ Exercise Logging", description: "Track workouts and calories burned to stay on top of fitness goals." },
    { title: "🎯 Goal Setting", description: "Set weight loss, muscle gain, or maintenance goals." },
    { title: "🔔 Reminders & Streaks", description: "Stay motivated with daily reminders and streak tracking." },
  ];

  return (
    <section id="features" className={styles.features}>
      <h2>Key Features</h2>
      <div className={styles.featuresGrid}>
        {featuresData.map((feature, index) => (
          <Card key={index} title={feature.title} description={feature.description} />
        ))}
      </div>
    </section>
  );
}

export default Features;
