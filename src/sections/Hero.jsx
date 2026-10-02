"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiUpwork, SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiClaude, SiN8N, SiSupabase } from "react-icons/si";
import { RiOpenaiFill } from "react-icons/ri";
import { profile, rotatingRoles, stats } from "@/data/portfolio";
import { scrollToId } from "@/components/providers/SmoothScroll";
import SplitText from "@/components/ui/SplitText";
import RotatingText from "@/components/ui/RotatingText";
import Magnetic from "@/components/ui/Magnetic";
import CountUp from "@/components/ui/CountUp";

const orbit = [
  { Icon: SiReact, label: "React", color: "#61dafb" },
  { Icon: SiNextdotjs, label: "Next.js" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#5fa04e" },
  { Icon: SiPython, label: "Python", color: "#3776ab" },
  { Icon: RiOpenaiFill, label: "OpenAI" },
  { Icon: SiClaude, label: "Claude", color: "#d97757" },
  { Icon: SiN8N, label: "n8n", color: "#ea4b71" },
  { Icon: SiSupabase, label: "Supabase", color: "#3ecf8e" },
];

const socials = [
  { href: profile.socials.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
  { href: profile.socials.github, Icon: FaGithub, label: "GitHub" },
  { href: profile.socials.upwork, Icon: SiUpwork, label: "Upwork" },
];

function OrbitVisual() {
  // Parallax the whole orbit toward the cursor.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 80, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 80, damping: 20 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => (mx.set(0), my.set(0))}
      className="relative mx-auto aspect-square w-full max-w-[520px]"
      style={{ perspective: 1200 }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="absolute inset-0">
        {/* Rings */}
        {[100, 74, 48].map((s, i) => (
          <div
            key={s}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
            style={{ width: `${s}%`, height: `${s}%`, borderStyle: i === 1 ? "dashed" : "solid" }}
          />
        ))}

        {/* Core */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="gradient-border absolute left-1/2 top-1/2 grid h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface-strong shadow-[0_0_120px_var(--glow)]"
          style={{ borderRadius: "9999px" }}
        >
          <div className="text-center">
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted">FULL-STACK</p>
            <p className="font-display text-2xl font-bold leading-none md:text-3xl">
              ADIL
              <br />
              <span className="text-gradient">RAFIQUE</span>
            </p>
            <p className="mt-1 hidden font-mono text-[9px] tracking-[0.2em] text-muted sm:block">AI · AUTOMATION · WEB</p>
          </div>
        </motion.div>

        {/* Orbiting nodes */}
        <motion.div
          className="absolute inset-[13%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {orbit.map(({ Icon, label, color }, i) => {
            const angle = (i / orbit.length) * Math.PI * 2;
            const left = 50 + Math.cos(angle) * 50;
            const top = 50 + Math.sin(angle) * 50;
            return (
              <motion.div
                key={label}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${left}%`, top: `${top}%` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.08, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.15 }}
                  className="glass flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium shadow-[var(--shadow)]"
                >
                  <Icon size={16} style={{ color }} />
                  <span className="hidden sm:inline">{label}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="hero" ref={ref} className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32">
      {/* Aurora + grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <div className="aurora-blob left-[-10%] top-[-10%] h-[45vw] w-[45vw] bg-[var(--glow)] opacity-70" />
        <div
          className="aurora-blob bottom-[-20%] right-[-10%] h-[40vw] w-[40vw] opacity-40"
          style={{ background: "color-mix(in srgb, var(--accent-2) 35%, transparent)", animationDelay: "-6s" }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-xs tracking-wider text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            AVAILABLE FOR NEW PROJECTS
          </motion.div>

          <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            <SplitText className="block">Building software</SplitText>
            <SplitText className="block" delay={0.25}>
              that moves
            </SplitText>
            {/* Revealed as one block so the gradient isn't broken up per character */}
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="text-gradient inline-block"
                initial={{ y: "110%", rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                ideas forward.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-7 max-w-xl text-lg text-muted"
          >
            {profile.name} — I build{" "}
            <RotatingText words={rotatingRoles} className="font-semibold text-fg" />
            <br className="hidden sm:block" /> that turn complex processes into reliable, production-ready software.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <button
                onClick={() => scrollToId("work")}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-ink shadow-[0_10px_40px_-10px_var(--glow)] transition-transform hover:scale-[1.03]"
              >
                Explore my work
                <ArrowDownRight size={18} className="transition-transform group-hover:rotate-[-45deg]" />
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition-colors hover:border-line-strong"
              >
                <FileText size={18} /> View CV
              </a>
            </Magnetic>
            <div className="flex gap-2 sm:ml-2">
              {socials.map(({ href, Icon, label }) => (
                <Magnetic key={label} strength={0.5}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="glass grid h-12 w-12 place-items-center rounded-full text-muted transition-colors hover:text-accent"
                  >
                    <Icon size={18} />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25, duration: 0.8 }}
            className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-line border-t border-line pt-6"
          >
            {stats.slice(0, 2).map((s) => (
              <div key={s.label} className="px-3 first:pl-0 sm:px-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="whitespace-nowrap font-display text-2xl font-semibold sm:text-3xl">
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </dd>
                <p className="text-xs text-muted">{s.label}</p>
              </div>
            ))}
            <div className="px-3 sm:px-4">
              <dd className="whitespace-nowrap font-display text-2xl font-semibold sm:text-3xl">AI + Web</dd>
              <p className="text-xs text-muted">Core focus</p>
            </div>
          </motion.dl>
        </div>

        <OrbitVisual />
      </motion.div>

      <motion.button
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-muted md:flex"
      >
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-accent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
