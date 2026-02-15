"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "../GSAP/gsap_plugins";
import SvgArrow from "./svgArrow/svgArrow";
import Emojii from "./emojii/emojii";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollDirection } from "../Contexts/scrollDirection";
import {
  arrowdown,
  cart,
  dunya,
  logoo,
  kitch1,
  kitch2,
  kitch3,
  kitch4,
  kitch5,
  kitch6,
  kitch7,
  kitch8,
  kitch9,
  kitch10,
  kitch11,
  kitch12,
} from "../../../public/assets";
import SearchForm from "./searchForm";
import Navsvg from "./navsvg";
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text_one_ref = useRef<HTMLDivElement>(null);
  const text_two_ref = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const navbarContainerRef = useRef<HTMLDivElement>(null);

  // Dropdown refs
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const svgRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const timelinesRef = useRef<{ [key: string]: gsap.core.Timeline | undefined }>({});

  const imageRefs = useRef<{ [key: string]: HTMLDivElement[] }>({});
  const marqueeAnimations = useRef<{ [key: string]: number | null }>({});
  const marqueeContainerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const marqueeImageContainerRefs = useRef<{ [key: string]: HTMLDivElement[] }>({});
  const marqueePositions = useRef<{ [key: string]: number }>({});

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const dropdownImageData = {
    "over-ons": [
      {
        id: 1,
        title: "Nordic Marble Collection",
        src1: kitch1,
        alt1: "kitch1",
        src2: kitch2,
        alt2: "kitch2",
      },
      {
        id: 2,
        title: "Classic Oak Essentials",
        src1: kitch3,
        alt1: "kitch3",
        src2: kitch4,
        alt2: "kitch4",
      },
      {
        id: 3,
        title: "Minimalist Steel Line",
        src1: kitch5,
        alt1: "kitch5",
        src2: kitch6,
        alt2: "kitch6",
      },
      {
        id: 4,
        title: "Alpine Ceramic Series",
        src1: kitch7,
        alt1: "kitch7",
        src2: kitch8,
        alt2: "kitch8",
      },
      {
        id: 5,
        title: "Mediterranean Stone Range",
        src1: kitch9,
        alt1: "kitch9",
        src2: kitch10,
        alt2: "kitch10",
      },
      {
        id: 6,
        title: "Contemporary Glass Set",
        src1: kitch11,
        alt1: "kitch11",
        src2: kitch12,
        alt2: "kitch12",
      },
    ],

    inspiratie: [
      {
        id: 1,
        title: "Scandinavian Light Concept",
        src1: kitch1,
        alt1: "kitch1",
        src2: kitch7,
        alt2: "kitch7",
      },
      {
        id: 2,
        title: "Dutch Modern Layout",
        src1: kitch2,
        alt1: "kitch2",
        src2: kitch8,
        alt2: "kitch8",
      },
      {
        id: 3,
        title: "Parisian Compact Style",
        src1: kitch3,
        alt1: "kitch3",
        src2: kitch9,
        alt2: "kitch9",
      },
      {
        id: 4,
        title: "Italian Warm Finish",
        src1: kitch4,
        alt1: "kitch4",
        src2: kitch10,
        alt2: "kitch10",
      },
      {
        id: 5,
        title: "Berlin Industrial Mood",
        src1: kitch5,
        alt1: "kitch5",
        src2: kitch11,
        alt2: "kitch11",
      },
      {
        id: 6,
        title: "Copenhagen Airy Space",
        src1: kitch6,
        alt1: "kitch6",
        src2: kitch12,
        alt2: "kitch12",
      },
    ],

    populaire: [
      {
        id: 1,
        title: "Signature Porcelain Picks",
        src1: kitch12,
        alt1: "kitch12",
        src2: kitch3,
        alt2: "kitch3",
      },
      {
        id: 2,
        title: "Granite Counter Favorites",
        src1: kitch11,
        alt1: "kitch11",
        src2: kitch4,
        alt2: "kitch4",
      },
      {
        id: 3,
        title: "Polished Chrome Must-Haves",
        src1: kitch10,
        alt1: "kitch10",
        src2: kitch5,
        alt2: "kitch5",
      },
      {
        id: 4,
        title: "Cast Iron Classics",
        src1: kitch9,
        alt1: "kitch9",
        src2: kitch6,
        alt2: "kitch6",
      },
      {
        id: 5,
        title: "Modern Timber Trends",
        src1: kitch8,
        alt1: "kitch8",
        src2: kitch1,
        alt2: "kitch1",
      },
      {
        id: 6,
        title: "Quartz Surface Selection",
        src1: kitch7,
        alt1: "kitch7",
        src2: kitch2,
        alt2: "kitch2",
      },
    ],

    webshop: [
      {
        id: 1,
        title: "Premium Utensil Market",
        src1: kitch2,
        alt1: "kitch2",
        src2: kitch11,
        alt2: "kitch11",
      },
      {
        id: 2,
        title: "Designer Cabinet Store",
        src1: kitch4,
        alt1: "kitch4",
        src2: kitch9,
        alt2: "kitch9",
      },
      {
        id: 3,
        title: "Curated Cookware Hub",
        src1: kitch6,
        alt1: "kitch6",
        src2: kitch7,
        alt2: "kitch7",
      },
      {
        id: 4,
        title: "Artisan Kitchen Boutique",
        src1: kitch8,
        alt1: "kitch8",
        src2: kitch5,
        alt2: "kitch5",
      },
      {
        id: 5,
        title: "Euro Appliance Corner",
        src1: kitch10,
        alt1: "kitch10",
        src2: kitch3,
        alt2: "kitch3",
      },
      {
        id: 6,
        title: "Home Chef Essentials",
        src1: kitch12,
        alt1: "kitch12",
        src2: kitch1,
        alt2: "kitch1",
      },
    ],
  };

  const { scrollDirection } = useScrollDirection();

  const marqueeItems = [
    "Free Shipping on Orders Over $50",
    "New Season Drop Just Landed",
    "Buy 2 Tees — Get 1 Free",
    "10% Off Your First Order",
    "Limited Edition Pieces — While Stocks Last",
  ];

  const nav_links_one = [
    { linkName: "New in", link: "/" },
    { linkName: "Men", link: "/" },
    { linkName: "Women", link: "/" },
  ];

  // Dropdown links with keys for identification
  const dropdownLinks = [
    { id: "over-ons", label: "Over ons", hasDropdown: true },
    { id: "inspiratie", label: "Inspiratie", hasDropdown: true },
    { id: "configurator", label: "Configurator", hasDropdown: false },
    { id: "populaire", label: "Populaire opstellingen", hasDropdown: true },
    { id: "webshop", label: "Webshop", hasDropdown: true },
    { id: "showroom", label: "Showroom", hasDropdown: false },
  ];

  let xPercent = 0;
  let direction = -1;

  let leaveTimeout: NodeJS.Timeout | null = null;
  let openTimeout: NodeJS.Timeout | null = null; // ← Add this

  const startMarquee = (dropdownId: string) => {
    const containers = marqueeImageContainerRefs.current[dropdownId];
    if (!containers || containers.length === 0) return;

    let xPercent = marqueePositions.current[dropdownId] || 0;

    const animate = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      }

      gsap.set(containers, { xPercent: xPercent });
      xPercent -= 0.025;

      marqueePositions.current[dropdownId] = xPercent;

      marqueeAnimations.current[dropdownId] = requestAnimationFrame(animate);
    };

    marqueeAnimations.current[dropdownId] = requestAnimationFrame(animate);
  };

  const stopMarquee = (dropdownId: string) => {
    if (marqueeAnimations.current[dropdownId]) {
      cancelAnimationFrame(marqueeAnimations.current[dropdownId]!);
      marqueeAnimations.current[dropdownId] = null;
    }
  };

  const pauseMarquee = (dropdownId: string) => {
    stopMarquee(dropdownId);
  };

  const resumeMarquee = (dropdownId: string) => {
    startMarquee(dropdownId);
  };

  // Handle dropdown hover
  const handleDropdownEnter = (dropdownId: string) => {
    // Clear any pending leave timeout
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }

    if (openTimeout) {
      clearTimeout(openTimeout);
      openTimeout = null;
    }

    // Close current dropdown if different
    if (activeDropdown && activeDropdown !== dropdownId) {
      closeDropdown(activeDropdown);

      // Wait for close animation to finish before opening new one
      openTimeout = setTimeout(() => {
        setActiveDropdown(dropdownId);
        openDropdown(dropdownId);
      }, 300); // Match this to closeDropdown duration
    } else if (!activeDropdown) {
      // No dropdown open, open immediately
      setActiveDropdown(dropdownId);
      openDropdown(dropdownId);
    }
  };

  const handleDropdownLeave = () => {
    // Delay closing to allow mouse to move to next dropdown
    leaveTimeout = setTimeout(() => {
      if (activeDropdown) {
        closeDropdown(activeDropdown);
        setActiveDropdown(null);
      }
    }, 100); // Small delay
  };

  // NEW: Safety handler for when mouse leaves entire navbar
  const handleNavbarLeave = () => {
    // Clear any pending timeout
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }

    if (openTimeout) {
      // ← Clear the open timeout too!
      clearTimeout(openTimeout);
      openTimeout = null;
    }

    // Close active dropdown immediately
    if (activeDropdown) {
      closeDropdown(activeDropdown);
      setActiveDropdown(null);
    }
  };

  const openDropdown = (dropdownId: string) => {
    const dropdown = dropdownRefs.current[dropdownId];
    const svg = svgRefs.current[dropdownId];
    const images = imageRefs.current[dropdownId] || [];

    if (!dropdown) return;

    // Kill any existing timeline
    if (timelinesRef.current[dropdownId]) {
      timelinesRef.current[dropdownId].kill();
    }

    // Create new timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // 1. Show and scale dropdown
    tl.set(dropdown, { display: "block" }).to(
      dropdown,
      {
        scaleY: 1,
        duration: 0.4,
        ease: "power3.out",
      },
      0
    );

    // 2. Rotate SVG
    if (svg) {
      tl.to(
        svg,
        {
          rotation: 180,
          duration: 0.5,
          ease: "back.out(2)",
        },
        0
      );
    }

    // 3. Animate images (all properties together)
    if (images.length > 0) {
      tl.set(images, { transformOrigin: "left center" })
        .fromTo(
          images,
          {
            x: 25,
            scaleX: 1.02,
            marginRight: 32,
          },
          {
            x: 0,
            scaleX: 1,
            marginRight: 16,
            duration: 1,
            stagger: 0.05,
            ease: "power2.out",
          },
          0.3
        )
        .fromTo(
          images,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.4, // Faster opacity (0.4s vs 0.8s)
            stagger: 0.05,
            ease: "power2.out",
          },
          0.3 // Start at same time
        )

        // START MARQUEE
        .call(() => startMarquee(dropdownId), [], 0.45);
    }

    timelinesRef.current[dropdownId] = tl;
  };

  const closeDropdown = (dropdownId: string) => {
    const dropdown = dropdownRefs.current[dropdownId];
    const svg = svgRefs.current[dropdownId];
    const images = imageRefs.current[dropdownId] || [];
    const imageContainers = marqueeImageContainerRefs.current[dropdownId];

    if (!dropdown) return;

    stopMarquee(dropdownId);

    // Kill existing timeline
    if (timelinesRef.current[dropdownId]) {
      timelinesRef.current[dropdownId]!.kill();
    }

    const tl = gsap.timeline();

    // 1. Fade out images FIRST (user sees this)
    if (images.length > 0) {
      tl.to(
        images,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0
      );
    }

    // 2. THEN reset everything (hidden by opacity: 0)
    tl.to(
      images,
      {
        x: 25,
        scaleX: 1.02,
        marginRight: 32,
        duration: 0.05,
      },
      0.2 // Starts AFTER opacity finishes
    );

    // 3. Reset image containers position (also hidden)
    if (imageContainers && imageContainers.length > 0) {
      tl.set(imageContainers, { xPercent: 0 }, 0.2);
    }

    // 4. Reset stored marquee position
    tl.call(
      () => {
        marqueePositions.current[dropdownId] = 0;
      },
      [],
      0.2
    );

    // 5. Scale dropdown out (can happen simultaneously with fade)
    tl.to(
      dropdown,
      {
        scaleY: 0,
        duration: 0.3,
        ease: "power3.in",
      },
      0
    );

    // 6. Rotate SVG back
    if (svg) {
      tl.to(
        svg,
        {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );
    }

    // 7. Hide dropdown
    tl.set(dropdown, { display: "none" });

    timelinesRef.current[dropdownId] = tl;
  };

  // Scroll Direction Animation
  useEffect(() => {
    const dropdowns = gsap.utils.toArray(".dropdown");
    if (scrollDirection === "down") {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      tl.to(
        marqueeRef.current,
        {
          y: -48,
          duration: 0.5,
        },
        0
      ) // Start at time 0
        .to([dropdowns], { top: 54 }, 0)
        .to(
          navbarContainerRef.current,
          {
            width: "90%",
            height: 84,
            y: -16,
            // backgroundColor: "rgba(255, 255, 255, 0.5)",
            // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            duration: 0.5,
            overwrite: "auto",
          },
          0
        ); // Also start at time 0 (simultaneous)
    } else if (scrollDirection === "up") {
      const tl = gsap.timeline({
        defaults: { ease: "circ.inOut" },
      });

      tl.to(
        marqueeRef.current,
        {
          y: 0,
          duration: 0.4,
        },
        0.1
      ) // Start at time 0
        .to([dropdowns], { top: 60 }, 0)

        .to(
          navbarContainerRef.current,
          {
            width: "100%",
            y: 0,
            height: 96,
            // backgroundColor: "var(--tone-background)",
            // boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            backdropFilter: "blur(0px)",
            borderRadius: 0,
            duration: 0.4,
            overwrite: "auto",
          },
          0
        ); // Also start at time 0 (simultaneous)
    }
  }, [scrollDirection]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: "max",
      onUpdate: (self) => {
        direction = self.direction;
      },
    });
  }, []);

  useEffect(() => {
    console.log(scrollDirection);
  }, [scrollDirection]);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      } else if (xPercent > 0) {
        xPercent = -100;
      }

      gsap.set(text_one_ref.current, { xPercent: xPercent });
      gsap.set(text_two_ref.current, { xPercent: xPercent });
      xPercent += 0.05 * direction;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const renderItems = () =>
    marqueeItems.map((text, i) => (
      <div className="marquee_item" key={i}>
        <p>{text}</p>
        <span className="white_dot"></span>
      </div>
    ));

  const renderLinks = () =>
    nav_links_one.map((link, i) => (
      <Link href={link.link} key={i} className="links">
        <p>{link.linkName}</p>
        <div>
          <SvgArrow />
        </div>
      </Link>
    ));

  return (
    <div className="navbar_main" ref={containerRef}>
      <div className="navbar_main_container">
        <div className="marquee_main" ref={marqueeRef}>
          <div className="marquee_container">
            <div className="marquee_container_item" ref={text_one_ref}>
              {renderItems()}
            </div>

            <div className="marquee_container_item" ref={text_two_ref}>
              {renderItems()}
            </div>
          </div>
        </div>

        <div className="navbar_container" ref={navbarContainerRef} onMouseLeave={handleNavbarLeave}>
          <div className="dropdown"></div>
          <div className="links_container">
            <div className="links_container_links">
              <div className="logooo">
                <Image src={logoo} width={32} height={32} alt="logo" unoptimized />
              </div>
              <div
                className="logo_links"
                onMouseEnter={() => handleDropdownEnter("over-ons")}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href={"/"}>Over ons</Link>
                <div
                  ref={(el) => {
                    svgRefs.current["over-ons"] = el;
                  }}
                >
                  <Navsvg />
                </div>
                <div
                  className="dropdown"
                  ref={(el) => {
                    dropdownRefs.current["over-ons"] = el;
                  }}
                >
                  <div className="dropdown_container">
                    <div
                      className="marquee_wrapper"
                      ref={(el) => {
                        marqueeContainerRefs.current["over-ons"] = el;
                      }}
                    >
                      <div
                        className="marquee_images"
                        ref={(el) => {
                          if (!marqueeImageContainerRefs.current["over-ons"]) {
                            marqueeImageContainerRefs.current["over-ons"] = [];
                          }
                          if (el) marqueeImageContainerRefs.current["over-ons"][0] = el; // First container
                        }}
                        onMouseEnter={() => pauseMarquee("over-ons")}
                        onMouseLeave={() => resumeMarquee("over-ons")}
                      >
                        {dropdownImageData["over-ons"].map((img, index) => (
                          <div
                            key={img.id}
                            ref={(el) => {
                              if (!imageRefs.current["over-ons"]) {
                                imageRefs.current["over-ons"] = [];
                              }
                              if (el) imageRefs.current["over-ons"][index] = el;
                            }}
                            className="marquee_image"
                          >
                            <div className="img_div">
                              <Image
                                src={img.src1}
                                alt={img.alt1}
                                width={300}
                                height={400}
                                unoptimized
                              />

                              <Image
                                src={img.src2}
                                alt={img.alt2}
                                width={300}
                                height={400}
                                unoptimized
                              />
                            </div>
                            <div className="image_text">
                              <p>{img.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        className="marquee_images"
                        ref={(el) => {
                          if (!marqueeImageContainerRefs.current["over-ons"]) {
                            marqueeImageContainerRefs.current["over-ons"] = [];
                          }
                          if (el) marqueeImageContainerRefs.current["over-ons"][1] = el; // Second container
                        }}
                        onMouseEnter={() => pauseMarquee("over-ons")}
                        onMouseLeave={() => resumeMarquee("over-ons")}
                      >
                        {dropdownImageData["over-ons"].map((img, index) => (
                          <div key={img.id} className="marquee_image">
                            <div className="img_div">
                              <Image
                                src={img.src1}
                                alt={img.alt1}
                                width={300}
                                height={400}
                                unoptimized
                              />
                              <Image
                                src={img.src2}
                                alt={img.alt2}
                                width={300}
                                height={400}
                                unoptimized
                              />
                            </div>
                            <div className="image_text">
                              <p>{img.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="logo_links"
                onMouseEnter={() => handleDropdownEnter("inspiratie")}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href={"/"}>Inspiratie</Link>
                <div
                  ref={(el) => {
                    svgRefs.current["inspiratie"] = el;
                  }}
                >
                  <Navsvg />
                </div>
                <div
                  className="dropdown"
                  ref={(el) => {
                    dropdownRefs.current["inspiratie"] = el;
                  }}
                >
                  <div className="dropdown_container">
                    <div
                      className="marquee_wrapper"
                      ref={(el) => {
                        marqueeContainerRefs.current["inspiratie"] = el;
                      }}
                    >
                      <div
                        className="marquee_images"
                        ref={(el) => {
                          if (!marqueeImageContainerRefs.current["inspiratie"]) {
                            marqueeImageContainerRefs.current["inspiratie"] = [];
                          }
                          if (el) marqueeImageContainerRefs.current["inspiratie"][0] = el; // First container
                        }}
                        onMouseEnter={() => pauseMarquee("inspiratie")}
                        onMouseLeave={() => resumeMarquee("inspiratie")}
                      >
                        {dropdownImageData["inspiratie"].map((img, index) => (
                          <div
                            key={img.id}
                            ref={(el) => {
                              if (!imageRefs.current["inspiratie"]) {
                                imageRefs.current["inspiratie"] = [];
                              }
                              if (el) imageRefs.current["inspiratie"][index] = el;
                            }}
                            className="marquee_image"
                          >
                            <div className="img_div">
                              <Image
                                src={img.src1}
                                alt={img.alt1}
                                width={300}
                                height={400}
                                unoptimized
                              />

                              <Image
                                src={img.src2}
                                alt={img.alt2}
                                width={300}
                                height={400}
                                unoptimized
                              />
                            </div>
                            <div className="image_text">
                              <p>{img.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        className="marquee_images"
                        ref={(el) => {
                          if (!marqueeImageContainerRefs.current["inspiratie"]) {
                            marqueeImageContainerRefs.current["inspiratie"] = [];
                          }
                          if (el) marqueeImageContainerRefs.current["inspiratie"][1] = el; // Second container
                        }}
                        onMouseEnter={() => pauseMarquee("inspiratie")}
                        onMouseLeave={() => resumeMarquee("inspiratie")}
                      >
                        {dropdownImageData["inspiratie"].map((img, index) => (
                          <div key={img.id} className="marquee_image">
                            <div className="img_div">
                              <Image
                                src={img.src1}
                                alt={img.alt1}
                                width={300}
                                height={400}
                                unoptimized
                              />
                              <Image
                                src={img.src2}
                                alt={img.alt2}
                                width={300}
                                height={400}
                                unoptimized
                              />
                            </div>
                            <div className="image_text">
                              <p>{img.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="links_container_mid">
              <div className="logo_links">
                <Link href={"/"}>Configurator</Link>
              </div>

              <div
                className="logo_links"
                onMouseEnter={() => handleDropdownEnter("populaire")}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href={"/"}>Populaire opstellingen</Link>
                <div
                  ref={(el) => {
                    svgRefs.current["populaire"] = el;
                  }}
                >
                  <Navsvg />
                </div>
                <div
                  className="dropdown"
                  ref={(el) => {
                    dropdownRefs.current["populaire"] = el;
                  }}
                ></div>
              </div>

              <div
                className="logo_links"
                onMouseEnter={() => handleDropdownEnter("webshop")}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href={"/"}>Webshop</Link>
                <div
                  ref={(el) => {
                    svgRefs.current["webshop"] = el;
                  }}
                >
                  <Navsvg />
                </div>
                <div
                  className="dropdown"
                  ref={(el) => {
                    dropdownRefs.current["webshop"] = el;
                  }}
                ></div>
              </div>

              <div className="logo_links">
                <Link href={"/"}>Showroom</Link>
              </div>
            </div>

            <div className="links_container_cart">
              <div className="cart">
                <Image src={cart} width={48} height={48} alt="cart" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
