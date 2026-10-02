"use client";

import { useRef } from "react";

// Cursor-following radial glow (React Bits "Spotlight Card").
export default function SpotlightCard({ as: Tag = "div", className = "", children, ...rest }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`spotlight glass rounded-3xl transition-colors duration-300 hover:border-line-strong ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
