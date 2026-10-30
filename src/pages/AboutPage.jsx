import { Link } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import SEOHead from "../components/SEOHead";
import WhyChooseMe from "../components/WhyChooseMe";
import { categorizedSkills, experience } from "../constants";

const AboutPage = () => {
  const exp = experience[0];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "name": "About Om Prakash Chouhan | Web Developer in Delhi",
        "description": "Learn about Om Prakash Chouhan, a freelance website designer and web developer in Delhi NCR. I build modern, responsive, and SEO-friendly websites for businesses in Delhi, Noida, and Gurugram.",
        "url": "https://omchouhan.vercel.app/about/"
      },
      {
        "@type": "Person",
        "name": "Om Prakash Chouhan",
        "jobTitle": "Freelance Web Developer & Website Designer",
        "url": "https://omchouhan.vercel.app/",
        "sameAs": ["https://github.com/moluom54321"]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://omchouhan.vercel.app/" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://omchouhan.vercel.app/about/" }
        ]
      }
    ]
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <SEOHead
        title="About Om Prakash Chouhan | Web Developer in Delhi"
        description="Learn about Om Prakash Chouhan, a freelance website designer and web developer in Delhi NCR. I build modern, responsive, and SEO-friendly websites for businesses in Delhi, Noida, and Gurugram."
        canonicalPath="/about"
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
              <span className="text-primary font-semibold">About</span>
            </nav>

            {/* ── Hero / Story Section ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wider uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                  Developer Profile & Background — Delhi NCR
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                  About Me —{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                    Freelance Web Developer
                  </span>
                </h1>
                
                <div className="space-y-4 text-muted-text text-base md:text-lg leading-relaxed font-light">
                  <p>
                    Hi, I'm <strong className="text-white font-medium">Om Prakash Chouhan</strong>, a freelance website designer and full stack web developer based in Delhi, India. I specialize in designing and building clean, modern, and high-converting websites for businesses, startups, restaurants, gyms, and schools across Delhi and Delhi NCR — including Noida and Gurugram.
                  </p>
                  <p>
                    My approach combines modern frontend architecture (React 19, Vite, Tailwind CSS) with solid backend engineering (Node.js, Express.js, MongoDB). I believe a great website must be fast, mobile-friendly, technically optimized for search engines, and built to drive real business inquiries — not just look impressive.
                  </p>
                  <p>
                    Whether you need a restaurant website with an online menu, a gym membership portal, a school or academy platform, or a custom full-stack web application — I deliver custom-coded solutions with zero bloated templates, built to perform and rank.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    to="/services/"
                    className="text-sm text-primary font-semibold hover:underline underline-offset-4 transition-colors"
                  >
                    → View All Services
                  </Link>
                  <Link
                    to="/projects/"
                    className="text-sm text-primary font-semibold hover:underline underline-offset-4 transition-colors"
                  >
                    → View My Projects
                  </Link>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to="/contact/"
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:scale-105 transition-all"
                  >
                    Get a Quote
                  </Link>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-full glass-effect border border-white/20 text-white font-semibold text-sm tracking-wider uppercase hover:border-white transition-colors"
                  >
                    Download Resume ↗
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md h-[480px] rounded-[2.5rem] overflow-hidden glass-effect border border-white/10 shadow-2xl">
                  <img
                    src="/om_portrait.jpg"
                    alt="Om Prakash Chouhan - Website Designer and Freelance Web Developer in Delhi NCR"
                    width="448"
                    height="480"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 glass-effect p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                    <p className="text-white font-bold text-base">Om Prakash Chouhan</p>
                    <p className="text-primary text-xs">Website Designer & Web Developer • Delhi NCR, India</p>
                  </div>
                </div>
              </div>

            </div>

            {/* ── Categorized Skills Arsenal ── */}
            <div className="mb-28">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
                  Technical <span className="text-primary">Arsenal</span>
                </h2>
                <p className="text-muted-text text-sm md:text-base font-light">
                  A modern, reliable technology stack utilized across client projects and production web applications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Frontend */}
                <div className="glass-effect p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-primary text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2">
                    Frontend Architecture
                  </h3>
                  <div className="space-y-3">
                    {categorizedSkills.frontend.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.name} className="flex items-center gap-3">
                          <Icon className={`text-xl ${item.color}`} />
                          <span className="text-sm font-medium text-white/90">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Backend */}
                <div className="glass-effect p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-primary text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2">
                    Backend & APIs
                  </h3>
                  <div className="space-y-3">
                    {categorizedSkills.backend.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.name} className="flex items-center gap-3">
                          <Icon className={`text-xl ${item.color}`} />
                          <span className="text-sm font-medium text-white/90">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Database */}
                <div className="glass-effect p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-primary text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2">
                    Database & Storage
                  </h3>
                  <div className="space-y-3">
                    {categorizedSkills.database.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.name} className="flex items-center gap-3">
                          <Icon className={`text-xl ${item.color}`} />
                          <span className="text-sm font-medium text-white/90">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tools & Cloud */}
                <div className="glass-effect p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-primary text-sm font-bold uppercase tracking-wider border-b border-white/5 pb-2">
                    Tools & Deployment
                  </h3>
                  <div className="space-y-3">
                    {categorizedSkills.tools.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.name} className="flex items-center gap-3">
                          <Icon className={`text-xl ${item.color}`} />
                          <span className="text-sm font-medium text-white/90">{item.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>

            {/* ── Developer Journey & Practice ── */}
            <div className="mb-28">
              <div className="glass-effect p-8 md:p-14 rounded-3xl border border-white/10">
                <span className="text-xs font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 uppercase tracking-widest">
                  Experience & Background
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mt-6 mb-2">
                  {exp.title}
                </h2>
                <p className="text-secondary text-base font-semibold mb-6">{exp.company} • {exp.date}</p>
                <p className="text-muted-text text-base md:text-lg leading-relaxed font-light">
                  {exp.description}
                </p>
              </div>
            </div>

            {/* ── Why Choose Me Section ── */}
            <WhyChooseMe />

          </div>
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default AboutPage;
