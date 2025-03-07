import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} EvoFlex. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
