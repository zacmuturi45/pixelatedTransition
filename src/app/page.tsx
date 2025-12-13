"use client";

import gsap from "gsap";
import "./css/index.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "./Components/Types/Gsap/gsap_plugins";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, { scope: container });

  return <div className="main_container" ref={container}></div>;
}
