import { createFileRoute, useSearch } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import jsPDF from "jspdf";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { ALL_SERVICES, BRAND_NAME, CONTACT_ADDRESS, CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, waLink } from "@/lib/site-data";

const searchSchema = z.object({
  service: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Contact — SHAHID PRIME SERVICES" },
      { name: "description", content: "Speak with a visa consultant today. Fill our secure form to auto-generate an application PDF and start a WhatsApp conversation instantly." },
      { property: "og:title", content: "Contact SHAHID PRIME SERVICES" },
      { property: "og:description", content: "Auto-generate your application PDF and chat with us on WhatsApp." },
    ],
  }),
  component: ContactPage,
});

const formSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  country: z.string().trim().min(2, "Enter your country").max(60),
  location: z.string().trim().min(2, "Enter your current location").max(100),
  service: z.string().trim().min(2, "Select a service").max(120),
  message: z.string().trim().max(1000).optional().default(""),
});

type FormData = z.infer<typeof formSchema>;

function ContactPage() {
  const search = useSearch({ from: "/contact" });
  const [form, setForm] = useState<FormData>({
    fullName: "",
    phone: "",
    country: "",
    location: "",
    service: search.service ?? "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const generatePDF = (data: FormData) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const w = doc.internal.pageSize.getWidth();
    const h = doc.internal.pageSize.getHeight();

    // Header band
    doc.setFillColor(11, 37, 69);
    doc.rect(0, 0, w, 110, "F");
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 110, w, 4, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(BRAND_NAME, 40, 55);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(212, 175, 55);
    doc.text("International Visa & Saudi Khidmat Services", 40, 76);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(`WhatsApp: ${WHATSAPP_DISPLAY}   |   ${CONTACT_EMAIL}`, 40, 95);

    // Title
    doc.setTextColor(11, 37, 69);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Client Application Summary", 40, 155);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(1);
    doc.line(40, 165, w - 40, 165);

    // Date/ref
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    const ref = `SPS-${Date.now().toString().slice(-8)}`;
    doc.text(`Reference: ${ref}`, 40, 185);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, w - 40, 185, { align: "right" });

    // Fields
    const rows: [string, string][] = [
      ["Full Name", data.fullName],
      ["Phone Number", data.phone],
      ["Country", data.country],
      ["Current Location", data.location],
      ["Requested Service", data.service],
    ];

    let y = 220;
    rows.forEach(([label, value], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(248, 249, 250);
        doc.rect(40, y - 16, w - 80, 32, "F");
      }
      doc.setFont("helvetica", "bold");
      doc.setTextColor(11, 37, 69);
      doc.setFontSize(10);
      doc.text(label.toUpperCase(), 52, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(12);
      doc.text(value || "-", w - 52, y, { align: "right" });
      y += 32;
    });

    // Message
    y += 20;
    doc.setFont("helvetica", "bold");
    doc.setTextColor(11, 37, 69);
    doc.setFontSize(12);
    doc.text("Client Message", 40, y);
    y += 12;
    doc.setDrawColor(212, 175, 55);
    doc.line(40, y, 140, y);
    y += 20;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(11);
    const msg = data.message?.trim() || "No additional message provided.";
    const lines = doc.splitTextToSize(msg, w - 80);
    doc.text(lines, 40, y);

    // Footer
    doc.setFillColor(11, 37, 69);
    doc.rect(0, h - 60, w, 60, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9);
    doc.text(`© ${new Date().getFullYear()} ${BRAND_NAME} — ${CONTACT_ADDRESS}`, 40, h - 35);
    doc.setTextColor(212, 175, 55);
    doc.text("Thank you for choosing us. Our team will contact you shortly.", 40, h - 18);

    doc.save(`${BRAND_NAME.replace(/\s+/g, "_")}_${ref}.pdf`);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = formSchema.safeParse(form);
    if (!parsed.success) {
      const errs: Partial<Record<keyof FormData, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const key = iss.path[0] as keyof FormData;
        if (!errs[key]) errs[key] = iss.message;
      });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      generatePDF(parsed.data);
      const text = `Hello, I am ${parsed.data.fullName}. I am interested in ${parsed.data.service}. My location is ${parsed.data.location}. Please see my attached PDF application.`;
      window.open(waLink(text), "_blank", "noopener,noreferrer");
      setDone(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="pt-32">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37]">Get in Touch</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-[#0B2545] sm:text-5xl md:text-6xl">
            Let's plan your next journey
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Fill the form to auto-generate your application PDF and start a WhatsApp conversation with our consultants instantly.
          </p>
        </div>
      </section>

      <section className="mt-14 px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1.4fr]">
          {/* Left - contact info */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-3xl gradient-royal p-8 text-white shadow-xl">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#D4AF37]/20 blur-3xl" />
              <h3 className="font-serif text-2xl font-bold">Contact Details</h3>
              <p className="mt-2 text-sm text-white/70">Reach us any time. We reply on WhatsApp within minutes.</p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-gold text-[#0B2545]"><Phone className="h-4 w-4" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37]">Phone / WhatsApp</div>
                    <a href={`tel:+${WHATSAPP_NUMBER}`} className="mt-0.5 block font-semibold">{WHATSAPP_DISPLAY}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-gold text-[#0B2545]"><Mail className="h-4 w-4" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37]">Email</div>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="mt-0.5 block font-semibold break-all">{CONTACT_EMAIL}</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full gradient-gold text-[#0B2545]"><MapPin className="h-4 w-4" /></div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37]">Office</div>
                    <div className="mt-0.5 font-semibold">{CONTACT_ADDRESS}</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h4 className="font-serif text-lg font-bold text-[#0B2545]">What happens next?</h4>
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-gold text-xs font-bold text-[#0B2545]">1</span> Submit the form — a branded PDF downloads to your device.</li>
                <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-gold text-xs font-bold text-[#0B2545]">2</span> WhatsApp opens with a pre-filled introduction.</li>
                <li className="flex gap-3"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full gradient-gold text-xs font-bold text-[#0B2545]">3</span> Attach the PDF & send. A consultant replies quickly.</li>
              </ol>
            </div>
          </div>

          {/* Right - form */}
          <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">
            {done && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                <div>
                  <div className="font-semibold">PDF downloaded & WhatsApp opened!</div>
                  <div className="mt-0.5 text-emerald-700/80">Attach the downloaded PDF in WhatsApp to complete your application.</div>
                </div>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full Name" error={errors.fullName}>
                <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Muhammad Ahmed" className={inputCls} />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+92 300 0000000" className={inputCls} />
              </Field>
              <Field label="Country" error={errors.country}>
                <input value={form.country} onChange={(e) => update("country", e.target.value)} placeholder="Pakistan" className={inputCls} />
              </Field>
              <Field label="Current Location" error={errors.location}>
                <input value={form.location} onChange={(e) => update("location", e.target.value)} placeholder="Islamabad" className={inputCls} />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Select Service" error={errors.service}>
                  <select value={form.service} onChange={(e) => update("service", e.target.value)} className={inputCls}>
                    <option value="">— Choose a service —</option>
                    {ALL_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Message (optional)" error={errors.message}>
                  <textarea rows={4} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="Tell us about your travel plans, timeline, and any questions..." className={`${inputCls} resize-none`} />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-royal px-6 py-4 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? "Preparing your application..." : "Generate PDF & Send on WhatsApp"}
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              Your details are used only to prepare your application. We respect your privacy.
            </p>
          </form>
        </div>
      </section>
    </motion.div>
  );
}

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-600">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
