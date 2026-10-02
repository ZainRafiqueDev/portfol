"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ p, i }) {
  const domain = new URL(p.url).hostname.replace(/^www\./, "");
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-card group relative flex w-[85vw] snap-center shrink-0 flex-col gap-5 overflow-hidden rounded-3xl border border-line p-4 transition-colors duration-500 hover:border-line-strong sm:w-[480px] sm:p-5"
      style={{
        background: `radial-gradient(120% 80% at 100% 0%, hsl(${p.hue} 85% 55% / 0.22), transparent 60%), var(--surface-strong)`,
      }}
    >
      {/* Browser window with the live site's screenshot */}
      <div className="overflow-hidden rounded-2xl border border-line bg-bg shadow-[var(--shadow)]">
        <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="flex-1 truncate rounded-md bg-surface px-3 py-1 text-center font-mono text-[11px] text-muted">{domain}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={p.image}
            alt={`${p.name} website homepage`}
            fill
            sizes="(min-width: 640px) 480px, 85vw"
            className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-500 group-hover:bg-black/35">
            <span className="flex translate-y-4 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              Visit site <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 px-1 pb-1">
        <div className="min-w-0">
          <div className="mb-1.5 flex items-center gap-3">
            <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
            <span className="truncate rounded-full border border-line px-2.5 py-0.5 text-[11px] text-muted">{p.category}</span>
          </div>
          <h3 className="truncate font-display text-2xl font-semibold sm:text-3xl">{p.name}</h3>
        </div>
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-45">
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
          desc="Products, AI systems, SaaS platforms, Web3 and hospitality work. Scroll (or swipe) to browse — click any card to visit the live site."
        />
      </div>
      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:snap-none md:overflow-visible md:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]"
      >
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </section>
  );
}
