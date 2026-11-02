import { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

const Background = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    // Only listen for mouse movements on fine-pointer devices (desktop mouse)
    // Touch/mobile devices skip listener completely to save main-thread work
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer) return;

    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          x.set((e.clientX / window.innerWidth - 0.5) * 30);
          y.set((e.clientY / window.innerHeight - 0.5) * 30);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#050816]">
      {/* 1. Base Grid Texture */}
      <div className="absolute inset-0 bg-grid w-full h-full opacity-100"></div>

      {/* 2. Glowing Aurora Blobs — optimized blur radius on mobile for GPU efficiency */}
      <motion.div
        style={{ x, y }}
        className="absolute inset-0 w-full h-full z-0"
      >
        {/* Top Right - Cyan blob */}
        <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#00E5FF] filter blur-[60px] md:blur-[100px] opacity-[0.20] animate-float-slow mix-blend-screen"></div>

        {/* Bottom Left - Purple blob */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-[#6C63FF] filter blur-[70px] md:blur-[110px] opacity-[0.22] animate-float-slow-delayed mix-blend-screen"></div>

        {/* Center - Teal blob */}
        <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#00FFC6] filter blur-[80px] md:blur-[120px] opacity-[0.16] animate-float-slow-alt mix-blend-screen"></div>

        {/* Extra - Deep Blue bottom right */}
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#4F46E5] filter blur-[60px] md:blur-[100px] opacity-[0.16] animate-float-slow mix-blend-screen"></div>
      </motion.div>

      {/* 3. Lighter vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050816_95%)] opacity-50 z-10 pointer-events-none"></div>

      {/* 4. Noise Texture Overlay */}
      <div className="absolute inset-0 w-full h-full noise-bg z-20 pointer-events-none"></div>
    </div>
  );
};

export default Background;
