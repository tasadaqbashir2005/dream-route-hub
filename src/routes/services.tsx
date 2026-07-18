import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Plane,
  GraduationCap,
  Moon,
  Building2,
  Check,
  ChevronDown,
} from "lucide-react";
import {
  SCHENGEN_COUNTRIES,
  GLOBAL_COUNTRIES,
  WORK_PERMIT_COUNTRIES,
  STUDY_COUNTRIES,
  SAUDI_SERVICES,
} from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Visit, Study, Umrah, Saudi Khidmat | SHAHID PRIME" },
      { name: "description", content: "Full catalogue of visa & Saudi Khidmat services: Schengen, Global, Work Permits, Study, Umrah (1 & 3 month), Kafala, Wakala and more." },
      { property: "og:title", content: "Services — SHAHID PRIME SERVICES" },
      { property: "og:description", content: "Schengen, Global, Study, Umrah and Saudi Khidmat services." },
    ],
  }),
  component: ServicesPage,
});

type Category = "visit" | "study" | "umrah" | "saudi";

const categories: {
  id: Category;
  title: string;
  desc: string;
  icon: typeof Plane;
  image: string;
}[] = [
  { id: "visit", title: "Visit Visa", desc: "Schengen, global destinations & work permits.", icon: Plane, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200&q=80" },
  { id: "study", title: "Study Visa", desc: "Top European universities & scholarship guidance.", icon: GraduationCap, image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80" },
  { id: "umrah", title: "Umrah Visa", desc: "1 Month & 3 Month Umrah packages.", icon: Moon, image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1200&q=80" },
  { id: "saudi", title: "Saudi Khidmat", desc: "Wakala, Kafala, Azad Visa & Amal Manzali.", icon: Building2, image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&q=80" },
];

function ServicesPage() {
  const [active, setActive] = useState<Category>("visit");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="pt-32">
      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Our Portfolio</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-[#0B2545] sm:text-5xl md:text-6xl">
            Services That Move You Forward
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Choose a category to explore every destination and program we handle end-to-end.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mt-14 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setActive(c.id);
                  setTimeout(() => document.getElementById("category-panel")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
                }}
                className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all ${
                  isActive
                    ? "border-[#D4AF37] bg-white shadow-2xl -translate-y-1"
                    : "border-slate-200 bg-white hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl"
                }`}
              >
                <div className={`grid h-14 w-14 place-items-center rounded-2xl transition-all ${isActive ? "gradient-gold text-[#0B2545]" : "gradient-royal text-[#D4AF37]"}`}>
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-bold text-[#0B2545]">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{c.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#0B2545]">
                  View Options <ChevronDown className={`h-4 w-4 transition-transform ${isActive ? "rotate-180" : ""}`} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Panels */}
      <section id="category-panel" className="mt-16 bg-[#F8F9FA] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {active === "visit" && <VisitVisaPanel />}
          {active === "study" && <StudyVisaPanel />}
          {active === "umrah" && <UmrahPanel />}
          {active === "saudi" && <SaudiPanel />}
        </div>
      </section>
    </motion.div>
  );
}

function ServiceCard({ title, subtitle, service }: { title: string; subtitle?: string; service: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:shadow-xl"
    >
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">{subtitle}</div>
        <h4 className="mt-1 font-serif text-lg font-bold text-[#0B2545]">{title}</h4>
      </div>
      <Link
        to="/contact"
        search={{ service }}
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full gradient-royal px-4 py-2.5 text-xs font-semibold text-white transition-transform group-hover:scale-[1.03]"
      >
        Apply Now <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </motion.div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 first:mt-0">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#0B2545] sm:text-3xl">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
      </div>
      {children}
    </div>
  );
}

function VisitVisaPanel() {
  return (
    <div>
      <Section title="Schengen Visit Visa" subtitle="Access 29 European countries with one visa">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {SCHENGEN_COUNTRIES.map((c) => (
            <ServiceCard key={c} title={c} subtitle="Schengen" service={`Schengen Visit Visa — ${c}`} />
          ))}
        </div>
      </Section>
      <Section title="Global Visit Visa" subtitle="Popular destinations worldwide">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {GLOBAL_COUNTRIES.map((c) => (
            <ServiceCard key={c} title={c} subtitle="Global" service={`Global Visit Visa — ${c}`} />
          ))}
        </div>
      </Section>
      <Section title="Work Permits" subtitle="Employment-based visa programs">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {WORK_PERMIT_COUNTRIES.map((c) => (
            <ServiceCard key={c} title={c} subtitle="Work Permit" service={`Work Permit — ${c}`} />
          ))}
        </div>
      </Section>
    </div>
  );
}

function StudyVisaPanel() {
  return (
    <Section title="Study Visa Destinations" subtitle="Accredited universities & full application support">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {STUDY_COUNTRIES.map((c) => (
          <ServiceCard key={c} title={c} subtitle="Study Visa" service={`Study Visa — ${c}`} />
        ))}
      </div>
    </Section>
  );
}

function UmrahPanel() {
  const plans = [
    {
      name: "1 Month Umrah",
      price: "700",
      unit: "SAR",
      features: [
        "1 Month multiple-entry visa",
        "Umrah eligibility guaranteed",
        "Ziyarat allowed in Makkah & Madinah",
        "Full documentation support",
        "Fast processing (5–7 days)",
      ],
      service: "Umrah Visa — 1 Month (700 SAR)",
    },
    {
      name: "3 Month Umrah",
      price: "1200",
      unit: "SAR",
      featured: true,
      features: [
        "3 Month multiple-entry visa",
        "Extended stay for family Umrah",
        "Ziyarat & Rawdah access support",
        "Full documentation support",
        "Priority processing",
        "Free WhatsApp assistance",
      ],
      service: "Umrah Visa — 3 Month (1200 SAR)",
    },
  ];

  return (
    <Section title="Umrah Visa Packages" subtitle="Blessed journeys, professionally arranged">
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((p) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`relative overflow-hidden rounded-3xl border p-8 shadow-lg ${
              p.featured ? "gradient-royal text-white border-transparent" : "bg-white border-slate-200"
            }`}
          >
            {p.featured && (
              <span className="absolute right-6 top-6 rounded-full gradient-gold px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0B2545]">
                Most Popular
              </span>
            )}
            <div className={`text-xs font-semibold uppercase tracking-widest ${p.featured ? "text-[#D4AF37]" : "text-[#D4AF37]"}`}>
              Umrah Package
            </div>
            <h4 className={`mt-2 font-serif text-2xl font-bold ${p.featured ? "text-white" : "text-[#0B2545]"}`}>
              {p.name}
            </h4>
            <div className="mt-5 flex items-baseline gap-1">
              <span className={`font-serif text-5xl font-bold ${p.featured ? "text-[#D4AF37]" : "text-[#0B2545]"}`}>
                {p.price}
              </span>
              <span className={`text-sm ${p.featured ? "text-white/70" : "text-slate-500"}`}>{p.unit}</span>
            </div>
            <ul className={`mt-6 space-y-3 text-sm ${p.featured ? "text-white/85" : "text-slate-600"}`}>
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              search={{ service: p.service }}
              className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:scale-[1.02] ${
                p.featured ? "gradient-gold text-[#0B2545]" : "gradient-royal text-white"
              }`}
            >
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function SaudiPanel() {
  return (
    <Section title="Saudi Khidmat Services" subtitle="Complete in-country services managed on your behalf">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {SAUDI_SERVICES.map((s) => (
          <ServiceCard key={s} title={s} subtitle="Saudi Khidmat" service={`Saudi Khidmat — ${s}`} />
        ))}
      </div>
    </Section>
  );
}
