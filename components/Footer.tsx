import { Instagram, Mail, Youtube, MessageCircle } from "lucide-react";

const ACCENT = "#F28A2E";

const LINKS = {
  instagram: "https://www.instagram.com/edfy.edits/",
  fiverr: "https://www.fiverr.com/sellers/faisalibupoto",
  email: "mailto:fkibupoto@gmail.com",
  whatsapp: "https://wa.me/923363108910",
  youtube: "https://www.youtube.com/channel/UCDjsQfB2OnsTP9p6Ld_lccQ",
};

export default function Footer() {
  return (
    <footer>
      <div className="relative w-full overflow-hidden rounded-t-[32px] border-t border-white/10 bg-[#0d1117]">
        {/* Gradient bg */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,#0d1117_0%,#131a22_55%,#0d1117_100%)]" />
          <div
            className="absolute -left-24 top-6 w-80 h-80 blur-3xl rounded-[45%] opacity-40"
            style={{
              background:
                "radial-gradient(closest-side,#FFB980,transparent 70%)",
            }}
          />
          <div
            className="absolute -right-24 bottom-0 w-96 h-96 blur-3xl rounded-[45%] opacity-40"
            style={{
              background:
                "radial-gradient(closest-side,#FF7A59,transparent 70%)",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center md:text-left">
            {/* Left side */}
            <div>
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                FAISAL YASEEN
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Video Editor & Motion Designer
              </p>

              {/* Connect */}
              <div className="mt-6">
                <h4 className="text-white text-sm font-semibold mb-2">
                  Connect
                </h4>
                <div className="flex justify-center md:justify-start gap-4 text-white/80">
                  <a
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="hover:text-white transition"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={LINKS.email}
                    aria-label="Email"
                    className="hover:text-white transition"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href={LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="hover:text-white transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a
                    href={LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="hover:text-white transition"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Hire + Fiverr */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex flex-col items-center md:items-end gap-3">
                <div className="flex gap-3">
                  {/* Hire me (same tab) */}
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-black hover:brightness-110 transition"
                    style={{
                      backgroundColor: ACCENT,
                      boxShadow: "0 10px 24px rgba(242,138,46,.35)",
                    }}
                  >
                    Hire me
                  </a>

                  {/* Fiverr (new tab) */}
                  <a
                    href={LINKS.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-white border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition"
                  >
                    Fiverr
                  </a>
                </div>
              </div>
              <p className="mt-2 text-xs text-white/60 md:text-right max-w-[260px]">
                Available for freelance & full-time opportunities.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-white/10 pt-6 text-center text-[12px] text-white/50">
            © {new Date().getFullYear()} Faisal Yaseen.
          </div>
        </div>
      </div>
    </footer>
  );
}
