"use client";

import gsap from "gsap";
import "./css/index.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { fun1, fun2, vogue } from "../../public/assets";
import ScrollRevealSection from "./Components/pixels/page";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap/GSDevTools";
gsap.registerPlugin(SplitText, GSDevTools, ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = SplitText.create(".tx_one", {
        type: "chars",
        charsClass: "char",
      });

      const split2 = SplitText.create(".tx_two", {
        type: "chars",
        charsClass: "char",
      });

      const split3 = SplitText.create(".tx_three", {
        type: "chars",
        charsClass: "char",
      });

      gsap.set([".tb1", ".tb2"], {
        perspective: 1000,
        transformStyle: "preserve-3d",
      });

      gsap.set([split.chars, split2.chars], {
        display: "inline-block",
        rotationY: 50, // Starting at South-East facing
        rotationX: -50, // Leaning way forward (adjust to 45-90 for quarter to half lean)
        skewY: -20,
        z: -250,
        y: "60%",
        opacity: 0,
        // filter: "blur(8px)",

        // transformOrigin: "50% 100%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%", // When top of textRef hits 90% of viewport
          end: "bottom 20%",
          toggleActions: "play none none none",
          markers: true, // Uncomment to see the trigger points
        },
        defaults: {
          ease: "power4.inOut",
        },
      });

      // tl1
      tl.to([split.chars, split2.chars], { filter: "blur(0)" });
      tl.to(
        [split.chars, split2.chars],
        {
          // opacity: 0,
          z: 0,
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.005,
        },
        0
      ).to(
        [split.chars, split2.chars],
        {
          rotationY: 0, // Starting at South-East facing
          rotationX: 0, // Leaning way forward (adjust to 45-90 for quarter to half lean)
          skewY: 0,
          duration: 0.5,
          stagger: 0.01,
        },
        0
      );

      // // tl 2 =>
      // tl.from([split.chars, split2.chars], {
      //   y: "200px",
      //   opacity: 0,
      //   skewY: 60,
      //   skewX: -45,
      //   z: -250,
      //   filter: "blur(8px)",
      //   transformOrigin: "50% 100%",
      //   duration: 1.2,
      //   ease: "power3.inOut",
      //   stagger: {
      //     amount: 0.05,
      //     from: "end",
      //   },
      // });

      // GSDevTools.create({ animation: tl });
    },

    { scope: container }
  );

  return (
    <div className="main_container" ref={container}>
      <section className="hero">
        <Image src={vogue} width={100} height={100} alt="vogue" unoptimized />
      </section>

      <section className="black"></section>

      <section className="white">
        <ScrollRevealSection />
      </section>

      <section className="footer">
        <div className="text" ref={textRef}>
          <div className="textbox_one">
            <div className="tb1">
              <h1 className="tx_one">Design &</h1>
            </div>
            <div className="tb1">
              <h1 className="tx_two">Development</h1>
            </div>
          </div>

          <div className="textbox_two">
            <span>Chapter</span>
            <div className="tb2">
              <h1 className="tx_three">02</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="whiter">
        <div className="whiter_container">
          <div className="populaire">
            <h1>
              Meer populaire <br /> opstellingen
            </h1>
            <div className="populaire_img">
              <Image src={fun1} width={100} height={100} alt="furniture" unoptimized />
            </div>
          </div>
          <div className="populaire_two">
            <p>
              Standaard vijf jaar garantie <br /> op al onze keukenkasten
            </p>
            <div className="populaire_img2">
              <Image src={fun2} width={100} height={100} alt="furniture" unoptimized />
            </div>
          </div>
        </div>
      </section>

      <section></section>
    </div>
  );
}
