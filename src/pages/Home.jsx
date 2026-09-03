import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Projects from "../components/Projects";
import WhyChooseMe from "../components/WhyChooseMe";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import GitHub from "../components/GitHub";
import Achievements from "../components/Achievements";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Background from "../components/Background";
import SEOHead from "../components/SEOHead";

const Home = () => {
  const homepageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://omchouhan.vercel.app/#person",
        "name": "Om Prakash Chouhan",
        "url": "https://omchouhan.vercel.app/",
        "jobTitle": "Full Stack Web Developer",
        "description": "Om Prakash Chouhan is a Full Stack Web Developer in Delhi building modern, responsive, and SEO-friendly websites and web applications for businesses.",
        "sameAs": ["https://github.com/moluom54321"],
        "knowsAbout": [
          "Full Stack Web Development",
          "MERN Stack",
          "React.js",
          "Next.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Tailwind CSS",
          "TypeScript",
          "JavaScript"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://omchouhan.vercel.app/#website",
        "url": "https://omchouhan.vercel.app/",
        "name": "Om Prakash Chouhan | Web Development Services",
        "publisher": {
          "@id": "https://omchouhan.vercel.app/#person"
        }
      }
    ]
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <SEOHead
        title="Om Prakash Chouhan | Full Stack Web Developer"
        description="Om Prakash Chouhan is a Full Stack Web Developer building modern, responsive and SEO-friendly websites and web applications for businesses."
        canonicalPath="/"
        schema={homepageSchema}
      />
      <div className="text-white min-h-screen font-sans bg-transparent selection:bg-primary/30 selection:text-white overflow-x-hidden w-full">
        <Background />
        <Navbar />
        <main className="relative z-10 w-full overflow-hidden">
          <Hero />
          <Services />
          <Projects />
          <WhyChooseMe />
          <About />
          <Skills />
          <Experience />
          <GitHub />
          <Achievements />
          <Contact />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default Home;
