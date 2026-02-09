"use client";

import gsap from "gsap";
import "./css/index.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import {
  arrowdown,
  arrowtop,
  fun1,
  fun2,
  german,
  kei2,
  keis1,
  keis3,
  keis3b,
  pix,
  vogue,
} from "../../public/assets";
import ScrollRevealSection from "./Components/pixels/page";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap/GSDevTools";
import Button from "./Components/button/button";
import SectionSlide from "./Components/sectionSlide/section_slide";
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
          // markers: true, // Uncomment to see the trigger points
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
      //   duration: 1,
      //   ease: "power3.inOut",
      //   stagger: {
      //     amount: 0.25,
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
        <h1>Dunya Drip Coming to the world in a jiff</h1>
      </section>

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

      <SectionSlide>
        <section className="whiter">
          <div className="whiter_container">
            <div className="populaire">
              <h1 data-scroll-line>
                Meer populaire <br /> opstellingen
              </h1>
              <div className="populaire_img" data-scroll-image>
                <Image
                  src={fun1}
                  width={100}
                  height={100}
                  alt="furniture"
                  unoptimized
                  className="kei1"
                />
                <Image
                  src={kei2}
                  width={100}
                  height={100}
                  alt="furniture"
                  unoptimized
                  className="kei2"
                />
              </div>
              <div className="img_text">
                <div className="img_text_one">
                  <div className="uno">
                    <p data-scroll-text>Greeploos eiland, medium</p>
                  </div>
                  <div className="de">
                    <p data-scroll-text>3.541,-</p>
                  </div>
                </div>
                <div className="blobs">
                  <div className="blobs_container" data-scroll-text>
                    <span className="blob"></span>
                    <span className="blob"></span>
                    <span className="blob"></span>
                    <span className="colors">500+</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="populaire_two">
              <p className="p_populaire" data-scroll-line>
                Standaard vijf jaar garantie <br /> op al onze keukenkasten
              </p>
              <div className="populaire_img2" data-scroll-image>
                <Image
                  src={fun2}
                  width={100}
                  height={100}
                  alt="furniture"
                  unoptimized
                  className="keis1"
                />
                <Image
                  src={keis1}
                  width={100}
                  height={100}
                  alt="furniture"
                  unoptimized
                  className="keis2"
                />
              </div>
              <div className="img_text">
                <div className="img_text_one">
                  <div className="uno">
                    <p data-scroll-text>Rechte keuken, small</p>
                  </div>
                  <div className="de">
                    <p data-scroll-text>1.504,-</p>
                  </div>
                </div>
                <div className="blobs">
                  <div className="blobs_container">
                    <span className="blob"></span>
                    <span className="blob"></span>
                    <span className="blob"></span>
                    <span className="colors">500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionSlide>

      <SectionSlide>
        <section className="keis3">
          <div className="keis3_container">
            <div className="keis3_img" data-scroll-image>
              {" "}
              <Image
                src={keis3}
                width={100}
                height={100}
                alt="furniture"
                unoptimized
                className="keis3"
              />
              <Image
                src={keis3b}
                width={100}
                height={100}
                alt="furniture"
                unoptimized
                className="keis3b"
              />
            </div>

            <div className="img_text">
              <div className="img_text_one">
                <div className="uno">
                  <p data-scroll-text>Greeploos eiland, large</p>
                </div>
                <div className="de">
                  <p data-scroll-text>4.522,-</p>
                </div>
              </div>
              <div className="blobs">
                <div className="blobs_container">
                  <span className="blob"></span>
                  <span className="blob"></span>
                  <span className="blob"></span>
                  <span className="colors">500+</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionSlide>

      <SectionSlide>
        <section className="wil_je">
          <div className="wil_je_container">
            <div className="wil_je_text">
              <h1 data-scroll-line>
                Wil je liever <br />
                vanaf start zelf
                <br />
                samenstellen?
              </h1>
              <p data-scroll-line-p>
                Onze online keukenconfigurator is speciaal
                <br /> ontworpen om jouw creativiteit de vrije loop te <br />
                laten. Of je nu technisch onderlegd bent of niet,
                <br /> deze tool maakt het mogelijk om met gemak
                <br /> alle benodigde onderdelen samen te stellen.
              </p>
              <div data-scroll-item>
                <Button />
              </div>
            </div>

            <div className="wil_je_two">
              <div className="wil_je_two_img">
                <Image src={pix} width={100} height={100} alt="furniture" unoptimized />
              </div>

              <div className="wil_je_cta">
                <div>
                  <p>Meer inspiratie opdoen?</p>
                  <div className="line"></div>
                </div>
                <div>
                  <Image src={arrowdown} width={16} height={16} alt="arrowdownsvg" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionSlide>

      <SectionSlide>
        <section className="german">
          <div className="overlay" />
          <div className="german_container">
            <div className="text">
              <div className="wil_je_text">
                <h1 data-scroll-line>
                  Bespaar tot wel
                  <br />
                  35% op jouw
                  <br /> nieuwe keuken
                </h1>
                <p data-scroll-line-p>
                  Veelvuldig krijgen wij de vraag hoe het
                  <br />
                  mogelijk is dat wij zo voordelig zijn.
                  <br />
                  Dit komt doordat wij alle onnodige
                  <br />
                  marge uit onze prijzen gehaald hebben.
                </p>
                <div data-scroll-item>
                  <Button
                    text="Contact Us Now For more Info"
                    image={arrowtop}
                    shaftBackground="transparent"
                    shaftBorder="2px solid white"
                    textColor="white"
                    svgButtonBackground="white"
                    svgColor="black"
                  />
                </div>
              </div>
            </div>

            <div className="german_button">{/* <Button /> */}</div>
          </div>
        </section>
      </SectionSlide>
    </div>
  );
}
