import styles from "../styles/Card.module.css";

function Card({ title, description, icon }) {
  return (
    <div className={styles.card}>
      <h3>{icon} {title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Card;
