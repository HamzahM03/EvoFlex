
import navbarStyles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={navbarStyles.navbar}>
      <div className={navbarStyles.logo}>Evo Flex</div>
      <ul className={navbarStyles.navLinks}>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};



export default Navbar;
