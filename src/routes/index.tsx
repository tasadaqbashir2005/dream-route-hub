import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  Plane,
  GraduationCap,
  Moon,
  Building2,
  Ticket,
  ShieldCheck,
  FileText,
  BadgeCheck,
  Star,
  Quote,
} from "lucide-react";
import { waLink } from "@/lib/site-data";
import logoAsset from "@/assets/logo-v2.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHAHID PRIME SERVICES — Visa, Umrah, Saudi Khidmat & Airline Tickets" },
      { name: "description", content: "Trusted travel agency for Schengen, Study & Umrah visas, Saudi Khidmat (Wakala, Kafala, Azad Visa) and airline ticketing. 99.9% success • 15+ years • 52+ countries." },
      { name: "keywords", content: "visa consultancy Pakistan, Schengen visa, Umrah visa, study visa Europe, Saudi Khidmat, Wakala, Kafala, Azad visa, airline tickets, SHAHID PRIME SERVICES" },
      { property: "og:title", content: "SHAHID PRIME SERVICES — Visa, Umrah, Saudi Khidmat & Airline Tickets" },
      { property: "og:description", content: "Trusted travel agency for Schengen, Study & Umrah visas, Saudi Khidmat (Wakala, Kafala, Azad Visa) and airline ticketing. 99.9% success • 15+ years • 52+ countries." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        name: "SHAHID PRIME SERVICES",
        description: "International visa consultancy, Umrah packages, Saudi Khidmat services and airline ticketing.",
        areaServed: "Worldwide",
        address: { "@type": "PostalAddress", addressCountry: "SA", addressLocality: "Jeddah" },
        telephone: "+966592119762",
        email: "info@shahidprimeservices.com",
      }),
    }],
  }),
  component: HomePage,
});

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  const formatted = decimals > 0
    ? n.toFixed(decimals)
    : Math.floor(n).toLocaleString();
  return <span ref={ref}>{formatted}{suffix}</span>;
}


const services = [
  { icon: Plane, title: "Visit Visa", desc: "Schengen, UK, USA, Canada, Australia and more.", href: "/services/visit-visa" as const },
  { icon: GraduationCap, title: "Study Visa", desc: "Europe universities — Hungary, Germany, France, Italy.", href: "/services/study-visa" as const },
  { icon: Moon, title: "Umrah Visa", desc: "1 & 3 month Umrah packages with full support.", href: "/services/umrah" as const },
  { icon: Building2, title: "Saudi Khidmat", desc: "Wakala, Kafala, Azad Visa, Amal Manzali & more.", href: "/services/saudi-khidmat" as const },
  { icon: Ticket, title: "Airline Ticketing", desc: "International & domestic flights at discounted prices.", href: "/services/airline-ticketing" as const },
];


const steps = [
  { icon: MessageCircle, title: "Consultation", desc: "Free WhatsApp consultation to understand your goals & eligibility." },
  { icon: FileText, title: "Documentation", desc: "We prepare and vet every document to embassy standards." },
  { icon: BadgeCheck, title: "Visa Approval", desc: "Track your file until stamped — delivered to your doorstep." },
];

const testimonials = [
  { name: "Ahmed R.", role: "Schengen Visa — Italy", text: "Impeccable service. My Schengen visa was approved without a single hiccup. Highly professional team." },
  { name: "Sana K.", role: "Study Visa — Germany", text: "They guided me through every step of the German study visa process. I owe my new life to them." },
  { name: "Bilal M.", role: "Umrah — 3 Month", text: "Booked my Umrah with SHAHID PRIME. Everything was arranged flawlessly. May Allah bless the team." },
  { name: "Fatima J.", role: "Saudi Khidmat — Kafala", text: "Handled my Naqal Kafala remotely from Pakistan. Fast, transparent, and reliable service." },
];

function HomePage() {
  const [tIndex, setTIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={bannerAsset.url}
            alt="SHAHID PRIME SERVICES — Your Journey, Our Priority"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B2545]/85 via-[#0B2545]/60 to-[#0B2545]/40" />
        </div>

        <div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#D4AF37] backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-[#D4AF37]" /> Trusted Since 2015
            </span>
            <h1 className="mt-6 font-serif text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Your Trusted Partner for{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] to-[#F4D06F] bg-clip-text text-transparent">
                International Visas
              </span>{" "}
              & Saudi Services
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              From Schengen and study visas to Umrah and Saudi Khidmat — we handle every step with white-glove precision, so you can travel with confidence.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-full gradient-gold px-7 py-4 text-sm font-semibold text-[#0B2545] shadow-xl transition-transform hover:scale-[1.03]"
              >
                Apply Now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href={waLink("Hello, I'd like to inquire about your visa services.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-16 px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 shadow-2xl md:grid-cols-4">
            {[
              { n: 257987, s: "+", label: "Happy Clients" },
              { n: 99.9, s: "%", label: "Visa Success Rate", d: 1 },
              { n: 52, s: "+", label: "Countries Served" },
              { n: 15, s: "+", label: "Years of Experience" },
            ].map((it) => (
              <div key={it.label} className="text-center">
                <div className="font-serif text-3xl font-bold text-[#0B2545] sm:text-4xl md:text-5xl">
                  <Counter to={it.n} suffix={it.s} decimals={it.d ?? 0} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-slate-500 sm:text-sm">{it.label}</div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* SERVICE PREVIEW */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Our Services</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#0B2545] sm:text-4xl md:text-5xl">
              Premium Services, Tailored For You
            </h2>
            <p className="mt-4 text-slate-500">
              Four flagship service lines built on years of embassy-level expertise.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={s.href}
                  className="group block h-full rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-xl"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-royal text-[#D4AF37] shadow-md transition-transform group-hover:scale-110">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold text-[#0B2545]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0B2545] group-hover:text-[#D4AF37]">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#F8F9FA] px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">The Process</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#0B2545] sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="mt-4 text-slate-500">Three simple steps from first call to visa in hand.</p>
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-3">
            <div className="pointer-events-none absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent md:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full gradient-royal text-white shadow-lg ring-8 ring-[#F8F9FA]">
                  <step.icon className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">Step {i + 1}</div>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#0B2545]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Testimonials</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-[#0B2545] sm:text-4xl md:text-5xl">
              Words from Our Travelers
            </h2>
          </div>

          <div className="relative mt-14 h-64 sm:h-56">
            {testimonials.map((t, i) => (
              <motion.article
                key={t.name}
                initial={false}
                animate={{ opacity: tIndex === i ? 1 : 0, y: tIndex === i ? 0 : 24 }}
                transition={{ duration: 0.6 }}
                className={`absolute inset-0 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg sm:p-10 ${tIndex === i ? "" : "pointer-events-none"}`}
              >
                <Quote className="h-8 w-8 text-[#D4AF37]" />
                <p className="mt-4 font-serif text-lg leading-relaxed text-slate-700 sm:text-xl">
                  "{t.text}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full gradient-royal text-sm font-bold text-[#D4AF37]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2545]">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIndex(i)}
                className={`h-2 rounded-full transition-all ${tIndex === i ? "w-8 bg-[#D4AF37]" : "w-2 bg-slate-300"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] gradient-royal p-10 shadow-2xl sm:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1.5fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">100% Confidential</span>
              </div>
              <h3 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
                Ready to start your journey?
              </h3>
              <p className="mt-3 max-w-xl text-white/70">
                Get a free eligibility check today. Our consultants respond within minutes on WhatsApp.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-[#0B2545] shadow-lg hover:scale-[1.03] transition-transform"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={waLink("Hi, I'd like a free eligibility check.")}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
