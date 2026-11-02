import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const Background = () => {
  // useMotionValue instead of useState — avoids React re-renders on every mousemove
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-damped values drive the animation directly — no setState needed
  const x = useSpring(rawX, { damping: 50, stiffness: 50 });
  const y = useSpring(rawY, { damping: 50, stiffness: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 40);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [rawX, rawY]);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#050816]">
      {/* 1. Base Grid Texture */}
      <div className="absolute inset-0 bg-grid w-full h-full opacity-100"></div>

      {/* 2. Glowing Aurora Blobs — driven by motion values, zero React re-renders */}
      <motion.div
        style={{ x, y }}
        className="absolute inset-0 w-full h-full z-0"
      >
        {/* Top Right - Cyan blob */}
        <div className="absolute top-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-[#00E5FF] filter blur-[100px] opacity-[0.22] animate-float-slow mix-blend-screen"></div>

        {/* Bottom Left - Purple blob */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-[#6C63FF] filter blur-[110px] opacity-[0.25] animate-float-slow-delayed mix-blend-screen"></div>

        {/* Center - Teal blob */}
        <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#00FFC6] filter blur-[120px] opacity-[0.18] animate-float-slow-alt mix-blend-screen"></div>

        {/* Extra - Deep Blue bottom right */}
        <div className="absolute bottom-[10%] right-[5%] w-[35vw] h-[35vw] rounded-full bg-[#4F46E5] filter blur-[100px] opacity-[0.18] animate-float-slow mix-blend-screen"></div>
      </motion.div>

      {/* 3. Lighter vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050816_95%)] opacity-50 z-10 pointer-events-none"></div>

      {/* 4. Noise Texture Overlay */}
      <div className="absolute inset-0 w-full h-full noise-bg z-20 pointer-events-none"></div>
    </div>
  );
};

export default Background;
