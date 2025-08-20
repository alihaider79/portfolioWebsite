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
  image: string;
  videoUrl?: string;
  href: string;
  featured?: boolean;
  description?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Cinetstox Trading UX",
    subtitle: "Real-time flows for traders",
    description:
      "Designed a high-signal trading interface with real-time feedback and a modular design system.",
    tags: ["Product", "Dashboards"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "https://filesamples.com/samples/video/mp4/sample_960x540.mp4",
    href: "/project/cinetstox",
    featured: true,
  },
  {
    title: "Sugee Onboarding",
    subtitle: "Conversion-focused onboarding",
    description:
      "Streamlined onboarding with progressive disclosure and personalized paths.",
    tags: ["Mobile", "UX"],
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
    href: "/project/sugee-onboarding",
  },
  {
    title: "Cognizant Analytics",
    subtitle: "Complex data, simple decisions",
    description:
      "A scalable analytics suite with a unified component system and crisp data viz.",
    tags: ["Product", "Data Viz"],
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4",
    href: "/project/cognizant-analytics",
    featured: true,
  },
  {
    title: "Brand Refresh",
    subtitle: "Minimal identity system",
    description:
      "A light identity refresh with typographic rhythm and flexible grid rules.",
    tags: ["Branding", "Visual"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "https://filesamples.com/samples/video/mp4/sample_640x360.mp4",
    href: "/project/brand-refresh",
  },
  {
    title: "Portfolio Engine",
    subtitle: "Fast, content-first site",
    description:
      "A Next.js foundation with content-first architecture and blazing performance.",
    tags: ["Web", "Next.js"],
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop",
    videoUrl: "https://filesamples.com/samples/video/mp4/sample_960x540.mp4",
    href: "/project/portfolio-engine",
  },
  {
    title: "Usability Lab",
    subtitle: "Research repository & insights",
    description:
      "Centralized research repository with tagging, insights, and replay.",
    tags: ["Research", "Ops"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop",
    videoUrl:
      "https://filesamples.com/samples/video/mp4/sample_960x400_ocean_with_audio.mp4",
    href: "/project/usability-lab",
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
                      ? "text-black dark:text-neutral-900"
                      : "text-gray-600 hover:text-gray-900 dark:text-neutral-300 dark:hover:text-white",
                  ].join(" ")}
                  style={{
                    color: "white",
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
              className="w-full max-h-[60vh] object-contain rounded-t-xl"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full max-h-[60vh] object-contain rounded-t-xl"
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
        </div>
      </div>
    </div>
  );
}
