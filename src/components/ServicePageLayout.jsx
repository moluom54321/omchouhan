import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Background from "./Background";
import SEOHead from "./SEOHead";
import { FaChevronDown, FaCheck, FaArrowRight, FaWhatsapp, FaExternalLinkAlt } from "react-icons/fa";
import { developmentProcess } from "../constants";

const ServicePageLayout = ({
  seoTitle,
  seoDescription,
  canonicalPath,
  serviceName,
  heroBadge = "Professional Web Service",
  heroHeading,
  heroSubheading,
  targetAudienceText,
  problems = [],
  solutions = [],
  keyFeatures = [],
  relevantProjects = [],
  faqs = [],
  schema = null,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={canonicalPath}
        schema={schema}
      />
      <div className="text-white min-h-screen font-sans bg-transparent selection:bg-primary/30 selection:text-white overflow-x-hidden w-full">
        <Background />
        <Navbar />

        <main className="relative z-10 w-full pt-36 pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* ── Breadcrumbs ── */}
            <nav className="flex items-center space-x-2 text-xs text-muted-text mb-8 uppercase tracking-wider">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-primary font-semibold">{serviceName}</span>
            </nav>

            {/* ── Hero Section ── */}
            <div className="max-w-4xl mb-24">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                {heroBadge}
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                {heroHeading}
              </h1>
              <p className="text-lg md:text-xl text-muted-text font-light leading-relaxed mb-8">
                {heroSubheading}
              </p>

              {targetAudienceText && (
                <div className="p-4 rounded-2xl glass-effect border border-white/10 mb-8 inline-block">
                  <span className="text-xs text-white/50 uppercase tracking-widest block mb-1">Target Businesses:</span>
                  <span className="text-sm font-medium text-white">{targetAudienceText}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:scale-105 transition-all"
                >
                  Get a Free Quote
                </Link>
                <a
                  href="https://wa.me/918178301837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-sm font-semibold hover:bg-[#25D366] hover:text-white transition-all"
                >
                  <FaWhatsapp size={18} /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* ── Common Problems vs Our Solutions ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-28">
              
              {/* Common Problems */}
              <div className="glass-effect p-8 md:p-10 rounded-3xl border border-red-500/20 bg-red-500/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold">✕</span>
                  Common Challenges Businesses Face
                </h2>
                <ul className="space-y-4">
                  {problems.map((prob, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-text text-sm leading-relaxed">
                      <span className="text-red-400 mt-1 flex-shrink-0">•</span>
                      <span>{prob}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What I Build / Solutions */}
              <div className="glass-effect p-8 md:p-10 rounded-3xl border border-primary/30 bg-primary/5">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">✓</span>
                  How My Solution Delivers Real Value
                </h2>
                <ul className="space-y-4">
                  {solutions.map((sol, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/90 text-sm leading-relaxed">
                      <FaCheck className="text-primary mt-1 flex-shrink-0 text-xs" />
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* ── Key Features & Deliverables ── */}
            <div className="mb-28">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  Key Features & <span className="text-primary">Deliverables</span>
                </h2>
                <p className="text-muted-text text-sm md:text-base font-light">
                  Everything you need to launch a high-converting, reliable website with zero hidden headaches.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="glass-effect p-7 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-base font-bold mb-4">
                      0{idx + 1}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-muted-text text-xs leading-relaxed font-light">{feat.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5-Step Development Process ── */}
            <div className="mb-28">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  My Development <span className="text-primary">Process</span>
                </h2>
                <p className="text-muted-text text-sm md:text-base font-light">
                  A transparent, milestone-driven workflow ensuring on-time delivery and complete clarity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {developmentProcess.map((step) => (
                  <div
                    key={step.step}
                    className="glass-effect p-6 rounded-2xl border border-white/10 relative flex flex-col justify-between"
                  >
                    <span className="text-3xl font-extrabold text-primary/30 mb-4 block">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                      <p className="text-muted-text text-xs leading-relaxed font-light">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Relevant Projects Showcase ── */}
            {relevantProjects.length > 0 && (
              <div className="mb-28">
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-2">
                      Relevant <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-muted-text text-sm font-light">
                      Real and concept examples demonstrating practical design and technical implementation.
                    </p>
                  </div>
                  <Link
                    to="/projects"
                    className="text-primary text-sm font-semibold flex items-center gap-2 hover:underline"
                  >
                    <span>View Full Portfolio</span>
                    <FaArrowRight size={12} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {relevantProjects.map((project) => (
                    <div
                      key={project.id}
                      className="glass-effect rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="p-8">
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                            {project.projectType}
                          </span>
                          <span className="text-xs text-white/50">{project.industry}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-muted-text text-sm leading-relaxed mb-6 font-light">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.map((t, i) => (
                            <span key={i} className="text-[11px] text-white/80 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-xs font-semibold hover:text-primary flex items-center gap-2 transition-colors uppercase tracking-wider"
                          >
                            <FaExternalLinkAlt size={12} /> Live Preview
                          </a>
                        )}
                        <Link
                          to="/contact"
                          className="text-primary text-xs font-semibold hover:underline"
                        >
                          Request Similar Website →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── FAQ Section ── */}
            {faqs.length > 0 && (
              <div className="mb-28 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                    Frequently Asked <span className="text-primary">Questions</span>
                  </h2>
                  <p className="text-muted-text text-sm md:text-base font-light">
                    Have questions about the development process, timeline, or scope? Find clear answers below.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="glass-effect rounded-2xl border border-white/10 overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left p-6 flex items-center justify-between gap-4 font-semibold text-white hover:text-primary transition-colors focus:outline-none"
                      >
                        <span className="text-base md:text-lg">{faq.question}</span>
                        <FaChevronDown
                          className={`text-primary transition-transform duration-300 flex-shrink-0 ${
                            openFaqIndex === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openFaqIndex === idx && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6 text-muted-text text-sm leading-relaxed border-t border-white/5 pt-4 font-light"
                          >
                            {faq.answer}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Final Consultation CTA ── */}
            <div className="glass-effect p-10 md:p-16 rounded-3xl border border-primary/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/5 to-secondary/15 pointer-events-none" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">
                Ready to build your {serviceName}?
              </h2>
              <p className="text-muted-text text-base md:text-lg max-w-2xl mx-auto mb-8 font-light relative z-10">
                Contact me today for a free consultation and customized quote tailored to your business goals.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-105 transition-all"
                >
                  Get a Free Quote
                </Link>
                <Link
                  to="/services"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm tracking-wider uppercase hover:border-white transition-colors"
                >
                  Browse Other Services
                </Link>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default ServicePageLayout;
