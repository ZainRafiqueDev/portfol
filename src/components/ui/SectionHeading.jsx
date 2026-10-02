import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, highlight, desc, align = "left" }) {
  const center = align === "center";
  return (
    <div className={`mb-14 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <p className="eyebrow mb-4 inline-flex items-center gap-2">
          <span className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {title} {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.1}>
          <p className={`mt-5 max-w-2xl text-lg text-muted ${center ? "mx-auto" : ""}`}>{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
