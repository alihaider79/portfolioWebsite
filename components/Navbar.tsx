"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
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
      let bestHash = activeHash;
      let bestDist = Number.POSITIVE_INFINITY;

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - HEADER_OFFSET);
        const isAbove = rect.top - HEADER_OFFSET <= 1;
        const score = isAbove ? dist * 0.9 : dist * 1.1;
        if (score < bestDist) {
          bestDist = score;
          bestHash = `#${el.id}`;
        }
      }

      if (bestHash !== activeHash) {
        setActiveHash(bestHash);
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

    const onHashChange = () => {
      const h = window.location.hash || "#home";
      setActiveHash(h);
    };

    onHashChange();
    updateActiveFromScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [hashLinks, pathname, activeHash]);

  // -------- Glass effect when scrolled ----------
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <div
              className={[
                "hidden md:flex items-center justify-between h-14 px-2 rounded-full transition-all duration-300",
                scrolled
                  ? "backdrop-blur-md bg-black/60 border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,.22)]"
                  : "bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,.18)]",
                "text-white",
              ].join(" ")}
            >
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
                  className="h-10 px-4 rounded-full grid place-items-center font-bold transition-colors"
                  style={{
                    backgroundColor: orange,
                    color: scrolled ? "#111" : "white",
                  }}
                >
                  Faisal Yaseen
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
            <div
              className={[
                "md:hidden flex items-center justify-between h-12 px-3 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,.18)] transition-all duration-300",
                scrolled
                  ? "backdrop-blur-md bg-black/60 border border-white/10"
                  : "bg-black",
                "text-white",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-8 px-3 rounded-xl grid place-items-center font-bold"
                  style={{ backgroundColor: orange, color: "#111" }}
                >
                  Faisal Yaseen
                </div>
              </div>
              <button
                onClick={() => setOpen((s) => !s)}
                aria-label="Open menu"
                aria-expanded={open}
                className="rounded-lg p-1.5 hover:bg-white/10 transition"
              >
                <Menu />
              </button>
            </div>

            {/* Mobile dropdown with slide/fade animation */}
            <div
              className={[
                "md:hidden overflow-hidden rounded-xl mt-2 transition-all duration-300 origin-top",
                open
                  ? "opacity-100 scale-y-100 max-h-[480px]"
                  : "opacity-0 scale-y-95 max-h-0 pointer-events-none",
                "backdrop-blur-md bg-black/60 text-white border border-white/10",
              ].join(" ")}
            >
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
                    className={`block px-4 py-3 transition ${
                      active ? "" : "hover:bg-white/10"
                    }`}
                    style={active ? { color: orange } : {}}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* spacer for fixed navbar */}
      <div className="h-[76px] md:h-[92px]" />
    </>
  );
}
