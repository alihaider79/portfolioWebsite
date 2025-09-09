"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Clock,
  Youtube,
  MessageCircle,
} from "lucide-react";

const ACCENT = "#F28A2E";

// Helper type to allow custom CSS vars in the style prop
type CSSVars = React.CSSProperties & { ["--d"]?: string };

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <main className="bg-white">
      <div className="h-12 md:h-16" />

      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div
            className={[
              "text-center transition-all duration-700 motion-safe:transform",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium text-gray-600">
              <Clock className="w-3.5 h-3.5" />
              Replies within 24h
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-gray-900">
              Let’s build something <span style={{ color: ACCENT }}>great</span>
            </h1>
            <div
              className="mx-auto mt-3 h-1.5 w-24 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, #facc15)`,
                boxShadow: "0 0 18px rgba(242,138,46,.45)",
              }}
            />
          </div>

          {/* Ticket card */}
          <div
            className={[
              "mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-700",
              "motion-safe:transform",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
            ].join(" ")}
          >
            {/* chips */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-center gap-2">
              <Chip>Portfolio Contact</Chip>
              <Chip>Available: Freelance & Full-time</Chip>
              <Chip>Rawalpindi, Pakistan</Chip>
            </div>

            {/* perforation */}
            <div
              className="relative h-8"
              style={{
                background:
                  "repeating-linear-gradient(90deg, transparent 0 10px, rgba(0,0,0,0.06) 10px 12px)",
              }}
            >
              <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200" />
              <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200" />
            </div>

            {/* content */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
              {/* Left summary */}
              <div className="md:col-span-3 flex flex-col justify-center">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                  Hi There!
                </h2>
                <p className="mt-2 text-gray-600 max-w-md">
                  I’m open to interesting roles and collaborations. Feel free to
                  reach out through any of the options alongside.
                </p>

                <div className="mt-4 flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  Rawalpindi, Pakistan
                </div>

                <p className="mt-3 text-sm italic text-gray-500">
                  “Let’s connect and make ideas happen.”
                </p>
              </div>

              {/* Right tiles (all tiles are fully clickable) */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                <InfoTile
                  title="Email"
                  value="fkibupoto@gmail.com"
                  href="mailto:fkibupoto@gmail.com"
                  icon={<Mail className="w-4 h-4" />}
                  index={0}
                />
                <InfoTile
                  title="WhatsApp"
                  value="+92 336 3108910"
                  href="https://wa.me/923363108910"
                  icon={<MessageCircle className="w-4 h-4" />}
                  index={1}
                />
                <InfoTile
                  title="Instagram"
                  value="@edfy.edits"
                  href="https://www.instagram.com/edfy.edits/"
                  icon={<Instagram className="w-4 h-4" />}
                  index={2}
                />
                <InfoTile
                  title="Fiverr"
                  value="fiverr.com/faisalibupoto"
                  href="https://www.fiverr.com/sellers/faisalibupoto"
                  icon={<Facebook className="w-4 h-4 " />} // placeholder icon
                  index={3}
                />
                <InfoTile
                  title="YouTube"
                  value="EDFY Edits"
                  href="https://www.youtube.com/channel/UCDjsQfB2OnsTP9p6Ld_lccQ"
                  icon={<Youtube className="w-4 h-4" />}
                  index={4}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* keyframes and utilities (global) */}
      <style jsx global>{`
        @keyframes tileIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes sheen {
          0% {
            transform: translateX(-40%);
          }
          100% {
            transform: translateX(220%);
          }
        }
        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 0 rgba(0, 0, 0, 0),
              inset 0 0 0 1px rgba(242, 138, 46, 0.15);
          }
          50% {
            box-shadow: 0 10px 28px rgba(242, 138, 46, 0.28),
              0 0 28px rgba(242, 138, 46, 0.32),
              inset 0 0 0 1px rgba(242, 138, 46, 0.28);
          }
          100% {
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06),
              inset 0 0 0 1px rgba(242, 138, 46, 0.18);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:transform {
            transform: none !important;
          }
        }
      `}</style>
    </main>
  );
}

