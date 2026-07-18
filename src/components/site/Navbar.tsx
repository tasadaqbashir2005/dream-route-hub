import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { waLink, BRAND_NAME } from "@/lib/site-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-white/85 backdrop-blur-md shadow-md"
      }`}
    >

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8 lg:py-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-10 w-10 place-items-center rounded-full gradient-royal text-white shadow-md">
            <span className="font-serif text-lg font-bold">S</span>
          </div>
          <div className="min-w-0 leading-tight">
            <div className="font-serif text-sm font-bold text-[#0B2545] sm:text-base">
              {BRAND_NAME}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-500">
              Visa & Tours
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-[#0B2545]"
              activeProps={{ className: "text-[#0B2545] font-semibold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={waLink("Hello, I want to inquire about your services.")}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full gradient-gold px-4 py-2.5 text-sm font-semibold text-[#0B2545] shadow-md transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/80 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-4 mb-3 rounded-2xl px-4 py-3 shadow-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-white/60"
                  activeProps={{ className: "bg-white/70 text-[#0B2545] font-semibold" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={waLink("Hello, I want to inquire about your services.")}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full gradient-gold px-4 py-2.5 text-sm font-semibold text-[#0B2545]"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
