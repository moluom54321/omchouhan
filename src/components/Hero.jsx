import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
        "Full Stack Web Developer",
        "Creative Technologist",
        "Frontend Architect",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative w-full h-screen mx-auto flex flex-col md:flex-row items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none">
        <Scene />
      </div>

      <motion.div 
        style={{ y, opacity }}
        className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between w-full z-10 gap-12"
      >
        <div className="w-full md:w-3/5 flex flex-col items-start justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter leading-[1.1]">
              Crafting <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Digital</span> <br/>
              Experiences
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-muted-text mb-6">
              I'm Om Prakash Chouhan, <br/> a <span ref={el} className="font-semibold text-white"></span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6 mt-8"
          >
            <a
              href="#projects"
              className="magnetic group relative px-8 py-4 rounded-full bg-white text-background font-bold uppercase tracking-widest text-sm overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[0.16,1,0.3,1] z-0"></div>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Explore Work</span>
            </a>
            <a
              href="/resume.pdf"
              className="magnetic px-8 py-4 rounded-full border border-border-color glass-effect hover:border-primary/50 transition-all duration-300 text-white text-sm uppercase tracking-widest font-semibold"
            >
              View Resume
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-2/5 flex justify-center perspective-[1000px]"
        >
          <div className="relative w-72 h-[400px] md:w-96 md:h-[500px] rounded-[2rem] overflow-hidden glass-effect border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu hover:rotate-y-12 hover:rotate-x-12 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 mix-blend-overlay z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1374&auto=format&fit=crop"
              alt="Portrait"
              className="w-full h-full object-cover filter grayscale-[50%] hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-110"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
