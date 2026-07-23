import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Services from "../components/Services";
import Projects from "../components/Projects";
import GitHub from "../components/GitHub";
import Achievements from "../components/Achievements";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import Background from "../components/Background";

const Home = () => {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="text-white min-h-screen font-sans bg-transparent selection:bg-primary/30 selection:text-white">
        <Background />
        <CustomCursor />
        <Navbar />
        <main className="relative z-10 w-full overflow-hidden">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Services />
          <Projects />
          <GitHub />
          <Achievements />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Home;
