import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { whyWorkWithMe } from "../constants";
import { fadeIn, staggerContainer } from "../utils/animations";

const WhyChooseMe = () => {
  return (
    <section id="why-choose-me" className="py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-primary text-xs font-bold tracking-widest uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            Client Commitments
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mt-6 mb-6">
            Why Businesses <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
              Work With Me
            </span>
          </h2>
          <p className="text-muted-text text-lg font-light leading-relaxed">
            I don't just write code; I build high-performance digital assets tailored to solve real business challenges, turn visitors into customers, and establish long-term digital credibility.
          </p>
        </motion.div>

        {/* Value Cards Grid */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {whyWorkWithMe.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeIn("up", "spring", index * 0.1, 1)}
                whileHover={{ y: -8 }}
                className="glass-effect p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 text-2xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-text text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          variants={fadeIn("up", "tween", 0.3, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 glass-effect p-8 md:p-12 rounded-3xl border border-primary/20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-transparent pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
            Have a website project in mind?
          </h3>
          <p className="text-muted-text max-w-xl mx-auto mb-8 font-light text-base relative z-10">
            Let's build a fast, modern website that makes your business look credible and makes it effortless for your customers to contact you.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:scale-105 transition-all"
            >
              Get a Free Quote
            </Link>
            <Link
              to="/services"
              className="px-8 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-semibold text-sm tracking-wider uppercase transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyChooseMe;
