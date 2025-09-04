"use client";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Clock,
  Youtube,
  MessageCircle,
} from "lucide-react";

const ACCENT = "#F28A2E";

export default function ContactPage() {
  return (
    <main className="bg-white">
      <div className="h-12 md:h-16" />

      <section className="pb-10">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center">
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
              }}
            />
          </div>

          {/* Ticket card */}
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* chips */}
            <div className="px-6 py-4 flex flex-wrap items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                Portfolio Contact
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                Available: Freelance & Full-time
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs">
                RWP, Pakistan
              </span>
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

              {/* Right tiles */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
                <InfoTile
                  title="Email"
                  value="fkibupoto@gmail.com"
                  href="mailto:fkibupoto@gmail.com"
                  icon={<Mail className="w-4 h-4" />}
                />
                <InfoTile
                  title="WhatsApp"
                  value="+92 336 3108910"
                  href="https://wa.me/923363108910"
                  icon={<MessageCircle className="w-4 h-4" />}
                />
                <InfoTile
                  title="Instagram"
                  value="@edfy.edits"
                  href="https://www.instagram.com/edfy.edits/"
                  icon={<Instagram className="w-4 h-4" />}
                />
                <InfoTile
                  title="Fiverr"
                  value="fiverr.com/faisalibupoto"
                  href="https://www.fiverr.com/sellers/faisalibupoto"
                  icon={<Facebook className="w-4 h-4 " />} // placeholder, Fiverr icon not in lucide
                />
                <InfoTile
                  title="YouTube"
                  value="EDFY Edits"
                  href="https://www.youtube.com/channel/UCDjsQfB2OnsTP9p6Ld_lccQ"
                  icon={<Youtube className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* helper */
function InfoTile({
  title,
  value,
  href,
  icon,
}: {
  title: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const ACCENT = "#F28A2E";
  return (
    <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
        style={{ background: `linear-gradient(90deg, ${ACCENT}, #facc15)` }}
      />
      <div className="pl-3">
        <div className="flex items-center gap-2 text-gray-900 font-medium">
          {icon}
          <span>{title}</span>
        </div>
        {href ? (
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm text-gray-600 hover:text-black transition"
          >
            {value}
          </Link>
        ) : (
          <p className="mt-1 text-sm text-gray-600">{value}</p>
        )}
      </div>
    </div>
  );
}
