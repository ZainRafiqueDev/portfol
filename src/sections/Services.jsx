"use client";

import { ArrowUpRight, Brain, Code2, Layers, Workflow, Wrench } from "lucide-react";
import { services } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";

const icons = { code: Code2, brain: Brain, workflow: Workflow, layers: Layers, wrench: Wrench };
const pipeline = ["Idea", "Architecture", "Build", "Automate", "Scale"];

export default function Services() {
  return (
    <section id="services" className="relative bg-bg-soft py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Services / 03"
          title="From building to"
          highlight="automating."
          desc="I design, build, integrate, and automate software systems across the full product stack."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            // Bento layout: two wide cards on top, three below.
            const span = i < 2 ? "lg:col-span-3" : i === services.length - 1 ? "md:col-span-2 lg:col-span-2" : "lg:col-span-2";
            return (
              <Reveal key={s.title} delay={i * 0.07} className={span}>
                <TiltCard max={6}>
                  <SpotlightCard className="group flex h-full flex-col p-7">
                    <div className="mb-10 flex items-start justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-soft text-accent transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                        <Icon size={26} />
                      </span>
                      <span className="flex items-center gap-2 font-mono text-xs text-muted">
                        0{i + 1}
                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                    <p className="mt-3 flex-1 text-muted">{s.desc}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span key={t} className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
                          {t}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3 font-mono text-xs tracking-widest text-muted">
            {pipeline.map((p, i) => (
              <span key={p} className="flex items-center gap-3">
                <span className="glass rounded-full px-4 py-2 uppercase">{p}</span>
                {i < pipeline.length - 1 && <span className="text-accent">→</span>}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
