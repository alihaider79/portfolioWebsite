"use client";

import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type Service = {
  title: string;
  blurb: string;
  image: string;
  tag: string;
};

const ACCENT = "#F28A2E";

const SERVICES: Service[] = [
  {
    title: "UI/UX Design",
    blurb: "Research → flows → hi-fi UI. Design systems and polished handoff.",
    tag: "Product",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Web Design",
    blurb: "Fast, responsive marketing sites with crisp storytelling.",
    tag: "Web",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Landing Pages",
    blurb: "High-converting landers ready for A/B tests and analytics.",
    tag: "Growth",
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function Services() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const snapTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const clamped = (i + SERVICES.length) % SERVICES.length;
    setIdx(clamped);
    const child = el.children[clamped] as HTMLElement | undefined;
    if (child) child.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!vis) return;
        const i = [...el.children].findIndex((c) => c === vis.target);
        if (i !== -1) setIdx(i);
      },
      { root: el, threshold: [0.6] }
    );
    [...el.children].forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  const dots = useMemo(() => new Array(SERVICES.length).fill(0), []);

  return (
    <section id="services">
      {/* FULL-WIDTH ROUNDED SHELL */}
      <div className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-[#0d1117]">
        {/* mesh bg */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-80 bg-[radial-gradient(1200px_420px_at_60%_-10%,rgba(242,138,46,.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#0d1117_0%,#131a22_55%,#0d1117_100%)]" />
          <div
            className="absolute -left-28 top-10 w-80 h-80 blur-3xl rounded-[45%]"
            style={{
              background:
                "radial-gradient(closest-side,#FFB980,transparent 70%)",
              opacity: 0.45,
            }}
          />
          <div
            className="absolute -right-28 bottom-6 w-96 h-96 blur-3xl rounded-[45%]"
            style={{
              background:
                "radial-gradient(closest-side,#FF7A59,transparent 70%)",
              opacity: 0.45,
            }}
          />
        </div>

        {/* header */}
        <div className="px-6 md:px-10 pt-10 md:pt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <h2 className="text-white text-3xl md:text-4xl font-semibold">
            My <span style={{ color: ACCENT }}>Services</span>
          </h2>
          <p className="text-white/70 max-w-2xl">
            A curated set of offerings where strategy meets craft. Designed for
            clarity, speed, and measurable outcomes.
          </p>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid grid-cols-3 gap-7 px-6 md:px-10 py-10">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} />
          ))}
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="md:hidden relative px-2 py-8">
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="shrink-0 w-[88%] snap-center first:ml-2 last:mr-2"
              >
                <ServiceCard s={s} />
              </div>
            ))}
          </div>

          {/* dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {dots.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === idx ? "w-6 bg-white" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <article
      className="group relative rounded-[26px] p-[1.25px] bg-gradient-to-tr from-white/15 via-white/5 to-white/15
                 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,.35)] overflow-hidden"
    >
      <div className="relative rounded-[25px] overflow-hidden bg-white/5 backdrop-blur-sm">
        <div className="relative">
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-56 object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs bg-black/40 text-white border border-white/20 backdrop-blur">
            {s.tag}
          </div>
        </div>
        <div className="px-5 py-5">
          <h3 className="text-white font-semibold text-lg tracking-tight">
            {s.title}
          </h3>
          <p className="text-white/70 text-sm mt-1">{s.blurb}</p>
          <div className="mt-4 flex items-center justify-end">
            <a
              href="#"
              className="size-11 grid place-items-center rounded-full bg-[#0e1625] text-white border border-white/15
                         hover:scale-105 transition"
              title="Open"
            >
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
