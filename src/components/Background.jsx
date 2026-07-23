import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#050816]">
      {/* 1. Base Grid Texture - more visible */}
      <div className="absolute inset-0 bg-grid w-full h-full opacity-100"></div>

      {/* 2. Glowing Aurora Blobs - increased opacity for visibility */}
      <motion.div
        animate={{
          x: mousePosition.x * 2,
          y: mousePosition.y * 2,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 50 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        {/* Top Right - Cyan blob — increased opacity */}
        <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#00E5FF] filter blur-[100px] opacity-[0.22] animate-float-slow mix-blend-screen"></div>

        {/* Bottom Left - Purple blob — increased opacity */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-[#6C63FF] filter blur-[110px] opacity-[0.25] animate-float-slow-delayed mix-blend-screen"></div>

        {/* Center - Teal blob — increased opacity */}
        <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#00FFC6] filter blur-[120px] opacity-[0.18] animate-float-slow-alt mix-blend-screen"></div>

        {/* Extra - Deep Blue bottom right for richness */}
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#4F46E5] filter blur-[100px] opacity-[0.18] animate-float-slow mix-blend-screen"></div>
      </motion.div>

      {/* 3. Lighter vignette - reduced so blobs show through */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050816_95%)] opacity-50 z-10 pointer-events-none"></div>

      {/* 4. Noise Texture Overlay */}
      <div className="absolute inset-0 w-full h-full noise-bg z-20 pointer-events-none"></div>
    </div>
  );
};

export default Background;
