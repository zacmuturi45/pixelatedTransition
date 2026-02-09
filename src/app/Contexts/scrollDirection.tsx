"use client";

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

type ScrollDirection = "up" | "down" | null;

interface ScrollDirectionContextType {
  scrollDirection: ScrollDirection;
  isScrolling: boolean;
  scrollY: number;
}

const ScrollDirectionContext = createContext<ScrollDirectionContextType | undefined>(undefined);

interface ScrollDirectionProviderProps {
  children: ReactNode;
  threshold?: number; // Minimum pixels to detect direction change
  debounceDelay?: number; // Delay in ms for scroll events
  disabled?: boolean; // Option to disable detection
}

export const ScrollDirectionProvider: React.FC<ScrollDirectionProviderProps> = ({
  children,
  threshold = 10,
  debounceDelay = 100,
  disabled = false,
}) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update current scroll position
      setScrollY(currentScrollY);

      // Check if scroll exceeds threshold
      if (Math.abs(currentScrollY - lastScrollY.current) < threshold) {
        lastScrollY.current = currentScrollY;
        return;
      }

      // Determine scroll direction
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      setScrollDirection(direction);
      setIsScrolling(true);
      lastScrollY.current = currentScrollY;

      // Reset scrolling state after delay
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Debounced scroll handler
    const debouncedScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", debouncedScroll, { passive: true });

    // Initialize with current scroll position
    setScrollY(window.scrollY);

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [threshold, debounceDelay, disabled]);

  const value = {
    scrollDirection,
    isScrolling,
    scrollY,
  };

  return (
    <ScrollDirectionContext.Provider value={value}>{children}</ScrollDirectionContext.Provider>
  );
};

// Custom hook to use the scroll direction context
export const useScrollDirection = () => {
  const context = useContext(ScrollDirectionContext);

  if (context === undefined) {
    throw new Error("useScrollDirection must be used within a ScrollDirectionProvider");
  }

  return context;
};
