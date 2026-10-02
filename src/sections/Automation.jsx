"use client";

import { motion } from "motion/react";
import { Brain, CheckCircle2, GitBranch, Webhook, Zap } from "lucide-react";
import { automationSteps } from "@/data/portfolio";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons = [Webhook, Brain, GitBranch, Zap, CheckCircle2];

export default function Automation() {
  return (
    <section id="automation" className="relative overflow-hidden bg-bg-soft py-28 md:py-36">
      <div className="container-x">
        <SectionHeading
          eyebrow="AI Automation / 06"
          title="Turn repetitive work into"
          highlight="connected systems."
          desc="I connect triggers, AI models, APIs, business logic, and delivery channels into workflows that run with less manual effort."
        />

        <div className="relative">
          {/* Connector line with a travelling pulse (desktop) */}
          <div className="absolute left-[10%] right-[10%] top-[44px] hidden h-px bg-line lg:block">
            <motion.div
              className="absolute top-1/2 h-[3px] w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-accent to-transparent"
              animate={{ left: ["-10%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {automationSteps.map((s, i) => {
              const Icon = icons[i];
              return (
                <motion.li
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  <motion.span
                    className="relative z-10 mb-6 grid h-[88px] w-[88px] place-items-center rounded-3xl border border-line bg-surface-strong text-accent shadow-[var(--shadow)]"
                    animate={{ boxShadow: ["0 0 0 0 var(--glow)", "0 0 0 14px transparent"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  >
                    <Icon size={32} />
                    <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full bg-accent font-mono text-xs font-bold text-accent-ink">
                      {i + 1}
                    </span>
                  </motion.span>
                  <SpotlightCard className="w-full p-5">
                    <p className="eyebrow mb-1 text-[10px]">{s.label}</p>
                    <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted">{s.desc}</p>
                  </SpotlightCard>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {["n8n", "Make", "Zapier", "OpenAI", "Claude", "Webhooks", "Supabase", "Slack", "Google Sheets"].map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass rounded-full px-4 py-2 font-mono text-sm text-muted"
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
