// // OPTIMIZED ITERATION - NORMAL TRANSITION
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import { bali1, pin1, pin2, pin3 } from "../../../public/assets";
import "../css/index.css";
import { useGSAP } from "@gsap/react";

export default function ImageScrollSection() {
  const container = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);

  // Organized refs by index
  const mainImage1Ref = useRef(null);
  const mainImage2Ref = useRef(null);
  const mainImage3Ref = useRef(null);
  const mainImageRefs = [mainImage1Ref, mainImage2Ref, mainImage3Ref];

  const centerImage1Ref = useRef(null);
  const centerImage2Ref = useRef(null);
  const centerImage3Ref = useRef(null);
  const centerImageRefs = [centerImage1Ref, centerImage2Ref, centerImage3Ref];

  const paragraph1Ref = useRef(null);
  const paragraph2Ref = useRef(null);
  const paragraph3Ref = useRef(null);
  const paragraphRefs = [paragraph1Ref, paragraph2Ref, paragraph3Ref];

  const leftHeader1Ref = useRef(null);
  const leftHeader2Ref = useRef(null);
  const leftHeader3Ref = useRef(null);
  const leftHeaderRefs = [leftHeader1Ref, leftHeader2Ref, leftHeader3Ref];

  const rightHeader1Ref = useRef(null);
  const rightHeader2Ref = useRef(null);
  const rightHeader3Ref = useRef(null);
  const rightHeaderRefs = [rightHeader1Ref, rightHeader2Ref, rightHeader3Ref];

  // Image data
  const images = [bali1, pin2, pin3];
  const leftHeaders = ["Exhibit 001", "Exhibit 002", "Exhibit 003"];
  const rightHeaders = ["The Great Wave", "Starry Night", "The Persistence"];
  const paragraphs = [
    <>
      This is the first paragraph beautiful text.
      <br />
      It has three lines of content here.
      <br />
      Each line will animate beautifully.
    </>,
    <>
      This is the second paragraph text.
      <br />
      It replaces the first one smoothly.
      <br />
      The transition is seamless.
    </>,
    <>
      This is the third paragraph text.
      <br />
      Final content in the sequence.
      <br />
      Animation complete.
    </>,
  ];

  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardTextContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      function wrapLines(splitText: SplitText) {
        splitText.lines.forEach((ln) => {
          const line = ln as HTMLElement;
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      }

      // Helper: Create text swap timeline
      const createTextSwap = (
        outParagraph: any,
        outLeftHeader: any,
        outRightHeader: any,
        inParagraph: any,
        inLeftHeader: any,
        inRightHeader: any
      ) => {
        const timeline = gsap.timeline({ paused: true });
        timeline
          .to(
            [outLeftHeader.chars, outRightHeader.chars],
            {
              yPercent: -100,
              duration: 0.4,
              stagger: 0.02,
              ease: "power2.in",
            },
            0
          )
          .to(
            outParagraph.lines,
            {
              yPercent: -100,
              duration: 0.6,
              stagger: 0.02,
              ease: "power3.in",
            },
            0
          )
          .to(
            [inLeftHeader.chars, inRightHeader.chars],
            {
              yPercent: 0,
              duration: 0.5,
              stagger: 0.02,
              ease: "power2.out",
            },
            0.15
          )
          .to(
            inParagraph.lines,
            {
              yPercent: 0,
              duration: 0.7,
              stagger: 0.05,
              ease: "power3.out",
            },
            0.5
          );
        return timeline;
      };

      // Create all SplitText instances
      const splitParagraphs = paragraphRefs.map(
        (ref) => new SplitText(ref.current, { type: "lines" })
      );
      const splitLeftHeaders = leftHeaderRefs.map(
        (ref) => new SplitText(ref.current, { type: "chars,words" })
      );
      const splitRightHeaders = rightHeaderRefs.map(
        (ref) => new SplitText(ref.current, { type: "chars,words" })
      );

      splitParagraphs.forEach(wrapLines);

      // Set initial positions (hide all except first)
      gsap.set(
        splitParagraphs.slice(1).flatMap((sp) => sp.lines),
        { yPercent: 100 }
      );
      gsap.set(
        splitLeftHeaders.slice(1).flatMap((sh) => sh.chars),
        { yPercent: 100 }
      );
      gsap.set(
        splitRightHeaders.slice(1).flatMap((sh) => sh.chars),
        { yPercent: 100 }
      );

      // Layout Calculations
      const viewportHeight = window.innerHeight;
      const cardRect = cardContainerRef.current?.getBoundingClientRect();
      const cardHeight = cardRect?.height || 0;
      const cardPaddingTop = parseFloat(getComputedStyle(cardContainerRef.current!).paddingTop);
      const cardCenterY = viewportHeight / 2;
      const cardTop = cardCenterY - cardHeight / 2;
      const cardImageHeight = cardHeight * 0.7;
      const cardImageBottom = cardTop + cardPaddingTop + cardImageHeight;
      const distanceToCardImageBottom = viewportHeight - cardImageBottom;
      const percentToCardBottom = distanceToCardImageBottom / viewportHeight;

      // Create text swap timelines
      const textSwaps = [
        createTextSwap(
          splitParagraphs[0],
          splitLeftHeaders[0],
          splitRightHeaders[0],
          splitParagraphs[1],
          splitLeftHeaders[1],
          splitRightHeaders[1]
        ),
        createTextSwap(
          splitParagraphs[1],
          splitLeftHeaders[1],
          splitRightHeaders[1],
          splitParagraphs[2],
          splitLeftHeaders[2],
          splitRightHeaders[2]
        ),
      ];

      // MAIN SCRUBBED TIMELINE
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          // markers: true,
        },
      });

      // Add image transitions dynamically
      for (let i = 0; i < 2; i++) {
        const transitionStart = i;
        mainTimeline
          .to(
            mainImageRefs[i + 1].current,
            {
              yPercent: -100,
              duration: 1,
              ease: "none",
            },
            transitionStart
          )
          .to(
            centerImageRefs[i + 1].current,
            {
              yPercent: -100,
              duration: 0.5,
              ease: "none",
            },
            transitionStart + percentToCardBottom
          );
      }

      // Calculate total timeline duration
      const totalDuration = mainTimeline.duration();

      // TEXT TRIGGERS
      const textTriggers = textSwaps.map(() => ({ triggered: false }));

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        onUpdate: (self) => {
          const progress = self.progress;

          textSwaps.forEach((swap, index) => {
            const transitionMidpoint = index + 0.5;
            const swapProgress = transitionMidpoint / totalDuration;

            if (progress >= swapProgress && !textTriggers[index].triggered) {
              textTriggers[index].triggered = true;
              swap.play();
            } else if (progress < swapProgress && textTriggers[index].triggered) {
              textTriggers[index].triggered = false;
              swap.reverse();
            }
          });
        },
      });
    },
    { scope: container }
  );

  return (
    <section className="parent_container" ref={container}>
      <section></section>
      <section className="parent_section" ref={sectionRef}>
        {/* Main background images stack */}
        <div className="main_images_container">
          {images.map((img, i) => (
            <div className="main_image" ref={mainImageRefs[i]} key={i}>
              <Image
                src={img}
                fill
                sizes="100vw"
                alt={`main-${i + 1}`}
                unoptimized
                priority={i === 0}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
          <div className="imageOverlay" />
        </div>

        {/* Centered card */}
        <div className="centered_card" ref={cardContainerRef}>
          <div className="card_images_container">
            {images.map((img, i) => (
              <div className="card_image" ref={centerImageRefs[i]} key={i}>
                <Image
                  src={img}
                  fill
                  sizes="580px"
                  alt={`card-${i + 1}`}
                  unoptimized
                  priority={i === 0}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <div className="card_text_container">
            {paragraphs.map((text, i) => (
              <p className="card_paragraph" ref={paragraphRefs[i]} key={i}>
                {text}
              </p>
            ))}
          </div>
        </div>

        {/* Left header stack */}
        <div className="left_header_container">
          {leftHeaders.map((text, i) => (
            <h2 className="header_text" ref={leftHeaderRefs[i]} key={i}>
              {text}
            </h2>
          ))}
        </div>

        {/* Right header stack */}
        <div className="right_header_container">
          {rightHeaders.map((text, i) => (
            <h2 className="header_text" ref={rightHeaderRefs[i]} key={i}>
              {text}
            </h2>
          ))}
        </div>
      </section>

      <section className="spacer"></section>
    </section>
  );
}

// // FIRST ITERATION

// "use client";

// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { SplitText } from "gsap/SplitText";
// import Image from "next/image";
// import { pin1, pin2, pin3 } from "../../../public/assets";
// import "../css/index.css";
// import { useGSAP } from "@gsap/react";

// export default function ImageScrollSection() {
//   const container = useRef<HTMLDivElement>(null);
//   const sectionRef = useRef(null);
//   const mainImage1Ref = useRef(null);
//   const mainImage2Ref = useRef(null);
//   const mainImage3Ref = useRef(null);
//   const centerImage1Ref = useRef(null);
//   const centerImage2Ref = useRef(null);
//   const centerImage3Ref = useRef(null);

//   const paragraph1Ref = useRef(null);
//   const paragraph2Ref = useRef(null);
//   const paragraph3Ref = useRef(null);

//   const leftHeader1Ref = useRef(null);
//   const leftHeader2Ref = useRef(null);
//   const leftHeader3Ref = useRef(null);

//   const rightHeader1Ref = useRef(null);
//   const rightHeader2Ref = useRef(null);
//   const rightHeader3Ref = useRef(null);

//   const cardContainerRef = useRef<HTMLDivElement>(null);
//   const cardTextContainerRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       const splitParagraph1 = new SplitText(paragraph1Ref.current, { type: "lines" });
//       const splitParagraph2 = new SplitText(paragraph2Ref.current, { type: "lines" });
//       const splitParagraph3 = new SplitText(paragraph3Ref.current, { type: "lines" });

//       function wrapLines(splitText: SplitText) {
//         splitText.lines.forEach((ln) => {
//           const line = ln as HTMLElement;
//           const wrapper = document.createElement("div");
//           wrapper.style.overflow = "hidden";
//           line.parentNode?.insertBefore(wrapper, line);
//           wrapper.appendChild(line);
//         });
//       }

//       Array.from([splitParagraph1, splitParagraph2, splitParagraph3], (x) => wrapLines(x));

//       const splitLeftHeader1 = new SplitText(leftHeader1Ref.current, { type: "chars,words" });
//       const splitLeftHeader2 = new SplitText(leftHeader2Ref.current, { type: "chars,words" });
//       const splitLeftHeader3 = new SplitText(leftHeader3Ref.current, { type: "chars,words" });

//       const splitRightHeader1 = new SplitText(rightHeader1Ref.current, { type: "chars,words" });
//       const splitRightHeader2 = new SplitText(rightHeader2Ref.current, { type: "chars,words" });
//       const splitRightHeader3 = new SplitText(rightHeader3Ref.current, { type: "chars,words" });

//       // Set initial positions for text elements (hidden except first set)
//       gsap.set([splitParagraph2.lines, splitParagraph3.lines], { yPercent: 100 });
//       gsap.set([splitLeftHeader2.chars, splitLeftHeader3.chars], { yPercent: 100 });
//       gsap.set([splitRightHeader2.chars, splitRightHeader3.chars], { yPercent: 100 });

//       // Layout Calculations
//       const viewportHeight = window.innerHeight;
//       const cardRect = cardContainerRef.current?.getBoundingClientRect();
//       const cardHeight = cardRect?.height || 0;

//       // Account for the top padding (0.5rem = 8px typically)
//       const cardPaddingTop = parseFloat(getComputedStyle(cardContainerRef.current!).paddingTop);

//       // Card is centered in viewport
//       const cardCenterY = viewportHeight / 2;
//       const cardTop = cardCenterY - cardHeight / 2;

//       // Card image container starts AFTER the padding
//       const cardImageHeight = cardHeight * 0.7;
//       const cardImageBottom = cardTop + cardPaddingTop + cardImageHeight;

//       // Main image starts at viewport bottom and moves up
//       const distanceToCardImageBottom = viewportHeight - cardImageBottom;

//       // As percentage of the timeline duration
//       const percentToCardBottom = distanceToCardImageBottom / viewportHeight;

//       // Create paused text timelines
//       const textSwap1 = gsap.timeline({ paused: true });
//       textSwap1
//         // Animate OUT headers first
//         .to(
//           [splitLeftHeader1.chars, splitRightHeader1.chars],
//           {
//             yPercent: -100,
//             duration: 0.4,
//             stagger: 0.02,
//             ease: "power2.in",
//           },
//           0
//         )
//         // Animate OUT paragraph
//         .to(
//           splitParagraph1.lines,
//           {
//             yPercent: -100,
//             duration: 0.6, // Longer duration for paragraphs
//             stagger: 0.02,
//             ease: "power3.in", // Different easing
//           },
//           0
//         )
//         // Animate IN new headers
//         .to(
//           [splitLeftHeader2.chars, splitRightHeader2.chars],
//           {
//             yPercent: 0,
//             duration: 0.5,
//             stagger: 0.02,
//             ease: "power2.out",
//           },
//           0.15
//         )
//         // Animate IN new paragraph
//         .to(
//           splitParagraph2.lines,
//           {
//             yPercent: 0,
//             duration: 0.7, // Longer duration for paragraphs
//             stagger: 0.05,
//             ease: "power3.out", // Different easing
//           },
//           0.5
//         );

//       const textSwap2 = gsap.timeline({ paused: true });
//       textSwap2
//         // Animate OUT headers
//         .to(
//           [splitLeftHeader2.chars, splitRightHeader2.chars],
//           {
//             yPercent: -100,
//             duration: 0.4,
//             stagger: 0.02,
//             ease: "power2.in",
//           },
//           0
//         )
//         // Animate OUT paragraph
//         .to(
//           splitParagraph2.lines,
//           {
//             yPercent: -100,
//             duration: 0.6, // Longer duration for paragraphs
//             stagger: 0.02,
//             ease: "power3.in", // Different easing
//           },
//           0
//         )
//         // Animate IN new headers
//         .to(
//           [splitLeftHeader3.chars, splitRightHeader3.chars],
//           {
//             yPercent: 0,
//             duration: 0.5,
//             stagger: 0.02,
//             ease: "power2.out",
//           },
//           0.15
//         )
//         // Animate IN new paragraph
//         .to(
//           splitParagraph3.lines,
//           {
//             yPercent: 0,
//             duration: 0.7, // Longer duration for paragraphs
//             stagger: 0.05,
//             ease: "power3.out", // Different easing
//           },
//           0.5
//         );

//       // MAIN SCRUBBED TIMELINE
//       const mainTimeline = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=300%",
//           scrub: 1,
//           pin: true,
//           markers: true,
//         },
//       });

//       // TRANSITION 1: Image 1 → Image 2
//       mainTimeline
//         .to(
//           mainImage2Ref.current,
//           {
//             yPercent: -100,
//             duration: 1,
//             ease: "none",
//           },
//           0
//         )
//         .to(
//           centerImage2Ref.current,
//           {
//             yPercent: -100,
//             duration: 0.5,
//             ease: "none",
//           },
//           percentToCardBottom
//         );

//       // TRANSITION 2: Image 2 → Image 3
//       const transition2Start = 1;
//       mainTimeline
//         .to(
//           mainImage3Ref.current,
//           {
//             yPercent: -100,
//             duration: 1,
//             ease: "none",
//           },
//           transition2Start
//         )
//         .to(
//           centerImage3Ref.current,
//           {
//             yPercent: -100,
//             duration: 0.5,
//             ease: "none",
//           },
//           transition2Start + percentToCardBottom
//         );

//       // Calculate total timeline duration
//       const totalDuration = mainTimeline.duration();

//       // TEXT TRIGGERS (progress-based)
//       let text1Triggered = false;
//       let text2Triggered = false;

//       ScrollTrigger.create({
//         trigger: sectionRef.current,
//         start: "top top",
//         end: "+=300%",
//         onUpdate: (self) => {
//           const progress = self.progress;

//           // Swap 1: At 50% of first transition
//           // Trans 1: 0 to 1, midpoint: 0.5
//           // Normalized: 0.5 / totalDuration
//           const swap1Progress = 0.5 / totalDuration;

//           if (progress >= swap1Progress && !text1Triggered) {
//             text1Triggered = true;
//             textSwap1.play();
//           } else if (progress < swap1Progress && text1Triggered) {
//             text1Triggered = false;
//             textSwap1.reverse();
//           }

//           // Swap 2: At 50% of second transition
//           // Trans 2: 1.33 to 2.33, midpoint: 1.83
//           // Normalized: 1.83 / totalDuration
//           const swap2Progress = 1.5 / totalDuration;

//           if (progress >= swap2Progress && !text2Triggered) {
//             text2Triggered = true;
//             textSwap2.play();
//           } else if (progress < swap2Progress && text2Triggered) {
//             text2Triggered = false;
//             textSwap2.reverse();
//           }
//         },
//       });
//     },
//     { scope: container }
//   );

//   return (
//     <section className="parent_container" ref={container}>
//       <section></section>
//       <section className="parent_section" ref={sectionRef}>
//         {/* Main background images stack */}
//         <div className="main_images_container">
//           <div className="main_image" ref={mainImage1Ref}>
//             <Image
//               src={pin1}
//               fill
//               sizes="100vw"
//               alt="pin1"
//               unoptimized
//               priority
//               style={{ objectFit: "cover" }}
//             />
//           </div>
//           <div className="main_image" ref={mainImage2Ref}>
//             <Image
//               src={pin2}
//               fill
//               sizes="100vw"
//               alt="pin2"
//               unoptimized
//               style={{ objectFit: "cover" }}
//             />
//           </div>
//           <div className="main_image" ref={mainImage3Ref}>
//             <Image
//               src={pin3}
//               fill
//               sizes="100vw"
//               alt="pin3"
//               unoptimized
//               style={{ objectFit: "cover" }}
//             />
//           </div>
//           <div className="imageOverlay" />
//         </div>

//         {/* Centered card */}
//         <div className="centered_card" ref={cardContainerRef}>
//           <div className="card_images_container">
//             <div className="card_image" ref={centerImage1Ref}>
//               <Image
//                 src={pin1}
//                 fill
//                 sizes="580px"
//                 alt="card1"
//                 unoptimized
//                 priority
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//             <div className="card_image" ref={centerImage2Ref}>
//               <Image
//                 src={pin2}
//                 fill
//                 sizes="580px"
//                 alt="card2"
//                 unoptimized
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//             <div className="card_image" ref={centerImage3Ref}>
//               <Image
//                 src={pin3}
//                 fill
//                 sizes="580px"
//                 alt="card3"
//                 unoptimized
//                 style={{ objectFit: "cover" }}
//               />
//             </div>
//           </div>

//           <div className="card_text_container" ref={cardTextContainerRef}>
//             <p className="card_paragraph" ref={paragraph1Ref}>
//               This is the first paragraph beautiful text.
//               <br />
//               It has three lines of content here.
//               <br />
//               Each line will animate beautifully.
//             </p>
//             <p className="card_paragraph" ref={paragraph2Ref}>
//               This is the second paragraph text.
//               <br />
//               It replaces the first one smoothly.
//               <br />
//               The transition is seamless.
//             </p>
//             <p className="card_paragraph" ref={paragraph3Ref}>
//               This is the third paragraph text.
//               <br />
//               Final content in the sequence.
//               <br />
//               Animation complete.
//             </p>
//           </div>
//         </div>

//         {/* Left header stack */}
//         <div className="left_header_container">
//           <h2 className="header_text" ref={leftHeader1Ref}>
//             Exhibit 001
//           </h2>
//           <h2 className="header_text" ref={leftHeader2Ref}>
//             Exhibit 002
//           </h2>
//           <h2 className="header_text" ref={leftHeader3Ref}>
//             Exhibit 003
//           </h2>
//         </div>

//         {/* Right header stack */}
//         <div className="right_header_container">
//           <h2 className="header_text" ref={rightHeader1Ref}>
//             The Great Wave
//           </h2>
//           <h2 className="header_text" ref={rightHeader2Ref}>
//             Starry Night
//           </h2>
//           <h2 className="header_text" ref={rightHeader3Ref}>
//             The Persistence
//           </h2>
//         </div>
//       </section>

//       <section className="spacer"></section>
//     </section>
//   );
// }
