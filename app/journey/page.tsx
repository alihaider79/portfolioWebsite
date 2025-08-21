"use client";

import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ----------------------------- Local image ----------------------------- */
const IMG = "/pic.jpeg";

/* ----------------------------- Journey steps --------------------------- */
type Step = {
  title: string;
  blurb: string;
  bullets: string[];
};

const STEPS: Step[] = [
  {
    title: "Getting Started",
    blurb:
      "First design wins with small teams—lots of learning, momentum, and quick iteration.",
    bullets: [
      "Shipped first real features",
      "Learned research → design → dev handoff",
      "Built confidence in UX decisions",
    ],
  },
  {
    title: "Systems & Scale",
    blurb:
      "Introduced shared components, cleaner flows, and better collaboration across teams.",
    bullets: [
      "Design system v1 across 3 products",
      "Onboarding friction reduced",
      "Partnered tightly with engineering",
    ],
  },
  {
    title: "Impact & Outcomes",
    blurb:
      "Led projects where metrics mattered. Fast feedback loops and crisp interface quality.",
    bullets: [
      "KPIs moved in 6 weeks",
      "Shorter iteration cycles",
      "Delight + clarity in shipped work",
    ],
  },
];

/* ----------------------------- Testimonials --------------------------- */
type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Thoughtful research, crisp UI, and a steady hand under pressure. We shipped faster and the metrics followed.",
    author: "A. Khan",
    role: "Product Lead, Fintech",
  },
  {
    quote:
      "Pragmatic and principled. Our onboarding friction dropped meaningfully after his work.",
    author: "S. Mehta",
    role: "Head of Growth, SaaS",
  },
  {
    quote:
      "Took a mess of requirements and turned it into a product we’re proud to demo.",
    author: "N. Iqbal",
    role: "Founder",
  },
  {
    quote:
      "Clear thinking meets tasteful execution. Strong partner for fast-moving teams.",
    author: "R. Patel",
    role: "Engineering Manager",
  },
];

