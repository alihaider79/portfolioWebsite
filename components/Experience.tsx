type Item = {
  company: string;
  city: string;
  start: string;
  end?: string;
  role: string;
  blurb?: string;
};

const ACCENT = "#F28A2E";

const DATA: Item[] = [
  {
    company: "YouTube Content Creator",
    city: "Remote",
    start: "Jan 2019",
    end: "Dec 2022",
    role: "Video Creator & Editor",
    blurb:
      "Creating engaging video content on YouTube, focusing on storytelling and audience connection.",
  },
  {
    company: "Mavera",
    city: "Remote",
    start: "Sep 2024",
    end: "Oct 2024",
    role: "Motion Designer & Animator",
    blurb:
      "Crafting dynamic motion graphics and animations for a cutting-edge AI platform.",
  },
  {
    company: "Freelance Video Editor",
    city: "Remote",
    start: "Jan 2021",
    end: "Present",
    role: "Short-Form & YouTube Editor",
    blurb:
      "Editing short-form content and YouTube videos, enhancing viewer engagement through creative storytelling.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-white py-14 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            My <span style={{ color: ACCENT }}>Work Experience</span>
          </h2>
          <p className="mt-2 text-gray-500">
            A journey through my professional roles, showcasing my growth and
            contributions in the field of video editing and motion design.
          </p>
        </div>

        {/* ---------- DESKTOP / TABLET ---------- */}
        <div className="relative mt-12 hidden md:block">
          {/* global horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gray-200 rounded" />

          <div className="relative flex justify-between gap-16 lg:gap-24 xl:gap-32">
            {DATA.map((item, idx) => (
              <div
                key={idx}
                className="relative flex-1 text-center max-w-[460px]"
              >
                {/* node */}
                <span
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full ring-4 ring-white shadow"
                  style={{ background: idx === 1 ? "#0f172a" : ACCENT }}
                />

                {/* WHERE (top) */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.company}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.city} • {item.start} – {item.end ?? "Present"}
                  </p>
                </div>

                {/* WHAT (bottom) */}
                <div className="mt-30">
                  <h4 className="text-base font-medium text-gray-800">
                    {item.role}
                  </h4>
                  {item.blurb && (
                    <p className="mt-2 text-sm text-gray-600 max-w-[42ch] mx-auto leading-relaxed">
                      {item.blurb}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- MOBILE: scroll-snap carousel ---------- */}
        <div className="md:hidden mt-10">
          <div className="relative -mx-4 px-4">
            <div
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2
                         [-ms-overflow-style:none] [scrollbar-width:none]
                         [&::-webkit-scrollbar]:hidden"
            >
              {DATA.map((item, idx) => (
                <article
                  key={idx}
                  className="snap-center shrink-0 w-[85%] bg-white rounded-xl border border-gray-200 shadow-sm p-5 mx-1"
                >
                  {/* local line + node */}
                  <div className="relative h-6 mb-4">
                    <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gray-200" />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full ring-2 ring-white shadow"
                      style={{ background: idx === 1 ? "#0f172a" : ACCENT }}
                    />
                  </div>

                  {/* top (where) */}
                  <h3 className="text-base font-semibold text-gray-900 text-center">
                    {item.company}
                  </h3>
                  <p className="text-xs text-gray-500 text-center">
                    {item.city} • {item.start} – {item.end ?? "Present"}
                  </p>

                  {/* bottom (what) */}
                  <div className="mt-3 text-center">
                    <h4 className="text-sm font-medium text-gray-800">
                      {item.role}
                    </h4>
                    {item.blurb && (
                      <p className="mt-1 text-sm text-gray-600">{item.blurb}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
