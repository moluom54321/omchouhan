import { Link } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background from "../components/Background";
import SEOHead from "../components/SEOHead";
import { FaHome, FaConciergeBell, FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <SEOHead
        title="404: Page Not Found | Om Chouhan"
        description="The page you are looking for does not exist or has been moved."
        canonicalPath="/404"
      />
      <div className="text-white min-h-screen font-sans bg-transparent selection:bg-primary/30 selection:text-white overflow-x-hidden w-full flex flex-col justify-between">
        <Background />
        <Navbar />

        <main className="relative z-10 w-full pt-44 pb-28 flex-1 flex items-center justify-center">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
            
            {/* Warning Icon Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-widest uppercase">
              <FaExclamationTriangle className="text-sm" />
              Error 404 — Page Not Found
            </div>

            {/* Big 404 Heading */}
            <h1 className="text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary tracking-tighter leading-none">
              404
            </h1>

            <div className="space-y-3">
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
                Looks like you've taken a wrong turn
              </h2>
              <p className="text-muted-text text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
                The page you are trying to access does not exist, has been removed, or the link may be broken.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:scale-105 transition-all"
              >
                <FaHome />
                Go Back Home
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full glass-effect border border-white/20 text-white font-semibold text-sm uppercase tracking-wider hover:border-white transition-colors"
              >
                <FaConciergeBell />
                Explore Services
              </Link>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
};

export default NotFoundPage;
