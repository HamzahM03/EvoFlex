import { motion } from "framer-motion";
import styles from "./Hero.module.css";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <motion.section 
      className={styles.hero}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
        <section id="hero">
          <h1>Welcome to Evo Flex</h1>
          <p>Your personalized fitness and nutrition tracker.</p>
          <div className={styles.buttons}>
            <button className={styles.learnMore} onClick={()=>navigate("/learnMore")}>Learn More</button>
            <button className={styles.getStarted} onClick={()=> navigate("/form")} >Get Started</button>
          </div>
        </section>
     
    </motion.section>
  );
};

export default Hero;