import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import navbarStyles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbar}>
      <div className={navbarStyles.logo}>Evo Flex</div>
      <ul className={navbarStyles.navLinks}>
        <li><ScrollLink to="hero" smooth={true} duration={500}>Home</ScrollLink></li>
        <li><ScrollLink to="about" smooth={true} duration={500}>about</ScrollLink></li>
        <li><RouterLink to="/form">CaloriCalc</RouterLink></li>
        <li><a href="#">Contact</a></li>
        
      </ul>
    </nav>
  );
};



export default Navbar;
