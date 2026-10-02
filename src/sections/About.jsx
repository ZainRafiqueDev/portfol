"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { GraduationCap, MapPin, Target } from "lucide-react";
import { education, experience, profile, stats } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger, SplitText);

const chips = ["AI Agents", "Automation", "APIs", "Full-Stack", "Next.js", "MCP", "GitHub"];

export default function About() {
  const bioRef = useRef(null);

  // Scroll-scrubbed word highlight (React Bits "Scroll Reveal").
  useGSAP(
    () => {
      const split = SplitText.create(bioRef.current, { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: bioRef.current, start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      return () => split.revert();
    },
    { scope: bioRef }
  );

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="About / 01"
          title="I build systems that"
          highlight="actually move."
          desc="Full-stack development, AI integrations, and workflow automation — connected into software that solves real operational problems."
        />

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <SpotlightCard className="h-full p-6">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <p className="mt-6 font-display text-4xl font-semibold md:text-5xl">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </p>
                <p className="mt-2 font-medium">{s.label}</p>
                <p className="text-sm text-muted">{s.note}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <SpotlightCard className="h-full p-8 md:p-10">
              <p className="eyebrow mb-6">Who I am</p>
              <p ref={bioRef} className="font-display text-2xl leading-snug md:text-[1.7rem]">
                I&apos;m {profile.name} — an AI Automation Specialist and Full-Stack Developer with 5+ years of experience turning
                ideas, integrations, and repetitive workflows into reliable software. I work across React, Next.js, Node.js, Python,
                REST APIs, webhooks and auth flows — and I ship faster with AI coding agents like Claude Code and Cursor in my daily
                workflow.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {chips.map((c) => (
                  <span key={c} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                    {c}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={0.1}>
              <SpotlightCard className="p-7">
                <div className="mb-4 flex items-center gap-2 text-accent">
                  <Target size={18} />
                  <span className="eyebrow">Current focus</span>
                </div>
                <p className="font-display text-xl font-semibold">AI-powered software + workflow automation</p>
                <p className="mt-2 text-sm text-muted">
                  Practical systems around AI agents, integrations, and connected business workflows.
                </p>
                <p className="mt-5 font-mono text-xs tracking-widest text-accent">BUILD → INTEGRATE → AUTOMATE</p>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.15}>
              <SpotlightCard className="p-7">
                <p className="eyebrow mb-4">Career snapshot</p>
                <ul className="space-y-3">
                  {experience.slice(0, 3).map((e) => (
                    <li key={e.company} className="flex items-start gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <div>
                        <p className="font-medium">{e.company}</p>
                        <p className="text-sm text-muted">
                          {e.role} · {e.period}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-4 border-t border-line pt-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap size={16} /> {education.school.split(" (")[0]}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={16} /> {profile.location}
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
