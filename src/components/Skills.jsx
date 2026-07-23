import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { skills } from "../constants";

const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="magnetic relative w-full h-40 glass-effect rounded-3xl border border-white/5 flex flex-col items-center justify-center group"
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
        style={{ transform: "translateZ(1px)" }}
      ></div>
      
      <div style={{ transform: "translateZ(40px)" }} className={`text-5xl mb-3 ${skill.color} drop-shadow-[0_0_15px_currentColor] transition-transform duration-300 group-hover:scale-110`}>
        <Icon />
      </div>
      <h3 style={{ transform: "translateZ(30px)" }} className="text-white font-medium text-sm tracking-wide">{skill.name}</h3>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative z-10 perspective-[1000px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
            Technical <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Arsenal</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
