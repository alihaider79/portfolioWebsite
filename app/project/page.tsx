"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

const ACCENT = "#F28A2E";

/* ---------- helpers for video types ---------- */
function isYouTubeUrl(url?: string) {
  if (!url) return false;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    return (
      host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be"
    );
  } catch {
    return false;
  }
}

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname.replace(/\/+$/, "");

    // youtu.be/<id>
    if (host === "youtu.be") {
      const id = path.slice(1);
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      // watch?v=<id>
      const v = u.searchParams.get("v");
      if (v) return v;

      const parts = path.split("/").filter(Boolean);

      // /embed/<id>
      const embedIdx = parts.indexOf("embed");
      if (embedIdx >= 0 && parts[embedIdx + 1]) return parts[embedIdx + 1];

      // /shorts/<id>
      const shortsIdx = parts.indexOf("shorts");
      if (shortsIdx >= 0 && parts[shortsIdx + 1]) return parts[shortsIdx + 1];

      // /live/<id> (optional)
      const liveIdx = parts.indexOf("live");
      if (liveIdx >= 0 && parts[liveIdx + 1]) return parts[liveIdx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedSrc(url: string) {
  const id = getYouTubeId(url);
  if (!id) return null;
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

function isYouTubeShorts(url?: string) {
  if (!url) return false;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const parts = u.pathname.split("/").filter(Boolean);
    return (
      (host === "youtube.com" || host === "m.youtube.com") &&
      parts[0] === "shorts" &&
      !!parts[1]
    );
  } catch {
    return false;
  }
}

/* ---------- types ---------- */
type Project = {
  title: string;
  tags: string[];
  year: string;
  image: string; // poster/thumbnail from /public
  videoUrl?: string; // local file OR external (YouTube/CDN)
  href: string;
  featured?: boolean;
};

/* ---------- data ---------- */
const PROJECTS: Project[] = [
  {
    title: "Palaros",
    tags: ["Product", "Shorts"],
    year: "2025",
    image: "/thumbnails/vid1.jpeg",
    videoUrl: "https://youtu.be/pfLiRD3_siY?si=EFYWRJFS14hFuiJr",
    href: "/project/podcast-clips-reel",
    featured: true,
  },
  {
    title: "Mavera",
    tags: ["SAAS", "Animation"],
    year: "2025",
    image: "/thumbnails/vid2.png",
    videoUrl: "https://youtu.be/pfvlaDm6clY?si=Ef_kiWDCoJBZTvQ9",
    href: "/project/ugc-fitness",
  },
  {
    title: "Theyfy",
    tags: ["Motion", "3D"],
    year: "2024",
    image: "/thumbnails/vid1.jpeg",
    videoUrl: "https://youtu.be/pfvlaDm6clY?si=Ef_kiWDCoJBZTvQ9",
    href: "/project/logo-sting",
    featured: true,
  },
  // --- Your Shorts list (each as its own item) ---
  {
    title: "Short: 1",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/vid3.png",
    videoUrl: "https://www.youtube.com/shorts/ATMFe0PL0ow",
    href: "/project/short-ATMFe0PL0ow",
  },
  {
    title: "Short: 2",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/vid3.png",
    videoUrl: "https://www.youtube.com/shorts/hwzAUim-2OQ",
    href: "/project/short-hwzAUim-2OQ",
  },
  {
    title: "Short: 3",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/vid3.png",
    videoUrl: "https://www.youtube.com/shorts/9a2CTXLCR6Q",
    href: "/project/short-9a2CTXLCR6Q",
  },
  {
    title: "Short: 4",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/vid3.png",
    videoUrl: "https://www.youtube.com/shorts/lMcwRjbX-Jo",
    href: "/project/short-lMcwRjbX-Jo",
  },
  {
    title: "Short: 5",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/vid3.png",
    videoUrl: "https://www.youtube.com/shorts/9H5mYFG_Ba0",
    href: "/project/short-9H5mYFG_Ba0",
  },
  {
    title: "Short: 6",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/vid3.png",
    videoUrl: "https://www.youtube.com/shorts/J1k83p7MFco",
    href: "/project/short-J1k83p7MFco",
  },
  {
    title: "Short: 7",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/vid3.png",
    videoUrl: "https://www.youtube.com/shorts/kYImms4G7nQ",
    href: "/project/short-kYImms4G7nQ",
  },
];

/* ---------- component ---------- */
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

/* ----------------- Modal (Shorts = true 9:16, edge-to-edge) ------------------ */
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

  const isYT = project.videoUrl && isYouTubeUrl(project.videoUrl);
  const isShort = project.videoUrl && isYouTubeShorts(project.videoUrl);
  const youTubeEmbed = isYT ? getYouTubeEmbedSrc(project.videoUrl!) : null;

  // Base panel styles
  const basePanel =
    "relative overflow-hidden shadow-2xl bg-white text-gray-900 border border-gray-200 dark:bg-neutral-900 dark:text-neutral-100 dark:border-white/10 transform transition-all duration-200";
  const appear = mounted ? "opacity-100 scale-100" : "opacity-0 scale-95";

  // For Shorts we let the media define the panel width by using aspect-ratio and height
  // Height target: 85vh (adjust if you want). Width auto = height * 9/16.
  const panelStyle: React.CSSProperties | undefined = isShort
    ? { width: "auto" }
    : undefined;

  const panelClasses = isShort
    ? "rounded-2xl" // no fixed max-w; width comes from 9:16 box below
    : "w-full max-w-2xl rounded-2xl";

  return (
    <div
      onClick={handleBackdrop}
      className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`${basePanel} ${panelClasses} ${appear}`}
        style={panelStyle}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-200 dark:border-white/10 flex items-start justify-between">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-neutral-300" />
          </button>
        </div>

        {/* Media */}
        <div className="bg-black flex justify-center">
          {project.videoUrl ? (
            youTubeEmbed ? (
              isShort ? (
                // TRUE 9:16 box: set height, use CSS aspect-ratio so width = height * 9/16
                <div
                  className="relative rounded-t-xl overflow-hidden"
                  style={{
                    // shorter so header + footer fit on screen
                    height: "70vh",
                    // hard cap to never exceed viewport minus ~header/footer space
                    maxHeight: "calc(100vh - 120px)",
                    // keep true 9:16; width auto-calculates from height
                    aspectRatio: "9 / 16",
                    width: "auto",
                  }}
                >
                  <iframe
                    src={youTubeEmbed}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ) : (
                // Normal YouTube (16:9)
                <div
                  className="relative w-full"
                  style={{ paddingTop: "56.25%" }}
                >
                  <iframe
                    src={youTubeEmbed}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full rounded-t-xl"
                  />
                </div>
              )
            ) : (
              // Local / non-YouTube video
              <video
                src={project.videoUrl}
                poster={project.image}
                controls
                playsInline
                autoPlay
                preload="metadata"
                className={`w-full ${
                  isShort ? "max-h-[85vh] aspect-[9/16]" : "max-h-[60vh]"
                } object-contain rounded-t-xl`}
              />
            )
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className={`w-full ${
                isShort ? "max-h-[85vh] aspect-[9/16]" : "max-h-[60vh]"
              } object-contain rounded-t-xl`}
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
          {/* (subtitle/description intentionally removed) */}
        </div>
      </div>
    </div>
  );
}
