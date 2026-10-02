"use client";

import { useRef } from "react";
import gsap from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(GSAPSplitText);

// React Bits–style SplitText powered by GSAP's SplitText plugin.
export default function SplitText({ children, as: Tag = "span", className = "", delay = 0, stagger = 0.025 }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = GSAPSplitText.create(ref.current, { type: "chars,words", mask: "words" });
      gsap.from(split.chars, {
        yPercent: 110,
        opacity: 0,
        rotate: 6,
        duration: 0.9,
        ease: "expo.out",
        stagger,
        delay,
      });
      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
