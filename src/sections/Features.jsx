"use client";

import { MessageSquare, Plug, ShieldCheck, Zap } from "lucide-react";
import { features } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";

const icons = { shield: ShieldCheck, zap: Zap, message: MessageSquare, plug: Plug };

export default function Features() {
  return (
    <section id="why" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why work with me / 07"
          title="What you get"
          highlight="beyond the code."
          align="center"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <Reveal key={f.title} delay={i * 0.08}>
                <SpotlightCard className="group h-full p-7">
                  <span className="mb-8 grid h-12 w-12 place-items-center rounded-xl border border-line text-accent transition-all duration-500 group-hover:bg-accent group-hover:text-accent-ink">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{f.desc}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
