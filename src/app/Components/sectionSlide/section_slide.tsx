"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface ScrollRevealSectionProps {
  children: React.ReactNode;
  triggerPoint?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  className?: string;
}

export default function SectionSlide({
  children,
  triggerPoint = 0.25,
  stagger = 0.15,
  duration = 1.3,
  ease = "power2.out",
  className = "",
}: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Get all images and text elements
    const images = section.querySelectorAll("[data-scroll-image]");
    const texts = section.querySelectorAll("[data-scroll-text]");
    const lines = section.querySelectorAll("[data-scroll-line]");
    const lines_p = section.querySelectorAll("[data-scroll-line-p]");
    const item = section.querySelectorAll("[data-scroll-item]");

    // Split lines
    const split = new SplitText(lines, {
      type: "lines",
      linesClass: "line",
    });

    // Split lines
    const split_p = new SplitText(lines_p, {
      type: "lines",
      linesClass: "line",
    });

    split.lines.forEach((ln) => {
      const line = ln as HTMLElement;
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    split_p.lines.forEach((ln) => {
      const line = ln as HTMLElement;
      const wrapper = document.createElement("div");
      wrapper.style.overflow = "hidden";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    // Set initial state - images scaled to 0 from top center
    gsap.set(images, {
      clipPath: "inset(100% 0% 0% 0%)", // top right bottom left - clipped at bottom
      transformOrigin: "bottom center",
    });

    // Set initial state - text at bottom (yPercent: 100)
    gsap.set(texts, {
      yPercent: 100,
      opacity: 0,
    });

    // Create Scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: `top ${triggerPoint * 100}%`, // When top of section hits 75% of viewport
        toggleActions: "play none none none", // Play once on enter
        // markers: true,
      },
    });

    // Animate Lines
    tl.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: ease,
    });

    // Animate Lines
    tl.from(
      lines_p,
      {
        yPercent: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: ease,
      },
      0
    );

    // Animate images
    tl.to(
      images,
      {
        clipPath: "inset(0% 0% 0% 0%)", // Fully visible
        duration: duration,
        ease: ease,
        stagger: stagger,
      },
      0
    );

    // Animate text (starts slightly after images)
    tl.to(
      texts,
      {
        yPercent: 0,
        opacity: 1,
        duration: duration * 0.8,
        ease: ease,
        stagger: stagger,
      },
      0.2 // Start 0.2s after images
    );

    tl.from(
      item,
      {
        yPercent: 50,
        opacity: 0,
        duration: 0.8,
        ease: ease,
        stagger: stagger,
      },
      0.4 // Start 0.2s after images
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, [triggerPoint, stagger, duration, ease]);

  return <div ref={sectionRef}>{children}</div>;
}
