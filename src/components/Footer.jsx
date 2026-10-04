import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaArrowUp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { services } from "../constants";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050816] border-t border-white/10 pt-20 pb-12 relative z-10 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-wider">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-primary">
                OC
              </span>
              <span className="text-xl font-bold">
                Om Prakash Chouhan<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-text text-sm leading-relaxed max-w-sm font-light">
              Full Stack Web Developer crafting modern, fast, and conversion-focused websites for businesses, restaurants, gyms, schools, and startups in Delhi and worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/918178301837"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366] hover:text-white transition-all duration-300"
              >
                <FaWhatsapp size={16} /> Quick WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Col 3: Services Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Web Services
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-text">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.path.endsWith("/") ? service.path : `${service.path}/`}
                    className="hover:text-primary transition-colors block"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-muted-text">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services/" className="hover:text-primary transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/projects/" className="hover:text-primary transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link to="/about/" className="hover:text-primary transition-colors">
                  About Developer
                </Link>
              </li>
              <li>
                <Link to="/contact/" className="hover:text-primary transition-colors">
                  Get a Free Quote
                </Link>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors text-xs text-white/60"
                >
                  Download Resume ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-muted-text">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span>Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a
                  href="mailto:shivayechouhan6@gmail.com"
                  className="hover:text-primary transition-colors truncate"
                >
                  shivayechouhan6@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary flex-shrink-0" />
                <a
                  href="tel:+918178301837"
                  className="hover:text-primary transition-colors"
                >
                  +91 81783 01837
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-text text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Om Prakash Chouhan. All rights reserved. Custom-crafted with modern web engineering.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/moluom54321"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-9 h-9 rounded-full glass-effect flex items-center justify-center text-white/70 hover:text-primary hover:border-primary transition-all duration-300"
            >
              <FaGithub size={16} />
            </a>
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-300 border border-primary/20 ml-2"
            >
              <FaArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
