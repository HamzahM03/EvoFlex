import Hero from "../components/Hero/Hero";
import About from "../components/About/About";

function Home() {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>
    </div>
  );
}

export default Home;
