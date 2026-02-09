"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "../GSAP/gsap_plugins";
import SvgArrow from "./svgArrow/svgArrow";
import Emojii from "./emojii/emojii";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollDirection } from "../Contexts/scrollDirection";
import { dunya } from "../../../public/assets";
import SearchForm from "./searchForm";
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text_one_ref = useRef<HTMLDivElement>(null);
  const text_two_ref = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const navbarContainerRef = useRef<HTMLDivElement>(null);

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

  let xPercent = 0;
  let direction = -1;

  // Scroll Direction Animation
  useEffect(() => {
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
        .to(
          navbarContainerRef.current,
          {
            width: "90%",
            height: 84,
            y: -16,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "250px",
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
            backgroundColor: "var(--tone-background)",
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
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
          <div className="links_container">
            <div className="links_container_links">{renderLinks()}</div>

            <div className="links_container_logo">
              <Image src={dunya} width={64} height={64} alt="dunya" unoptimized />
            </div>

            <div className="links_container_login">
              <div className="search">
                <SearchForm />
              </div>
              <div className="login">
                <p>Login</p>
              </div>
              <div className="cart">
                <p>Cart</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
