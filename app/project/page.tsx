"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

const ACCENT = "#F28A2E";

/* ---------- helpers for video types ---------- */
function isYouTubeUrl(url?: string) {
  if (!url) return false;
  try {
    const u = new URL(url.trim());
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
    const u = new URL(url.trim());
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

      // /live/<id>
      const liveIdx = parts.indexOf("live");
      if (liveIdx >= 0 && parts[liveIdx + 1]) return parts[liveIdx + 1];
    }
    return null;
  } catch {
    return null;
  }
}

function getYouTubeEmbedSrc(url: string, opts?: { autoplay?: boolean }) {
  const id = getYouTubeId(url);
  if (!id) return null;
  const params = new URLSearchParams({
    autoplay: opts?.autoplay ? "1" : "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

function isYouTubeShorts(url?: string) {
  if (!url) return false;
  try {
    const u = new URL(url.trim());
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
    image: "/thumbnails/video.jpeg",
    videoUrl: "https://youtu.be/pfLiRD3_siY?si=EFYWRJFS14hFuiJr",
    href: "/project/podcast-clips-reel",
    featured: true,
  },
  {
    title: "Mavera",
    tags: ["SAAS", "Animation"],
    year: "2025",
    image: "/thumbnails/video.jpeg",
    videoUrl: "https://youtu.be/pfvlaDm6clY?si=Ef_kiWDCoJBZTvQ9",
    href: "/project/ugc-fitness",
  },
  {
    title: "Theyfy Animation Video",
    tags: ["Motion", "3D"],
    year: "2024",
    image: "/thumbnails/video.jpeg",
    videoUrl: "https://youtu.be/APiAZx4pSqU",
    href: "/project/logo-sting",
    featured: true,
  },
  {
    title: "Long form video Intro sample",
    tags: ["Motion", "3D"],
    year: "2024",
    image: "/thumbnails/video.jpeg",
    videoUrl: " https://youtu.be/ZBzPu59vKbo",
    href: "/project/logo-sting",
  },
  // --- Your Shorts list (each as its own item) ---
  {
    title: "Buy FHSA Account in Canada",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/ATMFe0PL0ow",
    href: "/project/short-ATMFe0PL0ow",
  },
  {
    title: "Why savings are important in our life?",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/hwzAUim-2OQ",
    href: "/project/short-hwzAUim-2OQ",
  },
  {
    title: "Your first International Client as a video editor!",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/9a2CTXLCR6Q",
    href: "/project/short-9a2CTXLCR6Q",
  },
  {
    title: "Failure is not everything",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/lMcwRjbX-Jo",
    href: "/project/short-lMcwRjbX-Jo",
  },
  {
    title: "Success is about becoming the best version of YOU",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/9H5mYFG_Ba0",
    href: "/project/short-9H5mYFG_Ba0",
  },
  {
    title: "Indian people are cooked",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/J1k83p7MFco",
    href: "/project/short-J1k83p7MFco",
  },
  {
    title: "Clarity always comes from Within self!",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/kYImms4G7nQ",
    href: "/project/short-kYImms4G7nQ",
  },
  {
    title: "Clarity always comes from Within self!",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/kYImms4G7nQ",
    href: "/project/short-kYImms4G7nQ",
  },
  {
    title: "Thefy Animation Video",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://www.youtube.com/shorts/PCANxXZgPFc",
    href: "/project/short-kYImms4G7nQ",
  },
  {
    title: "The real Og Gfx mentor",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: " https://youtube.com/shorts/xnt1bOANNU8",
    href: "/project/short-kYImms4G7nQ",
  },
  {
    title: "Protect your childern",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://youtube.com/shorts/ld3wxLTG9YE",
    href: "/project/short-kYImms4G7nQ",
  },
  {
    title: "Secret to E-commerce",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: " https://youtube.com/shorts/m_rRRgtrR7w",
    href: "/project/short-kYImms4G7nQ",
  },
  {
    title: " Lukas Kroll Marketing Ad",
    tags: ["Shorts"],
    year: "2025",
    image: "/thumbnails/short.jpeg",
    videoUrl: "https://youtube.com/shorts/eJqJsiwKXb8",
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
        <ProjectLightbox
          project={filtered[openIdx]}
          onClose={() => setOpenIdx(null)}
          autoplay
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

/* ----------------- Lightbox Modal ------------------ */
function ProjectLightbox({
  project,
  onClose,
  autoplay = true,
}: {
  project: Project;
  onClose: () => void;
  autoplay?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const isYT = project.videoUrl && isYouTubeUrl(project.videoUrl);
  const isShort = project.videoUrl && isYouTubeShorts(project.videoUrl);
  const youTubeEmbed = isYT
    ? getYouTubeEmbedSrc(project.videoUrl!, { autoplay })
    : null;

  useEffect(() => {
    setMounted(true);
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={`fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} preview`}
    >
      <div
        className={`relative w-full ${
          isShort ? "max-w-[300px]" : "max-w-2xl"
        } rounded-2xl overflow-hidden border border-white/10 bg-neutral-950`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-black/40">
          <h3 className="text-sm md:text-base font-semibold text-white truncate">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-1 p-2 rounded-full hover:bg-white/10 text-white/90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media */}
        <div className="bg-black flex justify-center">
          {project.videoUrl ? (
            youTubeEmbed ? (
              isShort ? (
                // 9:16 without aspect-ratio utility — uses padding-top trick.
                <div className="flex items-center justify-center p-3 w-full">
                  <div className="relative w-full" style={{ maxWidth: 260 }}>
                    {/* 9:16 => 16/9 = 1.777... so paddingTop is 177.78% */}
                    <div style={{ paddingTop: "177.78%" }} />
                    <iframe
                      src={youTubeEmbed}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full rounded-lg"
                      style={{ top: 0, left: 0 }}
                    />
                  </div>
                </div>
              ) : (
                // 16:9 using padding-top trick (compact)
                <div className="relative w-full">
                  <div style={{ paddingTop: "56.25%" }} />
                  <iframe
                    src={youTubeEmbed}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ top: 0, left: 0 }}
                  />
                </div>
              )
            ) : (
              // Local / non-YouTube
              <video
                src={project.videoUrl}
                poster={project.image}
                controls
                playsInline
                autoPlay={autoplay}
                preload="metadata"
                className={`mx-auto ${
                  isShort ? "max-h-[80vh]" : "w-full"
                } object-contain`}
                style={
                  isShort ? { width: 260, height: (260 * 16) / 9 } : undefined
                }
              />
            )
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className={`w-full ${
                isShort ? "max-h-[80vh]" : "max-h-[60vh]"
              } object-contain`}
              style={
                isShort ? { width: 260, height: (260 * 16) / 9 } : undefined
              }
              loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}
