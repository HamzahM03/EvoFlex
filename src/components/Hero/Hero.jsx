import { motion } from "framer-motion";
import styles from "./Hero.module.css";


const Hero = () => {

  
  return (
    <motion.section 
      className={styles.hero}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1>Welcome to Evo Flex</h1>
      <p>Your personalized fitness and nutrition tracker.</p>
      <div className={styles.buttons}>
        <button className={styles.learnMore}>Learn More</button>
        <button className={styles.getStarted} >Get Started</button>
      </div>
    </motion.section>
  );
};

export default Hero;