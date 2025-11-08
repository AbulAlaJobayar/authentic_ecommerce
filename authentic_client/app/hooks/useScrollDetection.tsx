"use client"
import { useEffect, useState } from "react";

export const useScrollDetection = (threshold = 0) => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > threshold);
      ticking = false;
    };
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize on mount (in case user is already scrolled)
    updateScrollState();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);
  return isScrolled;
};
