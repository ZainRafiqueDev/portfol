"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ p, i }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card group relative flex h-[420px] w-[80vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-line p-7 sm:w-[380px] md:h-[460px]"
      style={{
        background: `radial-gradient(120% 90% at 100% 0%, hsl(${p.hue} 85% 55% / 0.28), transparent 60%), var(--surface-strong)`,
      }}
    >
      {/* Decorative mock window */}
      <div className="pointer-events-none absolute inset-x-7 top-24 bottom-28 rounded-2xl border border-line bg-bg/60 p-4 transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.02]">
        <div className="mb-4 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </div>
        <div className="grid h-[calc(100%-1.5rem)] place-items-center">
          <span
            className="font-display text-7xl font-bold opacity-80 transition-transform duration-700 group-hover:scale-110"
            style={{ color: `hsl(${p.hue} 80% 55%)` }}
          >
            {p.name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="relative flex items-center justify-between">
        <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
        <span className="glass rounded-full px-3 py-1 text-xs text-muted">{p.category}</span>
      </div>

      <div className="relative flex items-end justify-between">
        <h3 className="font-display text-3xl font-semibold">{p.name}</h3>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={20} />
        </span>
      </div>
    </a>
  );
}

export default function Work() {
  const section = useRef(null);
  const track = useRef(null);

  // Pin the section and translate the track horizontally as you scroll (desktop).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const distance = () => track.current.scrollWidth - window.innerWidth + 64;
        gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.from(".work-card", {
          opacity: 0,
          y: 60,
          stagger: 0.06,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section.current, start: "top 70%" },
        });
      });
      return () => mm.revert();
    },
    { scope: section }
  );

  return (
    <section id="work" ref={section} className="relative overflow-hidden py-28 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected Work / 04"
          title="Work in"
          highlight="perspective."
          desc="Products, AI systems, SaaS platforms, Web3 and hospitality work. Scroll to browse — click any card to visit."
        />
      </div>
      <div
        ref={track}
        className="flex gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:overflow-visible md:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
