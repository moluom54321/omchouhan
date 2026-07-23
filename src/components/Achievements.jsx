import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "../utils/animations";

const Counter = ({ end, duration = 2, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center p-6 glass-effect rounded-2xl border border-border-color hover:border-primary transition-colors duration-300">
      <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}
        {end >= 10 && "+"}
      </h3>
      <p className="text-muted-text text-sm md:text-lg uppercase tracking-wider">{label}</p>
    </div>
  );
};

const Achievements = () => {
  const stats = [
    { label: "Projects Completed", value: 50 },
    { label: "Technologies Learned", value: 15 },
    { label: "GitHub Repositories", value: 30 },
    { label: "Certificates", value: 10 },
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Counter key={index} end={stat.value} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
