import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out"
      });
    };
    
    const handleMouseOver = (e) => {
      const isInteractable = e.target.closest("a") || e.target.closest("button") || e.target.closest(".magnetic");
      setIsHovering(!!isInteractable);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center -ml-2 -mt-2 transition-all duration-300 ease-out hidden md:flex ${
          isHovering ? "scale-[4] opacity-80 bg-white" : "scale-100 opacity-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
