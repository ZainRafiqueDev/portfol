"use client";

import { ArrowUp } from "lucide-react";
import { navLinks, profile } from "@/data/portfolio";
import { scrollToId } from "@/components/providers/SmoothScroll";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent font-display font-bold text-accent-ink">
                {profile.initials}
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{profile.name}</p>
                <p className="text-sm text-muted">Full-Stack · AI · Automation</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {navLinks.map(({ id, label }) => (
              <button key={id} onClick={() => scrollToId(id)} className="hover:text-fg">
                {label}
              </button>
            ))}
            <a href={profile.cv} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              CV
            </a>
          </nav>
          <button
            onClick={() => scrollToId("hero")}
            className="glass inline-flex items-center gap-2 self-start rounded-full px-5 py-2.5 text-sm hover:text-accent md:self-auto"
          >
            Back to top <ArrowUp size={16} />
          </button>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-12 select-none bg-gradient-to-b from-line-strong to-transparent bg-clip-text text-center font-display text-[18vw] font-bold leading-[0.8] tracking-tighter text-transparent"
        >
          ADIL RAFIQUE
        </p>

        <div className="flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Built with Next.js · GSAP · Motion · Ant Design</p>
        </div>
      </div>
    </footer>
  );
}
