"use client";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Strongly-typed CSS variables (no "any")
type HeroCSSVars = React.CSSProperties &
  Record<"--dx" | "--dy" | "--tiltX" | "--tiltY" | "--angle", string>;

export default function Hero() {
  const ACCENT = "#F28A2E";

  // Parallax for hero background
  const sectionRef = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const raf = useRef<number | null>(null);

  // Sliding CTA pill hover state
  const [ctaHover, setCtaHover] = useState<"portfolio" | "hire">("portfolio");

  // Initial CSS vars
  const heroVars: HeroCSSVars = {
    "--dx": "0px",
    "--dy": "0px",
    "--tiltX": "0deg",
    "--tiltY": "0deg",
    "--angle": "180deg",
  };

  useEffect(() => {
    setMounted(true);
    const el = sectionRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const dx = (relX - 0.5) * 26;
        const dy = (relY - 0.5) * 26;
        const tiltX = (relY - 0.5) * -2.2;
        const tiltY = (relX - 0.5) * 2.2;
        const angle = 180 + (relX - 0.5) * 25 + (relY - 0.5) * 25;

        el.style.setProperty("--dx", `${dx}px`);
        el.style.setProperty("--dy", `${dy}px`);
        el.style.setProperty("--tiltX", `${tiltX}deg`);
        el.style.setProperty("--tiltY", `${tiltY}deg`);
        el.style.setProperty("--angle", `${angle}deg`);
      });
    };

    const handleLeave = () => {
      el.style.setProperty("--dx", `0px`);
      el.style.setProperty("--dy", `0px`);
      el.style.setProperty("--tiltX", `0deg`);
      el.style.setProperty("--tiltY", `0deg`);
      el.style.setProperty("--angle", `180deg`);
    };

    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      style={heroVars}
      className="relative overflow-hidden will-change-transform bg-white dark:bg-[#0b0f14] transition-colors"
    >
      {/* background blobs */}
      <div
        className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl transition-transform duration-200"
        style={{
          transform:
            "translate3d(calc(var(--dx) * -0.35), calc(var(--dy) * -0.35), 0)",
          background:
            "radial-gradient(closest-side, rgba(242,138,46,.18), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full blur-3xl transition-transform duration-200"
        style={{
          transform:
            "translate3d(calc(var(--dx) * 0.35), calc(var(--dy) * 0.35), 0)",
          background:
            "radial-gradient(closest-side, rgba(99,102,241,.18), transparent 70%)",
        }}
      />

      {/* conic wash (gets a bit subtler in dark with mix) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60 mix-blend-normal dark:mix-blend-overlay"
        style={{
          background:
            "conic-gradient(from var(--angle) at 50% 50%, rgba(242,138,46,.06), rgba(168,85,247,.06), rgba(99,102,241,.06), rgba(242,138,46,.06))",
          transition: "opacity .4s ease",
        }}
      />

      <div
        className={[
          "max-w-6xl mx-auto px-4",
          mounted
            ? "pt-10 md:pt-14 pb-10 opacity-100 translate-y-0"
            : "pt-10 md:pt-14 pb-10 opacity-0 translate-y-2",
          "transition-all duration-700",
        ].join(" ")}
        style={{
          transform:
            "perspective(1200px) rotateX(var(--tiltX)) rotateY(var(--tiltY))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* headline */}
        <div className="text-center">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs md:text-sm border border-black/10 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-white/10 dark:text-white/90">
            New work dropping soon
          </span>
          <h1 className="mt-4 font-extrabold leading-tight text-gray-900 dark:text-white">
            <span className="block text-[20px] md:text-[34px]">
              Stand-Out <span style={{ color: ACCENT }}>Videos</span> That Turn
              Scrollers Into Customers
            </span>
            <span className="block text-[14px] md:text-[18px] text-black/70 dark:text-white/70 font-medium mt-1">
              I help brands and creators tell tighter stories with cinematic
              edits, punchy pacing, and scroll-stopping hooks.
            </span>
          </h1>
        </div>

        {/* content row (fixed center track on desktop) */}
        <div className="mt-8 grid md:grid-cols-[1fr_420px_1fr] items-center gap-8">
          {/* left box */}
          <div className="hidden md:flex justify-end self-center">
            <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 w-[260px] dark:border-white/10 dark:bg-white/10">
              <p className="text-sm text-black/60 dark:text-white/70">
                Selected highlights
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between text-gray-800 dark:text-white/90">
                  <span>Edited Video</span>{" "}
                  <span className="font-semibold">300+</span>
                </li>
                <li className="flex items-center justify-between text-gray-800 dark:text-white/90">
                  <span>Avg. Retention Boost</span>{" "}
                  <span className="font-semibold">35%</span>
                </li>
                <li className="flex items-center justify-between text-gray-800 dark:text-white/90">
                  <span>Happy Clients </span>{" "}
                  <span className="font-semibold">50+</span>
                </li>
              </ul>
            </div>
          </div>

          {/* center image with sliding-pill CTA */}
          <div className="relative">
            <div className="mx-auto w-[300px] md:w-[420px] shrink-0 rounded-[1.75rem] p-[1px] md:p-[1.5px] bg-gradient-to-tr from-orange-500/50 via-fuchsia-500/50 to-indigo-500/50">
              <div className="rounded-[1.6rem] bg-white/80 backdrop-blur-md p-2 md:p-3 dark:bg-white/10">
                <div className="relative h-[420px] md:h-[520px] rounded-[1.1rem] overflow-hidden">
                  {/* Light image */}
                  <Image
                    src="/pic.jpeg"
                    alt="Profile (light)"
                    fill
                    className="object-cover [object-position:50%_12%] dark:hidden"
                    priority
                  />
                  {/* Dark image */}
                  <Image
                    src="/pic.jpeg"
                    alt="Profile (dark)"
                    fill
                    className="hidden dark:block object-cover [object-position:50%_12%]"
                    priority
                  />

                  {/* GLASS PILL — sliding orange highlight between buttons */}
                  <div className="absolute inset-x-3 md:inset-x-6 bottom-3 md:bottom-5 flex justify-center">
                    <div
                      className="relative grid grid-cols-2 items-stretch w-full max-w-md rounded-full p-1.5 md:p-2 border bg-white/20 backdrop-blur-xl transition-all shadow-[0_8px_22px_rgba(0,0,0,.18)] hover:shadow-[0_12px_28px_rgba(242,138,46,.35)] overflow-hidden
                                 border-white/60 dark:border-white/20 dark:bg-white/10"
                      onMouseLeave={() => setCtaHover("portfolio")}
                    >
                      {/* sliding highlight (exact half of container) */}
                      <span
                        className="pointer-events-none absolute top-1.5 md:top-2 bottom-1.5 md:bottom-2 left-1.5 md:left-2 rounded-full transition-transform duration-300 ease-out"
                        style={{
                          width: "calc(50% - 0.5rem)",
                          backgroundColor: ACCENT,
                          transform:
                            ctaHover === "hire"
                              ? "translateX(100%)"
                              : "translateX(0%)",
                          boxShadow:
                            "inset 0 0 0 1px rgba(255,255,255,.45), 0 8px 18px rgba(242,138,46,.35)",
                        }}
                      />

                      {/* Portfolio */}
                      <a
                        href="/project"
                        onMouseEnter={() => setCtaHover("portfolio")}
                        className="relative z-10 rounded-full px-5 md:px-7 py-2 md:py-3 text-center font-semibold flex items-center justify-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          color:
                            ctaHover === "portfolio"
                              ? "#fff"
                              : "rgba(255,255,255,.95)",
                        }}
                      >
                        <span className="text-base md:text-lg">Portfolio</span>
                        <ArrowUpRight className="size-4 md:size-5" />
                      </a>

                      {/* Hire me */}
                      <a
                        href="/contact"
                        onMouseEnter={() => setCtaHover("hire")}
                        className="relative z-10 rounded-full px-5 md:px-7 py-2 md:py-3 text-center font-medium flex items-center justify-center transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          color:
                            ctaHover === "hire"
                              ? "#fff"
                              : "rgba(255,255,255,.95)",
                        }}
                      >
                        <span className="text-base md:text-lg">Hire me</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right testimonial */}
          <div className="hidden md:flex self-center">
            <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-5 w-[260px] dark:border-white/10 dark:bg-white/10">
              <p className="text-sm text-gray-900 dark:text-white">
                “Good job, that was a brilliant move to re-edit the clip.{" "}
                <span className="font-semibold">
                  {" "}
                  where I’m teaching the same thing haha, LOVED IT!
                </span>
                ”
              </p>
              <div className="mt-3 text-xs text-black/60 dark:text-white/60">
                — Saifullah Khan, The Editing Skool
              </div>
            </div>
          </div>
        </div>

        {/* footer meta */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs md:text-sm text-black/60 dark:text-white/60">
          <span className="inline-flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: ACCENT }}
            />
            Available for freelance
          </span>
          <span>•</span>
          <span>Remote-friendly</span>
          <span>•</span>
          <span>Based in Pakistan</span>
        </div>

        {/* bottom CTA */}
        <div className="mt-4 flex justify-center">
          <a
            href="/project"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition
                       border-black/10 hover:bg-black/5 text-gray-900
                       dark:border-white/10 dark:hover:bg-white/10 dark:text-white"
          >
            Explore projects <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
