"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Segmented } from "antd";
import { Bot, Code2, Database, Workflow, CheckCircle2 } from "lucide-react";
import { expertise, skillGroups } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Reveal from "@/components/ui/Reveal";

const icons = { ai: Bot, automation: Workflow, frontend: Code2, backend: Database };

function SkillBar({ name, level, i }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="font-mono text-muted">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1.1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].key);
  const group = skillGroups.find((g) => g.key === active);
  const Icon = icons[active];

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(transparent,#000_30%,#000_70%,transparent)]" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Skills & Expertise / 02"
          title="A toolkit built for"
          highlight="shipping."
          desc="The stack I reach for every day — from LLM-powered features to the APIs and automations that keep them running."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          {/* Interactive skill explorer */}
          <Reveal>
            <SpotlightCard className="h-full p-6 md:p-8">
              <div className="-mx-1 overflow-x-auto pb-1">
                <Segmented
                  size="large"
                  value={active}
                  onChange={setActive}
                  options={skillGroups.map((g) => ({ label: g.title, value: g.key }))}
                />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8"
                >
                  <div className="mb-8 flex items-start gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent">
                      <Icon size={26} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{group.title}</h3>
                      <p className="text-muted">{group.blurb}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {group.skills.map((s, i) => (
                      <SkillBar key={s.name} {...s} i={i} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </SpotlightCard>
          </Reveal>

          {/* Core competencies */}
          <div className="grid gap-4 sm:grid-cols-2">
            {expertise.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <SpotlightCard className="group h-full p-6">
                  <CheckCircle2 size={20} className="mb-4 text-accent transition-transform group-hover:scale-110" />
                  <h4 className="font-display text-lg font-semibold leading-tight">{e.title}</h4>
                  <p className="mt-2 text-sm text-muted">{e.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
