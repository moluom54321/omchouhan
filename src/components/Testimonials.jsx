import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/animations";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "CEO, Tech Corp",
      text: "Om Prakash is an exceptional developer. He delivered our project on time and exceeded our expectations in terms of design and performance.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jane Smith",
      role: "Marketing Manager",
      text: "Working with Om was a breeze. His attention to detail and ability to translate our vision into a beautiful website was truly impressive.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Startup Founder",
      text: "I highly recommend Om for any web development needs. His full-stack skills are top-notch, and he is a great communicator.",
      image: "https://randomuser.me/api/portraits/men/86.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative z-10 bg-background/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client <span className="text-primary">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.2, 1)}
              whileHover={{ y: -10 }}
              className="glass-effect p-8 rounded-2xl border border-border-color relative"
            >
              <FaQuoteLeft className="text-4xl text-primary/20 absolute top-6 right-6" />
              <p className="text-muted-text text-sm leading-relaxed mb-8 relative z-10">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-primary text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
