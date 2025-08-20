import Link from "next/link";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";

const ACCENT = "#F28A2E";

export default function Footer() {
  return (
    <footer>
      <div className="relative w-full overflow-hidden rounded-t-[32px] border-t border-white/10 bg-[#0d1117]">
        {/* Gradient background */}
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

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center text-center md:text-left">
            {/* Left side */}
            <div>
              <h3 className="text-white text-xl md:text-2xl font-semibold">
                FAISAL YASEEN
              </h3>
              <p className="mt-2 text-sm text-white/70">
                Crafting clean interfaces & delightful product experiences.
              </p>

              {/* Connect */}
              <div className="mt-6">
                <h4 className="text-white text-sm font-semibold mb-2">
                  Connect
                </h4>
                <div className="flex justify-center md:justify-start gap-4 text-white/70">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    aria-label="Instagram"
                    className="hover:text-white transition"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link
                    href="https://facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                    className="hover:text-white transition"
                  >
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link
                    href="tel:+919876543210"
                    aria-label="Phone"
                    className="hover:text-white transition"
                  >
                    <Phone className="w-5 h-5" />
                  </Link>
                  <Link
                    href="mailto:you@example.com"
                    aria-label="Email"
                    className="hover:text-white transition"
                  >
                    <Mail className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Hire me */}
            <div className="flex flex-col items-center md:items-end">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-black"
                style={{
                  backgroundColor: ACCENT,
                  boxShadow: "0 10px 24px rgba(242,138,46,.35)",
                }}
              >
                Hire me
              </Link>
              <p className="mt-3 text-xs text-white/60 md:text-right max-w-[220px]">
                Available for freelance & full-time opportunities.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-8 border-t border-white/10" />
        </div>
      </div>
    </footer>
  );
}
