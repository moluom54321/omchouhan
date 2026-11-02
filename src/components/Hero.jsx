import { useEffect, useRef, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Typed from "typed.js";

// Three.js Canvas is lazily loaded AFTER hero text paints
// This eliminates the 3,050ms LCP render delay caused by WebGL init
const ThreeScene = lazy(() => import("./HeroScene"));

const Hero = () => {
  const el = useRef(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Modern Business Websites",
        "Restaurant & Cafe Portals",
        "Gym & Fitness Platforms",
        "Custom Full-Stack Apps",
      ],
      typeSpeed: 45,
      backSpeed: 35,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative w-full min-h-screen pt-36 pb-24 mx-auto flex flex-col md:flex-row items-center justify-center overflow-hidden">
      {/* 3D Canvas — deferred via Suspense so it does NOT block hero text paint */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>
          <ThreeScene />
        </Suspense>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between w-full z-10 gap-12"
      >
        <div className="w-full md:w-3/5 flex flex-col items-start justify-center text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">
              Website Designer & Web Developer in Delhi NCR
            </span>
          </motion.div>

          {/* Primary H1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.15]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                Website Designer in Delhi
              </span>{" "}
              for Growing Businesses
            </h1>
          </motion.div>

          {/* Supporting Text & Dynamic Typing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-lg md:text-xl text-muted-text font-light mb-4 leading-relaxed max-w-xl">
              I'm Om Prakash Chouhan, a freelance website designer and developer in Delhi. I create modern, responsive and SEO-friendly websites for businesses, restaurants, gyms and startups across Delhi NCR.
            </p>
            <p className="text-sm font-medium text-white/80 mb-6 flex items-center gap-2">
              <span>Specializing in:</span>
              <span ref={el} className="text-primary font-bold"></span>
            </p>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <Link
              to="/contact/"
              className="magnetic group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] hover:scale-105 transition-all duration-300"
            >
              Get a Quote
            </Link>
            <Link
              to="/projects/"
              className="magnetic px-8 py-4 rounded-full border border-white/20 glass-effect hover:border-primary/50 text-white text-sm uppercase tracking-wider font-semibold transition-all duration-300 hover:scale-105"
            >
              View Projects
            </Link>
          </motion.div>
        </div>

        {/* Right Portrait & Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-2/5 flex justify-center perspective-[1000px]"
        >
          <div className="relative w-72 h-[340px] md:w-88 md:h-[480px] rounded-[2.5rem] overflow-hidden glass-effect border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform-gpu hover:rotate-y-6 hover:rotate-x-6 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 mix-blend-overlay z-10"></div>
            <img
              src="/om_portrait.jpg"
              alt="Om Prakash Chouhan - Website Designer and Freelance Web Developer in Delhi"
              width="352"
              height="480"
              loading="eager"
              className="w-full h-full object-cover filter grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 glass-effect px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
              <p className="text-sm text-white font-bold">Om Prakash Chouhan</p>
              <p className="text-xs text-primary font-bold">Website Designer & Web Developer • Delhi, India</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
