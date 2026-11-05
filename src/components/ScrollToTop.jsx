import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  const lastTrackedPathRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const currentPath = pathname + (search || "");

    // Prevent duplicate page_view events for the exact same path
    if (lastTrackedPathRef.current === currentPath) {
      return;
    }
    lastTrackedPathRef.current = currentPath;

    // Small delay ensures SEOHead has updated document.title before page_view is fired
    const timer = setTimeout(() => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "page_view", {
          page_path: currentPath,
          page_location: window.location.href,
          page_title: document.title,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
