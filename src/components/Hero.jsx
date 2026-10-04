import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full absolute inset-0 -z-10 opacity-60 pointer-events-none">
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 64, 64]} position={[-2, 1, -2]} scale={1.5}>
          <MeshDistortMaterial color="#00E5FF" attach="material" distort={0.5} speed={2} roughness={0} metalness={0.8} />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[1, 64, 64]} position={[2, -1, -1]} scale={1.2}>
          <MeshDistortMaterial color="#6C63FF" attach="material" distort={0.6} speed={1.5} roughness={0} metalness={0.8} />
        </Sphere>
      </Float>
    </Canvas>
  );
};

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
      <div className="absolute inset-0 pointer-events-none">
        <Scene />
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
              Web Development Services in Delhi & Remote
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
                Modern Websites
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
              I design and develop fast, responsive and conversion-focused websites for restaurants, gyms, schools, startups, and small businesses.
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
              to="/contact"
              className="magnetic group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:shadow-[0_0_35px_rgba(0,229,255,0.6)] hover:scale-105 transition-all duration-300"
            >
              Get a Quote
            </Link>
            <Link
              to="/projects"
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
              alt="Om Prakash Chouhan - Full Stack Web Developer building modern websites"
              width="352"
              height="480"
              loading="eager"
              className="w-full h-full object-cover filter grayscale-[20%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20 glass-effect px-4 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
              <p className="text-sm text-white font-bold">Om Prakash Chouhan</p>
              <p className="text-xs text-primary font-bold">Full Stack Web Developer & Solutions</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
