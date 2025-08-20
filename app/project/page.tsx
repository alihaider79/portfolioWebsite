import Link from "next/link";

const ACCENT = "#F28A2E";

type Project = {
  title: string;
  subtitle?: string;
  tags: string[];
  year: string;
  image: string; // external placeholder for now
  href: string;
  featured?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Cinetstox Trading UX",
    subtitle: "Real-time flows for traders",
    tags: ["Product Design", "Dashboards"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    href: "/project/cinetstox",
    featured: true,
  },
  {
    title: "Sugee Onboarding",
    subtitle: "Conversion-focused onboarding",
    tags: ["UX Research", "Mobile"],
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=1600&auto=format&fit=crop",
    href: "/project/sugee-onboarding",
  },
  {
    title: "Cognizant Analytics",
    subtitle: "Complex data, simple decisions",
    tags: ["Design System", "Data Viz"],
    year: "2022",
    image:
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1600&auto=format&fit=crop",
    href: "/project/cognizant-analytics",
    featured: true,
  },
  {
    title: "Brand Refresh",
    subtitle: "Minimal identity system",
    tags: ["Branding", "Visual"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    href: "/project/brand-refresh",
  },
  {
    title: "Portfolio Engine",
    subtitle: "Fast, content-first site",
    tags: ["Next.js", "Web"],
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1600&auto=format&fit=crop",
    href: "/project/portfolio-engine",
  },
  {
    title: "Usability Lab",
    subtitle: "Research repository & insights",
    tags: ["Research", "Ops"],
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1600&auto=format&fit=crop",
    href: "/project/usability-lab",
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-white">
      {/* Spacer for fixed navbar */}
      <div className="h-[76px] md:h-[92px]" />

      {/* Header (compact, premium) */}
      <section className=" pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Selected <span style={{ color: ACCENT }}>Projects</span>
          </h1>
          <p className="mt-2 text-gray-600">
            A curated set of product work across enterprise dashboards, design
            systems, onboarding flows, and research.
          </p>
          <div
            className="mt-4 h-1.5 w-28 rounded-full"
            style={{ background: `linear-gradient(90deg, ${ACCENT}, #facc15)` }}
          />
          {/* Category chips (non-interactive sample) */}
          <div className="mt-5 flex flex-wrap gap-2">
            {["All", "Product", "Web", "Mobile", "Branding"].map((c, i) => (
              <span
                key={c}
                className={`px-3 py-1.5 text-xs rounded-full border ${
                  i === 0
                    ? "text-black"
                    : "text-gray-600 hover:text-gray-900 transition"
                }`}
                style={{
                  borderColor: i === 0 ? ACCENT : "rgba(0,0,0,.12)",
                  background: i === 0 ? "rgba(242,138,46,.12)" : "transparent",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PROJECTS.map((p, idx) => (
              <ProjectTile key={idx} p={p} />
            ))}
          </div>

          {/* CTA strip */}
          <div className="mt-12 rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-gray-700">
              Want the full story behind these?{" "}
              <Link
                href="/contact"
                className="font-medium"
                style={{ color: ACCENT }}
              >
                Let’s talk about a case study →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ----------------- Card ------------------ */
function ProjectTile({ p }: { p: Project }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition
        ${p.featured ? "md:col-span-2 xl:col-span-2" : ""}`}
    >
      {/* Clickable overlay to full project */}
      <Link
        href={p.href}
        className="absolute inset-0 z-10"
        aria-label={p.title}
      />

      {/* Image */}
      <div className="relative">
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-64 object-cover md:h-60 lg:h-64"
          loading="lazy"
        />

        {/* Top badges */}
        <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
          {p.tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs rounded-full bg-white/90 border border-gray-200 text-gray-800 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Bottom magazine overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 px-4 py-3 shadow-sm translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition">
            <p className="text-sm text-gray-700 line-clamp-2">
              {p.subtitle ?? "Case study highlights and outcomes."}
            </p>
          </div>
        </div>

        {/* Decorative gradient rim on hover */}
        <span
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
          style={{ boxShadow: "inset 0 0 0 2px rgba(242,138,46,.35)" }}
        />
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-gray-900">{p.title}</h3>
          <span className="text-xs text-gray-500">{p.year}</span>
        </div>

        {p.subtitle && (
          <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">
            {p.subtitle}
          </p>
        )}

        {/* Bottom row: tags + view link */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {p.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[11px] rounded-full bg-gray-100 text-gray-700"
              >
                {t}
              </span>
            ))}
          </div>

          <Link
            href={p.href}
            className="text-sm font-medium"
            style={{ color: ACCENT }}
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  );
}
