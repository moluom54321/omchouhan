import { useState, lazy, Suspense } from "react";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Background from "../components/Background";
import SEOHead from "../components/SEOHead";

// Below-the-fold sections are lazy-loaded to optimize initial bundle size and mobile FCP/LCP
const Services     = lazy(() => import("../components/Services"));
const Projects     = lazy(() => import("../components/Projects"));
const WhyChooseMe  = lazy(() => import("../components/WhyChooseMe"));
const About        = lazy(() => import("../components/About"));
const Skills       = lazy(() => import("../components/Skills"));
const Experience   = lazy(() => import("../components/Experience"));
const GitHub       = lazy(() => import("../components/GitHub"));
const Achievements = lazy(() => import("../components/Achievements"));
const Contact      = lazy(() => import("../components/Contact"));
const Footer       = lazy(() => import("../components/Footer"));

const Home = () => {
  // Synchronously initialize Lenis on desktop only to avoid an extra component re-render pass
  // On mobile/touch or reduced motion, Lenis remains disabled to preserve native momentum scroll
  const [enableLenis] = useState(() => {
    if (typeof window === "undefined") return false;
    const isTouchOrMobile =
      "ontouchstart" in window ||
      window.innerWidth < 1024 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !isTouchOrMobile;
  });

  const homepageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://omchouhan.vercel.app/#person",
        "name": "Om Prakash Chouhan",
        "url": "https://omchouhan.vercel.app/",
        "jobTitle": "Website Designer & Full Stack Web Developer",
        "description": "Website designer and freelance web developer in Delhi building custom, responsive, and SEO-friendly websites for businesses in Delhi NCR.",
        "sameAs": ["https://github.com/moluom54321"],
        "knowsAbout": [
          "Website Design",
          "Web Development",
          "Frontend Development",
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
        "name": "Website Designer in Delhi | Om Prakash Chouhan",
        "publisher": {
          "@id": "https://omchouhan.vercel.app/#person"
        }
      }
    ]
  };

  const pageContent = (
    <div className="text-white min-h-screen font-sans bg-transparent selection:bg-primary/30 selection:text-white overflow-x-hidden w-full">
      <Background />
      <Navbar />
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <Suspense fallback={<div className="min-h-[300px]" aria-hidden="true" />}>
          <Services />
          <Projects />
          <WhyChooseMe />
          <About />
          <Skills />
          <Experience />
          <GitHub />
          <Achievements />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Website Designer in Delhi | Om Prakash Chouhan"
        description="I'm Om Prakash Chouhan, a freelance website designer and developer in Delhi. I create modern, responsive and SEO-friendly websites for businesses, restaurants, gyms and startups across Delhi NCR."
        canonicalPath="/"
        schema={homepageSchema}
      />
      {enableLenis ? (
        <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
          {pageContent}
        </ReactLenis>
      ) : (
        pageContent
      )}
    </>
  );
};

export default Home;
