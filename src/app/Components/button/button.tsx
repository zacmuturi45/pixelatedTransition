"use client";

import Image, { StaticImageData } from "next/image";
import React, { useEffect, useRef } from "react";
import { arrowtop } from "../../../../public/assets";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

interface ButtonProps {
  text?: string;
  image?: StaticImageData;
  shaftBackground?: string;
  shaftBorder?: string;
  textColor?: string;
  svgButtonBackground?: string;
  svgColor?: "black" | "white";
}

export default function Button({
  text = "Start met deze opstelleng",
  image = arrowtop,
  shaftBackground = "rgb(0, 0, 0)",
  shaftBorder = "none",
  textColor = "white",
  svgButtonBackground = "white",
  svgColor = "black",
}: ButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const shaftRef = useRef<HTMLDivElement>(null);
  const svgButtonRef = useRef<HTMLDivElement>(null);
  const textOneRef = useRef<HTMLParagraphElement>(null);
  const textTwoRef = useRef<HTMLParagraphElement>(null);
  const arrowOneRef = useRef<HTMLDivElement>(null);
  const arrowTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const shaft = shaftRef.current;
    const svgButton = svgButtonRef.current;
    const textOne = textOneRef.current;
    const textTwo = textTwoRef.current;
    const arrowOne = arrowOneRef.current;
    const arrowTwo = arrowTwoRef.current;

    if (!button || !shaft || !svgButton || !textOne || !textTwo || !arrowOne || !arrowTwo) return;

    // Calculate dimensions dynamically based on content
    const shaftWidth = shaft.offsetWidth || 0;
    const svgWidth = svgButton.offsetWidth || 0;
    const expandedWidth = shaftWidth + svgWidth + 12; // 12px for gap

    const hoverTimeline = gsap.timeline({ paused: true });
    let arrowTl: gsap.core.Timeline | null = null;
    let delayedCallInstance: gsap.core.Tween | null = null;

    // Set initial positions for arrows
    gsap.set(arrowTwo, { x: -35.35, y: 35.35, opacity: 0 });

    const createArrowTimeline = () => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(arrowOne, {
        x: 35.35,
        y: -35.35,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
      })
        .to(
          arrowTwo,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          0.8
        )
        .set(arrowOne, { x: -35.35, y: 35.35 })
        .to(
          arrowOne,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          2.8
        )
        .to(
          arrowTwo,
          {
            x: 35.35,
            y: -35.35,
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          1.8
        )
        .set(arrowTwo, { x: -35.35, y: 35.35 });

      return tl;
    };

    const originalSplit = new SplitText(textOne, {
      type: "words",
      wordsClass: "words",
    });

    const cloneSplit = new SplitText(textTwo, {
      type: "words",
      wordsClass: "words",
    });

    hoverTimeline
      .to(originalSplit.words, {
        yPercent: -100,
        duration: 0.25,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        stagger: 0.02,
      })
      .to(
        cloneSplit.words,
        {
          yPercent: -100,
          duration: 0.25,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          stagger: 0.02,
        },
        0
      )
      .to(
        shaft,
        {
          width: expandedWidth,
          paddingRight: 8,
          duration: 0.3,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        },
        0
      )
      .to(
        svgButton,
        {
          display: "flex",
          scale: 1,
          duration: 0.4,
          ease: "power3.inOut",
        },
        0.2
      );

    const handleMouseEnter = () => {
      hoverTimeline.play();

      if (delayedCallInstance) {
        delayedCallInstance.kill();
      }

      if (arrowTl) {
        arrowTl.kill();
      }

      delayedCallInstance = gsap.delayedCall(1, () => {
        arrowTl = createArrowTimeline();
        arrowTl.play();
      });
    };

    const handleMouseLeave = () => {
      hoverTimeline.reverse();

      if (delayedCallInstance) {
        delayedCallInstance.kill();
      }

      if (arrowTl) {
        arrowTl.kill();
        arrowTl = null;
      }

      gsap.to([arrowOne, arrowTwo], {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.2,
        overwrite: true,
        onComplete: () => {
          gsap.set(arrowTwo, { x: -35.35, y: 35.35, opacity: 0 });
          gsap.set(arrowOne, { x: 0, y: 0, opacity: 1 });
        },
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      if (delayedCallInstance) {
        delayedCallInstance.kill();
      }
      if (arrowTl) {
        arrowTl.kill();
      }
      hoverTimeline.kill();
      originalSplit.revert();
      cloneSplit.revert();
      gsap.killTweensOf([arrowOne, arrowTwo]);
    };
  }, [text]); // Re-run when text changes

  return (
    <div className="main_button" ref={buttonRef}>
      <div
        className="main_shaft"
        style={{
          backgroundColor: shaftBackground,
          border: shaftBorder,
        }}
        ref={shaftRef}
      >
        <div className="pdiv">
          <p className="p_uno" style={{ color: textColor }} ref={textOneRef}>
            {text}
          </p>
          <p className="p_des" style={{ color: textColor }} ref={textTwoRef}>
            {text}
          </p>
        </div>
        <div
          className="svgButton"
          style={{ backgroundColor: svgButtonBackground }}
          ref={svgButtonRef}
        >
          <div className="img1" ref={arrowOneRef}>
            <Image
              src={image}
              width={48}
              height={48}
              alt="svgicon"
              style={{
                filter: svgColor === "white" ? "invert(1) brightness(2)" : "none",
              }}
            />
          </div>
          <div className="img2" ref={arrowTwoRef}>
            <Image
              src={image}
              width={48}
              height={48}
              alt="svgicon"
              style={{
                filter: svgColor === "white" ? "invert(1) brightness(2)" : "none",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import Image, { StaticImageData } from "next/image";
// import React, { useEffect, useRef } from "react";
// import { arrowtop } from "../../../../public/assets";
// import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";
// gsap.registerPlugin(SplitText);

// interface ButtonProps {
//   text?: string;
//   image?: StaticImageData;
//   mainShaftBackground?: string;
//   mainTextBackground?: string;
// }

// export default function Button({
//   text = "Start met deze opstelleng",
//   image = arrowtop,
//   mainShaftBackground = "rgb(0, 0, 0)",
//   mainTextBackground = "white",
// }: ButtonProps) {
//   const buttonRef = useRef<HTMLDivElement>(null);
//   const shaftRef = useRef<HTMLDivElement>(null);
//   const svgButtonRef = useRef<HTMLDivElement>(null);
//   const textOneRef = useRef<HTMLParagraphElement>(null);
//   const textTwoRef = useRef<HTMLParagraphElement>(null);
//   const arrowOneRef = useRef<HTMLDivElement>(null);
//   const arrowTwoRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const button = buttonRef.current;
//     const shaft = shaftRef.current;
//     const svgButton = svgButtonRef.current;
//     const textOne = textOneRef.current;
//     const textTwo = textTwoRef.current;
//     const arrowOne = arrowOneRef.current;
//     const arrowTwo = arrowTwoRef.current;

//     if (!button || !shaft || !svgButton || !textOne || !textTwo || !arrowOne || !arrowTwo) return;
//     const shaftWidth = shaft.offsetWidth || 0;
//     const svgWidth = svgButton.offsetWidth || 0;
//     const expandedWidth = shaftWidth + svgWidth + 12; // 8px for gap

//     const hoverTimeline = gsap.timeline({ paused: true });
//     let arrowTl: gsap.core.Timeline | null = null;
//     let delayedCallInstance: gsap.core.Tween | null = null;

//     // Set initial positions for arrows
//     gsap.set(arrowTwo, { x: -35.35, y: 35.35, opacity: 0 });

//     const createArrowTimeline = () => {
//       const tl = gsap.timeline({ repeat: -1 });

//       // Arrow loop animation - smoother with x/y instead of transform
//       tl.to(arrowOne, {
//         x: 35.35,
//         y: -35.35,
//         opacity: 0,
//         duration: 1,
//         ease: "power2.in",
//       })
//         .to(
//           arrowTwo,
//           {
//             x: 0,
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: "power2.out",
//           },
//           0.8
//         )
//         .set(arrowOne, { x: -35.35, y: 35.35 })
//         .to(
//           arrowOne,
//           {
//             x: 0,
//             y: 0,
//             opacity: 1,
//             duration: 1,
//             ease: "power2.out",
//           },
//           2.8
//         )
//         .to(
//           arrowTwo,
//           {
//             x: 35.35,
//             y: -35.35,
//             opacity: 0,
//             duration: 1,
//             ease: "power2.in",
//           },
//           1.8
//         )
//         .set(arrowTwo, { x: -35.35, y: 35.35 });

//       return tl;
//     };

//     const originalSplit = new SplitText(textOne, {
//       type: "words",
//       wordsClass: "words",
//     });

//     const cloneSplit = new SplitText(textTwo, {
//       type: "words",
//       wordsClass: "words",
//     });

//     hoverTimeline
//       .to(originalSplit.words, {
//         yPercent: -100,
//         duration: 0.25,
//         ease: "cubic-bezier(0.16, 1, 0.3, 1)",
//         stagger: 0.02,
//       })
//       .to(
//         cloneSplit.words,
//         {
//           yPercent: -100,
//           duration: 0.25,
//           ease: "cubic-bezier(0.16, 1, 0.3, 1)",
//           stagger: 0.02,
//         },
//         0
//       )
//       .to(
//         shaft,
//         {
//           width: expandedWidth,
//           paddingRight: 8,
//           duration: 0.3,
//           ease: "cubic-bezier(0.16, 1, 0.3, 1)",
//         },
//         0
//       )
//       .to(
//         svgButton,
//         {
//           display: "flex",
//           scale: 1,
//           duration: 0.4,
//           ease: "power3.inOut",
//         },
//         0.2
//       );

//     // Mouse enter handler
//     const handleMouseEnter = () => {
//       hoverTimeline.play();

//       // Kill any existing delayed call
//       if (delayedCallInstance) {
//         delayedCallInstance.kill();
//       }

//       // Kill existing arrow timeline if it exists
//       if (arrowTl) {
//         arrowTl.kill();
//       }

//       // Start arrow animation after delay
//       delayedCallInstance = gsap.delayedCall(1, () => {
//         arrowTl = createArrowTimeline(); // Create fresh timeline
//         arrowTl.play();
//       });
//     };

//     const handleMouseLeave = () => {
//       hoverTimeline.reverse();

//       // Kill delayed call
//       if (delayedCallInstance) {
//         delayedCallInstance.kill();
//       }

//       // Kill arrow timeline
//       if (arrowTl) {
//         arrowTl.kill();
//         arrowTl = null;
//       }

//       // Reset to initial state
//       gsap.to([arrowOne, arrowTwo], {
//         x: 0,
//         y: 0,
//         opacity: 1,
//         duration: 0.2,
//         overwrite: true,
//         onComplete: () => {
//           gsap.set(arrowTwo, { x: -35.35, y: 35.35, opacity: 0 });
//           gsap.set(arrowOne, { x: 0, y: 0, opacity: 1 });
//         },
//       });
//     };

//     button.addEventListener("mouseenter", handleMouseEnter);
//     button.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       button.removeEventListener("mouseenter", handleMouseEnter);
//       button.removeEventListener("mouseleave", handleMouseLeave);
//       if (delayedCallInstance) {
//         delayedCallInstance.kill();
//       }
//       if (arrowTl) {
//         arrowTl.kill();
//       }
//       hoverTimeline.kill();
//       gsap.killTweensOf([arrowOne, arrowTwo]);
//     };
//   }, []);

//   return (
//     <div className="main_button" ref={buttonRef}>
//       <div className="main_shaft" style={{ backgroundColor: mainShaftBackground }} ref={shaftRef}>
//         <div className="pdiv">
//           <p className="p_uno" style={{ color: mainTextBackground }} ref={textOneRef}>
//             {text}
//           </p>
//           <p className="p_des" style={{ color: mainTextBackground }} ref={textTwoRef}>
//             {text}
//           </p>
//         </div>
//         <div className="svgButton" ref={svgButtonRef}>
//           <div className="img1" ref={arrowOneRef}>
//             <Image src={image} width={48} height={48} alt="svgicon" />
//           </div>
//           <div className="img2" ref={arrowTwoRef}>
//             {" "}
//             <Image src={image} width={48} height={48} alt="svgicon" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
