import { Link } from "react-scroll"; 
import navbarStyles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbar}>
      <div className={navbarStyles.logo}>Evo Flex</div>
      <ul className={navbarStyles.navLinks}>
        <li><Link to="/" smooth={true} duration={500}>Home</Link></li>
        <li><a href="#">About</a></li>
        <li><Link to="/form">CaloriCalc</Link></li>
        <li><a href="#">Contact</a></li>
        
      </ul>
    </nav>
  );
};



export default Navbar;