/* --------------------------------- Page -------------------------------- */
export default function JourneyPage() {
  const accent = "#F28A2E";

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="max-w-6xl mx-auto px-4 pt-14 pb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-Black transition-colors duration-200">
          My{" "}
          <span className="text-[#F28A2E]  transition-colors duration-200">
            Journey
          </span>
        </h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          A story about experiments, momentum, and teams who helped along the
          way.
        </p>
        <div
          className="mt-6 h-1.5 w-28 mx-auto rounded-full"
          style={{ background: `linear-gradient(90deg, ${accent}, #facc15)` }}
        />
      </section>

      {/* Journey Switcher */}
      <section className="max-w-6xl mx-auto px-4 pb-12 md:pb-16">
        <JourneySwitcher accent={accent} />
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center md:text-left">
          What people say
        </h3>
        <p className="text-gray-600 mt-1 text-center md:text-left">
          A few quick notes from teams.
        </p>
        <Testimonials accent={accent} />
      </section>

      {/* hide mobile scrollbar for a cleaner look */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}

/* --------------------------- Journey Switcher -------------------------- */
function JourneySwitcher({ accent }: { accent: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Auto-advance (pauses while user interacts/in-section)
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % STEPS.length),
      3000
    );
    return () => window.clearInterval(id);
  }, [paused]);

  // Pause on pointer/touch/focus; resume on leave/blur
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const pause = () => setPaused(true);
    const resume = () => setPaused(false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="grid md:grid-cols-[320px_64px_1fr] gap-8 items-center"
    >
      {/* Left: circular photo (head nicely centered) */}
      <div className="flex justify-center md:justify-start">
        <div className="relative size-60 md:size-72 rounded-full overflow-hidden ring-4 ring-white shadow-lg border border-gray-200">
          <Image
            src={IMG}
            alt="Journey"
            fill
            className="object-cover [object-position:50%_20%]"
          />
        </div>
      </div>

      {/* Middle: vertical line + 3 dots (desktop only). Mobile shows compact dots above content */}
      <div className="hidden md:flex flex-col items-center justify-center">
        <div className="h-48 w-[3px] rounded-full bg-gray-200 relative">
          <Dot
            top="0%"
            active={active === 0}
            onClick={() => setActive(0)}
            accent={accent}
          />
          <Dot
            top="50%"
            active={active === 1}
            onClick={() => setActive(1)}
            accent={accent}
          />
          <Dot
            top="100%"
            active={active === 2}
            onClick={() => setActive(2)}
            accent={accent}
          />
        </div>
      </div>

      {/* Right: details */}
      <div className="relative">
        {/* Mobile dots */}
        <div className="md:hidden flex items-center justify-center gap-3 mb-4">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                active === i ? "w-6 bg-gray-900" : "w-2 bg-gray-300"
              }`}
              aria-label={`Show step ${i + 1}`}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-7 shadow-sm overflow-hidden">
          <StepContent index={active} accent={accent} />
        </div>
      </div>
    </div>
  );
}

function Dot({
  top,
  active,
  onClick,
  accent,
}: {
  top: string;
  active: boolean;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-[9px] -translate-y-1/2 size-5 rounded-full ring-4 ring-white shadow transition-transform hover:scale-110"
      style={{ top, background: active ? accent : "#0f172a" }}
      aria-label="Journey step"
    />
  );
}

function StepContent({ index, accent }: { index: number; accent: string }) {
  const step = STEPS[index];
  const [key, setKey] = useState(index);
  useEffect(() => setKey(index), [index]);

  return (
    <div
      key={key}
      className="transition-all duration-500 opacity-100 animate-[fadeIn_.5s_ease]"
    >
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0px);
          }
        }
      `}</style>
      <h4 className="text-xl md:text-2xl font-bold text-gray-900">
        {step.title}
      </h4>
      <p className="mt-2 text-gray-600">{step.blurb}</p>

      <ul className="mt-4 space-y-2">
        {step.bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-gray-700 text-sm md:text-base"
          >
            <span
              className="mt-1 inline-block h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ----------------------------- Testimonials ---------------------------- */
/* Single carousel (snap) on all screens, auto-scroll every 3s,
   glass arrows on desktop, mobile-only dots, extra mobile spacing. */
function Testimonials({ accent }: { accent: string }) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);
  const resumeTimer = useRef<number | null>(null);
  const rAF = useRef<number | null>(null);

  const CARD_GAP = 16;

  const getCardWidth = useCallback((): number => {
    const el = scrollerRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLDivElement>('[data-card="t"]');
    if (!card) return 0;
    return card.offsetWidth + CARD_GAP;
  }, []);

  const scrollToIndex = useCallback(
    (i: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      const width = getCardWidth();
      el.scrollTo({ left: i * width, behavior: "smooth" });
    },
    [getCardWidth]
  );

  // Auto-scroll
  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % TESTIMONIALS.length;
        scrollToIndex(next);
        return next;
      });
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused, scrollToIndex]);

  // Update index on manual scroll & temporarily pause
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (rAF.current) cancelAnimationFrame(rAF.current);
      rAF.current = requestAnimationFrame(() => {
        const width = getCardWidth();
        if (!width) return;
        const current = Math.round(el.scrollLeft / width);
        setIndex(Math.max(0, Math.min(TESTIMONIALS.length - 1, current)));
      });

      setPaused(true);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
      resumeTimer.current = window.setTimeout(() => setPaused(false), 1500);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rAF.current) cancelAnimationFrame(rAF.current);
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    };
  }, [getCardWidth]);

  // Pause/resume on hover/touch/focus
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const pause = () => setPaused(true);
    const resume = () => setPaused(false);

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("touchend", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("touchend", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
    };
  }, []);

  // Arrows (desktop)
  const goLeft = () => {
    setIndex((prev) => {
      const next = Math.max(0, prev - 1);
      scrollToIndex(next);
      return next;
    });
  };
  const goRight = () => {
    setIndex((prev) => {
      const next = Math.min(TESTIMONIALS.length - 1, prev + 1);
      scrollToIndex(next);
      return next;
    });
  };

  return (
    <div className="mt-6 lg:mt-8">
      <div className="relative">
        {/* Scroller */}
        <div
          ref={scrollerRef}
          className="-mx-4 px-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          tabIndex={0}
          aria-label="Testimonials carousel"
        >
          <div className="flex gap-4">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                data-card="t"
                className="min-w-[86%] sm:min-w-[62%] lg:min-w-[32%] snap-start"
              >
                <TestimonialCard t={t} accent={accent} />
              </div>
            ))}
          </div>
        </div>

        {/* Glass arrows (desktop only) */}
        <button
          onClick={goLeft}
          aria-label="Previous testimonial"
          className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 size-10 rounded-full border border-white/60 bg-white/30 backdrop-blur-md shadow hover:bg-white/50 dark:text-black transition"
        >
          <ChevronLeft className="m-auto" />
        </button>
        <button
          onClick={goRight}
          aria-label="Next testimonial"
          className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 size-10 rounded-full border border-white/60 bg-white/30 backdrop-blur-md shadow hover:bg-white/50 dark:text-black transition"
        >
          <ChevronRight className="m-auto" />
        </button>
      </div>

      {/* Dots (mobile only) */}
      <div className="mt-5 flex items-center justify-center gap-2 md:hidden">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-gray-900" : "w-2 bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ t, accent }: { t: Testimonial; accent: string }) {
  return (
    <article className="h-full rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm mx-1 sm:mx-0">
      <Quote className="text-gray-300 mb-3" />
      <p className="text-gray-800 leading-relaxed">“{t.quote}”</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="relative size-10 rounded-full overflow-hidden ring-2 ring-white shadow">
          <Image src={IMG} alt={t.author} fill className="object-cover" />
        </div>
        <div className="text-sm">
          <div className="font-semibold dark:text-black">{t.author}</div>
          <div className="text-gray-500">{t.role}</div>
        </div>
      </div>
      <div
        className="mt-4 h-1 w-16 rounded-full"
        style={{ background: `linear-gradient(90deg, ${accent}, #facc15)` }}
      />
    </article>
  );
}
