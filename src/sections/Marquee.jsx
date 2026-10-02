import { Sparkle } from "lucide-react";
import { techMarquee } from "@/data/portfolio";

function Row({ items, reverse = false }) {
  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className="animate-marquee flex shrink-0 items-center gap-8 pr-8 hover:[animation-play-state:paused]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap font-display text-2xl font-medium text-muted md:text-4xl">
            {t}
            <Sparkle size={18} className="text-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(techMarquee.length / 2);
  return (
    <section aria-label="Technologies" className="relative space-y-4 border-y border-line bg-bg-soft py-8">
      <Row items={techMarquee.slice(0, half)} />
      <Row items={techMarquee.slice(half)} reverse />
    </section>
  );
}
