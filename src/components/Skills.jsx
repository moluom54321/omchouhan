import { motion } from "framer-motion";
import { skills } from "../constants";

const SkillCard = ({ skill, index }) => {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.05 }}
      className="magnetic relative w-full h-40 glass-effect rounded-3xl border border-white/5 flex flex-col items-center justify-center group transition-all duration-300 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,229,255,0.15)]"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
      ></div>

      <div className={`text-5xl mb-3 ${skill.color} drop-shadow-[0_0_15px_currentColor] transition-transform duration-300 group-hover:scale-110`}>
        <Icon />
      </div>
      <h3 className="text-white font-medium text-sm tracking-wide">{skill.name}</h3>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 relative z-10">
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
