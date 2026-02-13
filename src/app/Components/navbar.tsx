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
import { arrowdown, cart, dunya, logoo } from "../../../public/assets";
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

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

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

  // Handle dropdown hover
  const handleDropdownEnter = (dropdownId: string) => {
    // Close current dropdown if different
    if (activeDropdown && activeDropdown !== dropdownId) {
      closeDropdown(activeDropdown);

      // Wait for close animation to finish before opening new one
      setTimeout(() => {
        setActiveDropdown(dropdownId);
        openDropdown(dropdownId);
      }, 300); // Match this to closeDropdown duration
    } else {
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

  const openDropdown = (dropdownId: string) => {
    const dropdown = dropdownRefs.current[dropdownId];
    const svg = svgRefs.current[dropdownId];

    if (!dropdown) return;

    // Kill any existing timeline
    if (timelinesRef.current[dropdownId]) {
      timelinesRef.current[dropdownId].kill();
    }

    // Create new timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    tl.to(
      dropdown,
      {
        scaleY: 1,
        duration: 0.4,
        ease: "power3.out",
      },
      0
    );

    if (svg) {
      tl.to(
        svg,
        {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut",
        },
        0
      );
    }

    timelinesRef.current[dropdownId] = tl;
  };

  const closeDropdown = (dropdownId: string) => {
    const dropdown = dropdownRefs.current[dropdownId];
    const svg = svgRefs.current[dropdownId];

    if (!dropdown) return;

    // Kill existing timeline if any
    if (timelinesRef.current[dropdownId]) {
      timelinesRef.current[dropdownId].kill();
    }

    // Create closing timeline
    const tl = gsap.timeline({
      defaults: { ease: "power2.in" },
    });

    tl.to(
      dropdown,
      {
        scaleY: 0,
        duration: 0.3,
        ease: "power3.in",
      },
      0
    );

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
        .to([dropdowns], { top: 48 }, 0)
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

        <div className="navbar_container" ref={navbarContainerRef}>
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
                  style={{ backgroundColor: "blue" }}
                ></div>
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
                  style={{ backgroundColor: "red" }}
                ></div>
              </div>
            </div>

            <div className="links_container_mid">
              <div className="logo_links">
                <Link href={"/"}>Configurator</Link>
              </div>

              <div className="logo_links">
                <Link href={"/"}>Populaire opstellingen</Link>
                <Navsvg />
              </div>

              <div className="logo_links">
                <Link href={"/"}>Webshop</Link>
                <Navsvg />
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
