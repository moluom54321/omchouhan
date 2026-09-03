import { Link } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import SEOHead from "../components/SEOHead";
import WhyChooseMe from "../components/WhyChooseMe";
import { services, developmentProcess } from "../constants";
import { FaArrowRight, FaCheck } from "react-icons/fa";

const ServicesPage = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "Website Development Services for Businesses",
        "provider": {
          "@type": "Person",
          "name": "Om Prakash Chouhan",
          "url": "https://omchouhan.vercel.app/"
        },
        "description": "Comprehensive web development services including custom React/Next.js applications, restaurant websites, gym websites, small business portals, ecommerce stores, and ongoing website maintenance.",
        "areaServed": "Delhi, India & Worldwide"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://omchouhan.vercel.app/services/" }
        ]
      }
    ]
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <SEOHead
        title="Website Development Services for Businesses | Om Chouhan"
        description="Explore professional website development services in Delhi. Custom web development, restaurant websites, gym websites, small business websites, ecommerce, school websites, and website maintenance."
        canonicalPath="/services"
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
              <span className="text-primary font-semibold">Services</span>
            </nav>

            {/* ── Page Header ── */}
            <div className="max-w-4xl mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Complete Web Development Solutions
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Website Development Services for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                  Businesses
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-text font-light leading-relaxed max-w-2xl">
                I build fast, responsive, and conversion-focused websites engineered around your business goals. From local brand showcases to custom full-stack web applications, discover the right service for your business.
              </p>
            </div>

            {/* ── All 7 Services Cards Detailed ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.id}
                    className="glass-effect p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group"
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

                      <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>

                      <p className="text-muted-text text-sm leading-relaxed mb-6 font-light">
                        {service.description}
                      </p>

                      <div className="mb-6 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                        <span className="text-[11px] text-white/40 uppercase tracking-widest block mb-1">Best For:</span>
                        <span className="text-xs font-medium text-white/90">{service.targetAudience}</span>
                      </div>

                      <ul className="space-y-2.5 mb-8">
                        {service.features.map((feat, i) => (
                          <li key={i} className="text-xs text-white/80 flex items-start gap-2">
                            <FaCheck className="text-primary text-[10px] mt-1 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to={service.path}
                      className="inline-flex items-center justify-between w-full pt-4 border-t border-white/10 text-sm font-semibold text-primary hover:text-white transition-colors group-hover:translate-x-1 duration-200"
                    >
                      <span>View Full Service & Pricing</span>
                      <FaArrowRight size={13} />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* ── Why Work With Me ── */}
            <WhyChooseMe />

            {/* ── Development Process Section ── */}
            <div className="py-16">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  How I Work With <span className="text-primary">Clients</span>
                </h2>
                <p className="text-muted-text text-sm md:text-base font-light">
                  A predictable, structured 5-step process from initial discovery call to final domain launch.
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

            {/* ── CTA Banner ── */}
            <div className="mt-20 glass-effect p-10 md:p-16 rounded-3xl border border-primary/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-accent/5 to-secondary/15 pointer-events-none" />
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">
                Ready to Discuss Your Project?
              </h2>
              <p className="text-muted-text text-base md:text-lg max-w-2xl mx-auto mb-8 font-light relative z-10">
                Contact me directly to get an honest assessment, timeline estimate, and a free fixed-price quote.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-105 transition-all"
                >
                  Get a Free Quote
                </Link>
                <Link
                  to="/projects"
                  className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm tracking-wider uppercase hover:border-white transition-colors"
                >
                  View Featured Projects
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

export default ServicesPage;
