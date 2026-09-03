import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { services } from "../constants";
import { fadeIn, staggerContainer } from "../utils/animations";
import { FaArrowRight } from "react-icons/fa";

const Services = () => {
  return (
    <section id="services" className="py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary text-xs font-bold tracking-widest uppercase bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
            What I Offer
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mt-6 mb-4">
            Web Development <span className="text-primary">Services</span>
          </h2>
          <p className="text-muted-text text-base md:text-lg font-light leading-relaxed">
            High-performance, custom website solutions engineered to elevate your brand presence, attract qualified inquiries, and drive business growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={fadeIn("up", "spring", index * 0.1, 1)}
                whileHover={{ y: -8 }}
                className="glass-effect p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-background transition-all duration-300">
                      <Icon />
                    </div>
                    <span className="text-[11px] font-bold text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-text text-sm leading-relaxed mb-6 font-light">
                    {service.description}
                  </p>

                  <ul className="space-y-2 mb-8 border-t border-white/5 pt-4">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="text-xs text-white/80 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to={service.path}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-sm font-semibold text-primary hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                >
                  <span>Learn More & Pricing</span>
                  <FaArrowRight size={13} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-effect border border-white/10 text-white hover:border-primary text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105"
          >
            <span>View All Service Details & FAQs</span>
            <FaArrowRight size={13} className="text-primary" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Services;
