"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { arrowtopright, el1, el2, el3, el4, el5 } from "../../../public/assets";
import Image, { StaticImageData } from "next/image";
import "../css/index.css";

interface ImageItem {
  id: number;
  description: string;
  image: StaticImageData;
}

const ImageReveal = () => {
  const items: ImageItem[] = [
    { id: 1, description: "ELEMENTIS Story", image: el1 },
    { id: 2, description: "Our Vision & Mission", image: el2 },
    { id: 3, description: "Our Commitment", image: el3 },
    { id: 4, description: "Our Pillars", image: el4 },
    { id: 5, description: "Sustainability", image: el5 },
  ];

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverIndicatorRef = useRef<HTMLDivElement | null>(null);

  const zIndexCounter = useRef<number>(1);
  const currentVisibleIndex = useRef<number>(0);
  const indicatorInitialized = useRef<boolean>(false);

  useGSAP(() => {
    if (imageRefs.current[0] && imageInnerRefs.current[0]) {
      gsap.set(imageRefs.current[0], {
        clipPath: "inset(0% 0% 0% 0%)",
        zIndex: 1,
      });
      gsap.set(imageInnerRefs.current[0], { scale: 1 });
    }
  }, []);

  const handleHover = (index: number): void => {
    const imageElement = imageRefs.current[index];
    const imageInner = imageInnerRefs.current[index];
    const descElement = descRefs.current[index];
    const indicator = hoverIndicatorRef.current;

    if (!imageElement || !imageInner || !descElement || !indicator) return;

    // 🔧 FIX — kill any running tweens first
    gsap.killTweensOf(indicator);

    const descRect = descElement.getBoundingClientRect();
    const containerRect = descElement.parentElement?.getBoundingClientRect();

    if (!containerRect) return;

    let relativeTop = descRect.top - containerRect.top;
    let height = descRect.height;

    if (index === 0) {
      relativeTop -= 1;
      height += 2;
    } else {
      relativeTop -= 4;
      height += 3;
    }

    if (!indicatorInitialized.current) {
      gsap.set(indicator, {
        y: relativeTop,
        height,
        scaleY: 0,
        transformOrigin: "top",
      });

      gsap.to(indicator, {
        scaleY: 1,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });

      indicatorInitialized.current = true;
    } else {
      gsap.to(indicator, {
        y: relativeTop,
        height,
        scaleY: 1,
        duration: 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    if (index === currentVisibleIndex.current) return;

    const isMovingDown = index > currentVisibleIndex.current;

    zIndexCounter.current += 1;

    gsap.set(imageElement, {
      zIndex: zIndexCounter.current,
    });

    gsap.set(imageElement, {
      clipPath: isMovingDown ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
    });

    gsap.set(imageInner, { scale: 1.2 });

    gsap.to(imageElement, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.7,
      ease: "power3.out",
    });

    gsap.to(imageInner, {
      scale: 1,
      duration: 1.2,
      ease: "power3.out",
    });

    currentVisibleIndex.current = index;
  };

  const handleMouseLeave = (): void => {
    const indicator = hoverIndicatorRef.current;
    if (!indicator) return;

    // 🔧 FIX — kill conflicting tweens
    gsap.killTweensOf(indicator);

    gsap.to(indicator, {
      scaleY: 0,
      duration: 0.4,
      ease: "power3.in",
      overwrite: "auto",
    });
  };

  return (
    <div className="elementis_main">
      <div className="container">
        {/* Images */}
        <div className="imageContainer">
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="image"
            >
              <div
                ref={(el) => {
                  imageInnerRefs.current[index] = el;
                }}
                className="imageInner"
              >
                <Image
                  src={item.image}
                  fill
                  alt={item.description}
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>

        {/* Descriptions */}
        <div className="descriptionsContainer" onMouseLeave={handleMouseLeave}>
          <div ref={hoverIndicatorRef} className="hoverIndicator" />

          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                descRefs.current[index] = el;
              }}
              className="desc"
              id={`el_${item.id}`}
              onMouseEnter={() => handleHover(index)}
            >
              <div className="description">
                <span className="number">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="title">{item.description}</h3>
              </div>

              <div className="arrow">
                <svg viewBox="0 0 25 25" width={48} height={48} fill="none">
                  <path d="M9 8.5H16.5V16" stroke="#ffffff" strokeWidth="1.2" />
                  <path d="M16.5 8.5L7 18" stroke="#ffffff" strokeWidth="1.2" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageReveal;
