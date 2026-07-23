import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="about" ref={containerRef} className="py-32 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Text Asymmetric */}
          <motion.div style={{ y: y1 }} className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight">
              Engineering <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">Precision</span>
            </h2>
            <div className="w-full h-[1px] bg-gradient-to-r from-border-color to-transparent"></div>
            
            <p className="text-muted-text text-xl leading-relaxed font-light">
              I am a passionate <strong className="text-white font-medium">Full Stack Web Developer</strong> with a strong foundation in building modern, scalable, and user-friendly web applications. With expertise in the MERN stack, I transform complex ideas into elegant digital products.
            </p>
            <p className="text-muted-text text-xl leading-relaxed font-light">
              My goal is to create premium experiences that not only look visually stunning but also perform exceptionally well under the hood. I am constantly learning and adapting to stay ahead in the tech landscape.
            </p>

            <div className="flex gap-6 pt-8">
              <div className="glass-effect px-8 py-6 rounded-2xl border border-border-color">
                <h3 className="text-4xl font-bold text-primary mb-2">3+</h3>
                <p className="text-xs text-muted-text uppercase tracking-widest font-bold">Years Experience</p>
              </div>
              <div className="glass-effect px-8 py-6 rounded-2xl border border-border-color">
                <h3 className="text-4xl font-bold text-accent mb-2">50+</h3>
                <p className="text-xs text-muted-text uppercase tracking-widest font-bold">Projects Built</p>
              </div>
            </div>
          </motion.div>

          {/* Right Image / Parallax */}
          <motion.div style={{ y: y2 }} className="w-full lg:w-1/2 relative h-[600px] rounded-3xl overflow-hidden glass-effect border border-white/5 group">
            <motion.div 
              className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            ></motion.div>
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop"
              alt="Code setup"
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out"
            />
            {/* Floating Element */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/30 blur-[60px] rounded-full z-0"></div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
