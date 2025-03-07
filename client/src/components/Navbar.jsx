import styles from "../styles/Navbar.module.css";
import { FaUserCircle } from "react-icons/fa"; // Import user icon

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>EvoFlex</h1>
      <ul className={styles.navLinks}>
        <li><a href="#features">Features</a></li>
        <li><a href="#why">Why Us</a></li>
        <li><a href="/calorie-calculator">Calorie Calculator</a></li>
        <li className={styles.userIcon}>
          <a href="/profile">
            <FaUserCircle size={30} />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
