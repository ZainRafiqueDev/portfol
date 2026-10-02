"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase } from "lucide-react";
import { experience } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef(null);

  useGSAP(
    () => {
      // Timeline line draws as you scroll.
      gsap.fromTo(
        ".tl-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".tl-list", start: "top 65%", end: "bottom 65%", scrub: true },
        }
      );
      // Each item slides in from its side.
      gsap.utils.toArray(".tl-item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: window.innerWidth >= 768 ? (i % 2 ? 60 : -60) : 30,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
        gsap.to(el.querySelector(".tl-dot"), {
          scale: 1.25,
          backgroundColor: "var(--accent)",
          scrollTrigger: { trigger: el, start: "top 65%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="experience" ref={ref} className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience / 05"
          title="Built across"
          highlight="products."
          desc="From enterprise workflow software and high-scale commerce to modern AI automation and full-stack product development."
          align="center"
        />

        <div className="tl-list relative mx-auto max-w-5xl">
          {/* Track + animated progress */}
          <div className="absolute bottom-0 left-4 top-0 w-px bg-line md:left-1/2" />
          <div className="tl-progress absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-accent to-accent-2 md:left-1/2" />

          <ol className="space-y-12">
            {experience.map((e, i) => (
              <li
                key={e.company}
                className={`tl-item relative pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
              >
                <span
                  className={`tl-dot absolute left-4 top-8 z-10 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border-2 border-accent bg-bg ${
                    i % 2 ? "md:left-0" : "md:left-auto md:right-0 md:translate-x-1/2"
                  }`}
                />
                <SpotlightCard className="p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs tracking-wider text-accent">{e.period}</span>
                    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {e.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{e.role}</h3>
                  <p className="mb-3 flex items-center gap-2 text-muted">
                    <Briefcase size={14} /> {e.company}
                  </p>
                  <p className="text-[15px] leading-relaxed text-muted">{e.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.tags.map((t) => (
                      <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
