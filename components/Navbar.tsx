"use client";
import Link from "next/link";
import { Bold, Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const leftLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Service" },
  { href: "#experience", label: "Work Experience" },
];

const rightLinks = [
  { href: "/resume", label: "Resume" },
  { href: "/project", label: "Project" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#home");
  const pathname = usePathname();
  const orange = "#F28A2E";

  const hashLinks = useMemo(() => leftLinks.map((l) => l.href), []);
  const allLinks = useMemo(() => [...leftLinks, ...rightLinks], []);

  // Smart click handler: smooth-scroll only when already on "/"
  const handleNavClick = (resolvedHref: string) => (e: React.MouseEvent) => {
    const hasHash = resolvedHref.includes("#");
    const onHome = pathname === "/";
    if (hasHash && onHome) {
      e.preventDefault();
      const hash = resolvedHref.slice(resolvedHref.indexOf("#")); // "#services"
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      const HEADER_OFFSET = 84;
      const top =
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", hash);
      setActiveHash(hash);
      setOpen(false);
      return;
    }
    // route navigation (or off-home /#hash)
    setOpen(false);
  };

  // -------- Robust Scroll Spy on Home ----------
  useEffect(() => {
    if (pathname !== "/") return;

    const HEADER_OFFSET = 96;
    const sectionIds = hashLinks.map((h) => h.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    let ticking = false;

    const updateActiveFromScroll = () => {
      ticking = false;

      // Find the section whose top is closest to HEADER_OFFSET (>= 0 preferred)
      let bestHash = activeHash;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - HEADER_OFFSET);
        // Prefer sections that are at/above the header line; if all below, closest wins
        const isAbove = rect.top - HEADER_OFFSET <= 1;
        const score = isAbove ? dist * 0.9 : dist * 1.1; // small bias toward above
        if (score < bestDist) {
          bestDist = score;
          bestHash = `#${el.id}`;
        }
      }

      if (bestHash !== activeHash) {
        setActiveHash(bestHash);
        // keep URL hash in sync without jump
        const url = new URL(window.location.href);
        if (url.hash !== bestHash) {
          history.replaceState(null, "", bestHash);
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActiveFromScroll);
      }
    };

    // Also react to direct hash changes (e.g., back/forward)
    const onHashChange = () => {
      const h = window.location.hash || "#home";
      setActiveHash(h);
    };

    // Initial sync (in case landing on /#services)
    onHashChange();
    updateActiveFromScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [hashLinks, pathname, activeHash]);

  const isRouteActive = (href: string) => href === pathname;
  const isHashActive = (href: string) =>
    pathname === "/" && href === activeHash;

  const linkBase = "px-5 py-2 rounded-full font-medium transition";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="pt-3 md:pt-5">
          <div className="max-w-6xl mx-auto px-4">
            {/* Desktop */}
            <div className="hidden md:flex items-center justify-between h-14 rounded-full bg-black text-white px-2 shadow-[0_8px_24px_rgba(0,0,0,.18)]">
              <ul className="flex items-center gap-2">
                {leftLinks.map((l) => {
                  const onHome = pathname === "/";
                  const hrefProp = onHome
                    ? l.href
                    : `/${l.href.replace(/^#/, "#")}`;
                  const active = isHashActive(l.href);
                  return (
                    <li key={l.label}>
                      <Link
                        href={hrefProp}
                        onClick={handleNavClick(hrefProp)}
                        className={`${linkBase} ${
                          active
                            ? "shadow-[0_10px_28px_rgba(242,138,46,.35)]"
                            : "hover:bg-white/10"
                        }`}
                        style={
                          active
                            ? { backgroundColor: orange, color: "#111" }
                            : {}
                        }
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Logo */}
              <div className="flex items-center gap-2 select-none">
                <div
                  className="w-30 h-10 rounded-full grid place-items-center font-bold"
                  style={{ backgroundColor: orange, color: "white" }}
                >
                  Faisal Yasin
                </div>
              </div>

              <ul className="flex items-center gap-2">
                {rightLinks.map((l) => {
                  const active = isRouteActive(l.href);
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className={`${linkBase} ${
                          active ? "" : "hover:bg-white/10"
                        }`}
                        style={
                          active
                            ? { backgroundColor: orange, color: "#111" }
                            : {}
                        }
                        onClick={handleNavClick(l.href)}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile */}
            <div className="md:hidden flex items-center justify-between h-12 rounded-xl bg-black text-white px-3 shadow-[0_8px_20px_rgba(0,0,0,.18)]">
              <div className="flex items-center gap-2">
                <div
                  className="w-30 h-8 rounded-full grid place-items-center font-bold"
                  style={{ backgroundColor: orange, color: "#111" }}
                >
                  Faisal Yasin
                </div>
              </div>
              <button onClick={() => setOpen((s) => !s)} aria-label="Open menu">
                <Menu />
              </button>
            </div>

            {open && (
              <div className="md:hidden mt-2 rounded-xl bg-black text-white divide-y divide-white/10 overflow-hidden">
                {[...leftLinks, ...rightLinks].map((l) => {
                  const onHome = pathname === "/";
                  const isHash = l.href.startsWith("#");
                  const hrefProp = isHash
                    ? onHome
                      ? l.href
                      : `/${l.href}`
                    : l.href;
                  const active = isHash
                    ? isHashActive(l.href)
                    : isRouteActive(l.href);
                  return (
                    <Link
                      key={l.label}
                      href={hrefProp}
                      onClick={handleNavClick(hrefProp)}
                      className={`block px-4 py-3 ${
                        active ? "" : "hover:bg-white/10"
                      }`}
                      style={active ? { color: orange } : {}}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </header>
      {/* spacer for fixed navbar */}
      <div className="h-[76px] md:h-[92px]" />
    </>
  );
}
