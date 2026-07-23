import { motion, useScroll, useTransform } from "framer-motion";
import { experience } from "../constants";
import { useRef } from "react";

const Experience = () => {
  const exp = experience[0];
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="experience" ref={containerRef} className="py-32 relative z-10">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">

          {/* Left — Text Content */}
          <div className="w-full lg:w-[45%]">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-tight mb-8">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Journey</span>
            </h2>
            <div className="glass-effect p-10 rounded-[2rem] border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>

              <span className="inline-block px-4 py-2 bg-white/5 text-white/80 text-sm font-bold tracking-widest rounded-full mb-6 border border-white/10 uppercase">
                {exp.date}
              </span>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{exp.title}</h3>
              <h4 className="text-xl font-medium text-secondary mb-8">{exp.company}</h4>
              <div className="text-muted-text text-lg leading-relaxed font-light space-y-4">
                <p>{exp.description}</p>
              </div>
            </div>
          </div>

          {/* Right — Image with Hover Effect */}
          <div className="w-full lg:w-[55%] relative h-[500px] lg:h-[750px] rounded-[3rem] overflow-hidden border border-white/10 group cursor-pointer">
            
            {/* Subtle glow ring on hover */}
            <div className="absolute inset-0 rounded-[3rem] border-2 border-primary/0 group-hover:border-primary/40 transition-all duration-700 z-30 pointer-events-none"></div>

            {/* Glow bloom behind image on hover */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-all duration-700 rounded-[3rem] z-20 mix-blend-screen pointer-events-none"></div>

            {/* Image with parallax - fixed to show full image naturally */}
            <motion.div
              style={{ y }}
              className="absolute inset-0 w-full h-full transform-gpu"
            >
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop"
                alt="Code setup"
                className="w-full h-full object-cover object-center
                           scale-105 group-hover:scale-100
                           filter brightness-75 group-hover:brightness-100
                           saturate-50 group-hover:saturate-100
                           transition-all duration-700 ease-[0.16,1,0.3,1]"
              />
            </motion.div>

            {/* Dark overlay — fades out on hover so image becomes fully visible */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-[#050816]/30 to-transparent group-hover:opacity-0 transition-opacity duration-700 z-10 pointer-events-none"></div>

            {/* Hover label */}
            <div className="absolute bottom-8 left-8 z-30 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none">
              <span className="text-white/50 text-sm font-bold tracking-widest uppercase">Hover to Explore</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;
