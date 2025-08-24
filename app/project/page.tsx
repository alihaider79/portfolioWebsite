"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const ACCENT = "#F28A2E";

type Project = {
  title: string;
  subtitle?: string;
  tags: string[];
  year: string;
  image: string; // poster/thumbnail from /public
  videoUrl?: string; // local video from /public/videos
  href: string;
  featured?: boolean;
  description?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Podcast Clips Reel",
    subtitle: "Hook-first edits for retention",
    description:
      "A montage of high-retention clips with tight pacing, captions, and on-brand graphics.",
    tags: ["Product", "Shorts"],
    year: "2025",
    image: "/thumbnails/vid1.jpeg", // put this file in /public/thumbnails
    videoUrl: "/videos/ExtraSamples/vid1.mp4", // put this file in /public/videos
    href: "/project/podcast-clips-reel",
    featured: true,
  },
  {
    title: "UGC Ad — Fitness",
    subtitle: "30s conversion-focused spot",
    description:
      "UGC-style concept with callouts, SFX timing, and fast whitespace rhythm for CTR.",
    tags: ["Ads", "UGC"],
    year: "2025",
    image: "/thumbnails/vid1.jpeg",
    videoUrl: "/videos/Editingskooledit/vid1.mp4",
    href: "/project/ugc-fitness",
  },
  {
    title: "Logo Sting (3D)",
    subtitle: "Simple Blender + AE polish",
    description:
      "Light 3D motion with AE title treatment and subtle sound design.",
    tags: ["Motion", "3D"],
    year: "2024",
    image: "/thumbnails/vid1.jpeg",
    videoUrl: "/videos/ExtraSamples/vid2.mp4",
    href: "/project/logo-sting",
    featured: true,
  },
  {
    title: "Channel Refresh",
    subtitle: "Color, pacing, and titles",
    description:
      "Rebuilt templates and presets to compress the idea→publish cycle to hours.",
    tags: ["Web", "Templates"],
    year: "2025",
    image: "/thumbnails/vid1.jpeg",
    videoUrl: "/videos/logoAnimation/vid1.mp4",
    href: "/project/channel-refresh",
  },
  {
    title: "Explainer Snippet",
    subtitle: "30–45s product walkthrough",
    description:
      "Scripted highlight cut with clear VO, captions, and beat-matched transitions.",
    tags: ["Explainer", "Product"],
    year: "2024",
    image: "/thumbnails/vid1.jpeg",
    videoUrl: "/videos/logoAnimation/vid2.mp4",
    href: "/project/explainer-snippet",
  },
  {
    title: "Onboarding Micro-Flow",
    subtitle: "UX motion prototype",
    description:
      "Micro-interactions for frictionless onboarding; crisp, intentional motion.",
    tags: ["UX", "Prototype"],
    year: "2024",
    image: "/thumbnails/vid1.jpeg",
    videoUrl: "/videos/logoAnimation/vid3.mp4",
    href: "/project/onboarding-flow",
  },
];

export default function ProjectsGallery() {
  const allTags = useMemo(() => {
    const set = new Set<string>(["All"]);
    PROJECTS.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);
  const [activeTag, setActiveTag] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeTag === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx !== null) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openIdx]);

  return (
    <>
      {/* Header */}
      <section className="pt-8 pb-6 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-neutral-100">
            Selected <span style={{ color: ACCENT }}>Projects</span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-neutral-300">
            A curated set of product work across dashboards, design systems,
            onboarding flows, and research.
          </p>
          <div
            className="mt-4 h-1.5 w-28 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, #facc15)` }}
          />

          {/* Chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {allTags.map((c) => {
              const active = c === activeTag;
              return (
                <button
                  key={c}
                  onClick={() => setActiveTag(c)}
                  className={[
                    "px-3 py-1.5 text-xs rounded-full border transition",
                    active
                      ? "text-black dark:text-white"
                      : "text-gray-600 hover:text-gray-900 dark:text-neutral-300 dark:hover:text-white",
                  ].join(" ")}
                  style={{
                    borderColor: active ? ACCENT : "rgba(0,0,0,.12)",
                    background: active ? "rgba(242,138,46,.12)" : "transparent",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-16 bg-white dark:bg-neutral-950 transition-colors">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((p, idx) => (
              <Card
                key={`${p.title}-${idx}`}
                p={p}
                onOpen={() => setOpenIdx(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {openIdx !== null && (
        <ProjectModal
          project={filtered[openIdx]}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </>
  );
}

/* ----------------- Card ------------------ */
function Card({ p, onOpen }: { p: Project; onOpen: () => void }) {
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={onKey}
      aria-label={`Open ${p.title}`}
      className={[
        "group relative overflow-hidden rounded-2xl cursor-pointer transition",
        "border border-gray-200 bg-white shadow-sm hover:shadow-md",
        "dark:border-white/10 dark:bg-neutral-900 dark:shadow-[0_0_0_1px_rgba(255,255,255,.06)]",
        p.featured ? "md:col-span-2 xl:col-span-2" : "",
      ].join(" ")}
    >
      {/* Media Poster */}
      <div className="relative">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-64 object-cover md:h-60 lg:h-64"
          loading="lazy"
        />

        {/* Top tags */}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
          {p.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs rounded-full bg-white/90 border border-gray-200 text-gray-800 backdrop-blur
                         dark:bg-neutral-900/80 dark:border-white/10 dark:text-neutral-100"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Decorative rim */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
          style={{ boxShadow: "inset 0 0 0 2px rgba(242,138,46,.35)" }}
        />
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100">
            {p.title}
          </h3>
          <span className="text-xs text-gray-500 dark:text-neutral-400">
            {p.year}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-700
                           dark:bg-neutral-800 dark:text-neutral-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Preview pill */}
          <span
            onClick={onOpen}
            className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur border border-gray-200 px-3 py-1.5 text-xs text-gray-900 shadow-sm group-hover:scale-[1.03] transition
                       dark:bg-neutral-900/90 dark:border-white/10 dark:text-neutral-100"
            title="Preview"
            role="button"
          >
            ▶︎ Preview
          </span>
        </div>
      </div>
    </article>
  );
}

/* ----------------- Modal (dark themed) ------------------ */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4
                  transition-opacity duration-200 ${
                    mounted ? "opacity-100" : "opacity-0"
                  }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl
                    bg-white text-gray-900 border border-gray-200
                    dark:bg-neutral-900 dark:text-neutral-100 dark:border-white/10
                    transform transition-all duration-200 ${
                      mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-white/10 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold">{project.title}</h3>
            {project.subtitle && (
              <p className="text-sm text-gray-600 dark:text-neutral-300 mt-0.5">
                {project.subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-neutral-300" />
          </button>
        </div>

        {/* Media */}
        <div className="bg-black">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              poster={project.image}
              controls
              playsInline
              autoPlay
              preload="metadata"
              className="w-full max-h-[60vh] object-contain rounded-t-xl"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[60vh] object-contain rounded-t-xl"
              loading="lazy"
            />
          )}
        </div>

        {/* Details */}
        <div className="px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-neutral-400">
              {project.year}
            </span>
            <span className="text-gray-300 dark:text-neutral-600">•</span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {project.description && (
            <p className="mt-3 text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Optional external link to detail page */}
          <div className="mt-4">
            <Link
              href={project.href}
              className="inline-flex items-center text-sm font-medium hover:underline"
              style={{ color: ACCENT }}
            >
              View project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
