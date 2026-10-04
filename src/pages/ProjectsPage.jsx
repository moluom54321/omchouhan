import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import SEOHead from "../components/SEOHead";
import { projects } from "../constants";
import { FaExternalLinkAlt, FaGithub, FaCheck } from "react-icons/fa";

const categories = ["All", "Full Stack", "Real Estate", "Restaurant / Cafe", "Fitness", "Business"];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "Web Development Projects & Case Studies | Om Chouhan",
        "description": "Featured web development projects, scrollytelling canvas websites, and full-stack web applications built by Om Prakash Chouhan.",
        "url": "https://omchouhan.vercel.app/projects/"
      },
      {
        "@type": "ItemList",
        "name": "Featured Web Development Projects",
        "itemListElement": projects.map((p, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "CreativeWork",
            "name": p.title,
            "description": p.description,
            "url": p.live || `https://omchouhan.vercel.app/projects/`
          }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://omchouhan.vercel.app/projects/" }
        ]
      }
    ]
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <SEOHead
        title="Web Development Projects & Case Studies | Om Chouhan"
        description="Explore real and concept web development projects built with React, Next.js, TypeScript, HTML5 Canvas, and MERN stack. Includes Solis Estate, Fameflex, Kenangan Coffee, and more."
        canonicalPath="/projects"
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
              <span className="text-primary font-semibold">Projects</span>
            </nav>

            {/* ── Page Header ── */}
            <div className="max-w-4xl mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Proven Engineering & Design Work
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Featured Projects &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  Case Studies
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-text font-light leading-relaxed max-w-2xl">
                A transparent collection of production platforms, client solutions, and technical concept projects engineered to solve real user challenges.
              </p>
            </div>

            {/* ── Category Filters ── */}
            <div className="flex flex-wrap items-center gap-3 mb-16 pb-4 border-b border-white/10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-background shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                      : "glass-effect text-white/70 hover:text-white border border-white/10 hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ── Projects Grid ── */}
            <div className="space-y-20 mb-28">
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-effect rounded-3xl border border-white/10 p-8 lg:p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-12 group hover:border-primary/40 transition-all duration-500"
                  >
                    
                    {/* Left: Info / Case Study */}
                    <div className="w-full lg:w-1/2 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20">
                          {project.projectType}
                        </span>
                        <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                          {project.industry}
                        </span>
                      </div>

                      <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                        {project.title}
                      </h2>
                      <p className="text-primary text-sm font-medium">
                        {project.tagline}
                      </p>

                      <p className="text-muted-text text-base leading-relaxed font-light">
                        {project.description}
                      </p>

                      {/* Problem / Solution */}
                      {project.problem && (
                        <div className="space-y-3 pt-2 text-xs">
                          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                            <span className="text-white/40 uppercase tracking-widest block font-bold mb-1">Challenge Solved:</span>
                            <span className="text-white/80 leading-relaxed">{project.problem}</span>
                          </div>
                        </div>
                      )}

                      {/* Features Bullet List */}
                      {project.features && (
                        <div className="space-y-2 pt-2">
                          {project.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-white/80">
                              <FaCheck className="text-primary text-[10px] mt-1 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-medium text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-4 pt-4">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-background font-bold text-xs uppercase tracking-wider hover:bg-primary transition-colors"
                          >
                            <FaExternalLinkAlt size={12} /> Live Preview
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-full glass-effect border border-white/10 text-white/80 hover:text-white text-xs uppercase tracking-wider transition-colors"
                          >
                            <FaGithub size={14} /> GitHub Code
                          </a>
                        )}
                        {project.serviceSlug && (
                          <Link
                            to={`/services/${project.serviceSlug}/`}
                            className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline ml-auto"
                          >
                            View {project.industry} Service →
                          </Link>
                        )}
                      </div>
                    </div>

                    {/* Right: Visual / Interactive Preview */}
                    <div className="w-full lg:w-1/2 h-[320px] lg:h-[480px] rounded-2xl overflow-hidden glass-effect border border-white/10 relative shadow-2xl">
                      {project.useIframe ? (
                        <iframe
                          src={project.live}
                          title={`${project.title} - ${project.tagline || project.industry} Live Interactive Web Experience`}
                          className="w-full h-full object-cover scale-100 border-none bg-white"
                          sandbox="allow-scripts allow-same-origin"
                          loading="lazy"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.tagline || project.industry} Web Development Case Study`}
                          width="600"
                          height="480"
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      )}
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Consultation CTA ── */}
            <div className="glass-effect p-10 md:p-16 rounded-3xl border border-primary/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/5 to-secondary/15 pointer-events-none" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">
                Want a custom website like these for your business?
              </h2>
              <p className="text-muted-text text-base md:text-lg max-w-2xl mx-auto mb-8 font-light relative z-10">
                Let's discuss your project requirements, scope, and timeline with a free consultation and customized quote.
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
                  Explore Web Services
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

export default ProjectsPage;
