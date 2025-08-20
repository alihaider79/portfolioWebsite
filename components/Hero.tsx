import { ArrowRight } from "lucide-react";

export default function Hero() {
  const accent = "#F28A2E";

  return (
    <section id="home" className="relative overflow-hidden">
      {/* background accents */}
      <div
        className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(242,138,46,.18), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,.18), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 pt-10 md:pt-14 pb-10">
        {/* kicker + headline */}
        <div className="text-center">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-xs md:text-sm border border-black/10 bg-white/70 backdrop-blur">
            New work dropping soon
          </span>

          <h1 className="mt-4 font-extrabold leading-tight">
            <span className="block text-[34px] md:text-[56px]">
              Crafting <span style={{ color: accent }}>clean</span> & clever
              experiences
            </span>
            <span className="block text-[20px] md:text-[22px] text-black/70 font-medium mt-1">
              Product Designer focused on outcomes, clarity, and delight.
            </span>
          </h1>
        </div>

        {/* main content row */}
        <div className="mt-8 grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
          {/* left: quick stats */}
          <div className="hidden md:flex justify-end">
            <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-5 w-[260px]">
              <p className="text-sm text-black/60">Selected highlights</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex items-center justify-between">
                  <span>Projects</span>{" "}
                  <span className="font-semibold">120+</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Avg. NPS</span>{" "}
                  <span className="font-semibold">9.3</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Case studies</span>{" "}
                  <span className="font-semibold">18</span>
                </li>
              </ul>
            </div>
          </div>

          {/* center: photo card with polygon mask */}
          <div className="relative">
            <div className="absolute -z-10 inset-0 -m-8 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(242,138,46,.10),rgba(168,85,247,.10),rgba(99,102,241,.10),rgba(242,138,46,.10))] blur-2xl rounded-[2rem]" />
            <div className="rounded-[1.75rem] p-[1.5px] bg-gradient-to-tr from-orange-500/50 via-fuchsia-500/50 to-indigo-500/50">
              <div className="rounded-[1.65rem] bg-white/80 backdrop-blur-md p-3">
                {/* image mask */}
                <div
                  className="relative w-[280px] h-[340px] md:w-[360px] md:h-[440px] mx-auto overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(12% 0, 88% 0, 100% 12%, 100% 88%, 88% 100%, 12% 100%, 0 88%, 0 12%)",
                    borderRadius: "1.25rem",
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </div>

                {/* ctas */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <a
                    href="#portfolio"
                    className="px-5 py-2 rounded-full text-sm font-medium text-white"
                    style={{
                      backgroundColor: accent,
                      boxShadow: "0 8px 22px rgba(242,138,46,.30)",
                    }}
                  >
                    View Portfolio
                  </a>
                  <a
                    href="#contact"
                    className="px-5 py-2 rounded-full text-sm font-medium bg-black/5 hover:bg-black/10 transition"
                  >
                    Hire Me
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* right: testimonial chip */}
          <div className="hidden md:flex">
            <div className="rounded-2xl border border-black/10 bg-white/80 backdrop-blur p-5 w-[260px]">
              <p className="text-sm">
                “Thoughtful research and crisp UI.{" "}
                <span className="font-semibold">KPIs moved in 6 weeks</span>.”
              </p>
              <div className="mt-3 text-xs text-black/60">
                — Product Lead, Fintech
              </div>
            </div>
          </div>
        </div>

        {/* slim meta row */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs md:text-sm text-black/60">
          <span className="inline-flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: accent }}
            />
            Available for freelance
          </span>
          <span>•</span>
          <span>Remote-friendly</span>
          <span>•</span>
          <span>Based in Mumbai</span>
        </div>

        {/* micro CTA */}
        <div className="mt-4 flex justify-center">
          <a
            href="#project"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-black/10 hover:bg-black/5 transition"
          >
            Explore projects <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