/* ---------- tiny helper ---------- */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
      {children}
    </span>
  );
}

/* ---------- fully clickable tile with rich animations ---------- */
function InfoTile({
  title,
  value,
  href,
  icon,
  index = 0,
}: {
  title: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
  index?: number;
}) {
  const [tilt, setTilt] = useState<string>(
    "perspective(900px) rotateX(0deg) rotateY(0deg)"
  );
  const delayMs = 80 * index;

  // compute tilt from cursor position
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 10; // rotateY (left/right)
    const rx = -(py - 0.5) * 8; // rotateX (up/down)
    setTilt(
      `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(
        2
      )}deg)`
    );
  };
  const onLeave = () =>
    setTilt("perspective(900px) rotateX(0deg) rotateY(0deg)");

  const baseClasses =
    "group relative block overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 transform-gpu";

  const hoverFx =
    "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,.12),0_0_24px_rgba(242,138,46,.35)]";

  const interactive = href
    ? "cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(242,138,46,.5)]"
    : "cursor-default";

  const gradientWash =
    "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

  // add a stable .sheen class so the selector works
  const sheenBar =
    "sheen pointer-events-none absolute -inset-y-8 -left-20 w-24 rotate-12 opacity-0 group-hover:opacity-100";

  const content = (
    <>
      {/* glow / gradient on hover */}
      <div
        className={gradientWash}
        style={{
          background: `radial-gradient(120% 120% at 10% 0%, rgba(242,138,46,.18), transparent 60%), radial-gradient(120% 120% at 90% 100%, rgba(250,204,21,.14), transparent 60%)`,
        }}
      />
      {/* sheen sweep */}
      <div
        className={sheenBar}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)",
          filter: "blur(6px)",
          animation: "sheen 900ms ease 90ms paused",
        }}
      />
      {/* accent edge */}
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
        style={{ background: `linear-gradient(90deg, ${ACCENT}, #facc15)` }}
      />
      {/* body */}
      <div className="relative pl-3">
        <div
          className="mb-1 inline-flex items-center justify-center rounded-lg p-1.5 text-gray-900 transition-all duration-300"
          style={{
            backgroundColor: "rgba(0,0,0,0.04)",
          }}
        >
          <span
            className="grid place-items-center transition-transform duration-300 group-hover:scale-110"
            style={{
              color: ACCENT,
              textShadow: "0 0 18px rgba(242,138,46,.35)",
            }}
          >
            {icon}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-900 font-medium">
          <span>{title}</span>
        </div>

        <p className="mt-1 text-sm text-gray-600 group-hover:text-black transition-colors">
          {value}
        </p>
      </div>
    </>
  );

  // style objects with typed CSS var
  const linkStyle: CSSVars = {
    transform: tilt,
    animation: `tileIn 600ms ease var(--d, 0ms) forwards`,
    ["--d"]: `${delayMs}ms`,
    background: "white",
  };

  const boxStyle: CSSVars = {
    transform: tilt,
    animation: `tileIn 600ms ease var(--d, 0ms) forwards`,
    ["--d"]: `${delayMs}ms`,
  };

  // Fully clickable: wrap entire tile in Link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        target={
          href.startsWith("http") || href.startsWith("mailto:")
            ? "_blank"
            : undefined
        }
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-label={`${title}: ${value}`}
        className={`${baseClasses} ${hoverFx} ${interactive}`}
        style={linkStyle}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={(e) => {
          // retrigger sheen each hover
          const sheen = e.currentTarget.querySelector<HTMLElement>(".sheen");
          if (sheen) {
            sheen.style.animation = "none";
            // force reflow
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            sheen.offsetHeight;
            sheen.style.animation = "sheen 900ms ease 90ms 1";
          }
          e.currentTarget.setAttribute("data-hover", "1");
        }}
      >
        {content}
      </Link>
    );
  }

  // Non-clickable fallback (keeps visuals)
  return (
    <div
      className={`${baseClasses} ${hoverFx} ${interactive}`}
      style={boxStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {content}
    </div>
  );
}
