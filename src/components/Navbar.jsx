import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services/" },
    { name: "Projects", path: "/projects/" },
    { name: "About", path: "/about/" },
    { name: "Contact", path: "/contact/" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    const cleanPath = path.replace(/\/$/, "");
    return location.pathname.startsWith(cleanPath);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect py-3 border-b border-white/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo / Brand Name */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white tracking-wider group"
        >
          <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center text-primary group-hover:border-primary transition-all duration-300">
            OC
          </span>
          <span className="hidden sm:inline-block text-base font-semibold tracking-tight text-white/90">
            Om Chouhan<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`transition-colors duration-200 text-sm font-medium tracking-wide uppercase ${
                isActive(link.path)
                  ? "text-primary font-semibold"
                  : "text-muted-text hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button: Get a Quote */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/contact"
            className="magnetic relative group px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-sm tracking-wider uppercase overflow-hidden shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="w-10 h-10 rounded-lg glass-effect border border-white/10 flex items-center justify-center text-white text-2xl focus:outline-none focus:border-primary"
          >
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050816]/95 backdrop-blur-2xl shadow-2xl border-b border-border-color py-6 transition-all">
          <ul className="flex flex-col space-y-3 px-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 text-lg font-medium transition-colors ${
                    isActive(link.path)
                      ? "text-primary font-bold"
                      : "text-white/90 hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-background font-bold text-base tracking-wider uppercase shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
