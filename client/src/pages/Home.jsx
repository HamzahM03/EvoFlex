import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <Navbar />
      <HeroSection />
      <Features />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}

export default Home;
