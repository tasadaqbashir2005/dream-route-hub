import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BRAND_NAME, CONTACT_ADDRESS, CONTACT_EMAIL, WHATSAPP_DISPLAY, INSTAGRAM_URL, FACEBOOK_URL } from "@/lib/site-data";
import logoAsset from "@/assets/logo-v2.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-20 gradient-royal text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset.url}
              alt={`${BRAND_NAME} logo`}
              className="h-14 w-14 shrink-0 rounded-full object-cover shadow-md ring-2 ring-[#D4AF37]/50 sm:h-16 sm:w-16"
            />
            <div className="min-w-0 leading-tight">
              <div className="font-serif text-base font-bold text-white sm:text-lg">
                {BRAND_NAME}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37]">
                Travel | Visa | Consultancy
              </div>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Trusted visa consultants delivering premium international visa and Saudi Khidmat services with unmatched expertise and personal care.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              aria-label="Instagram — @sshahidprime"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
              aria-label="Facebook — sshahidprime"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-lg text-[#D4AF37]">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-[#D4AF37]">Home</Link></li>
            <li><Link to="/services" className="hover:text-[#D4AF37]">Services</Link></li>
            <li><Link to="/about" className="hover:text-[#D4AF37]">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#D4AF37]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-[#D4AF37]">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>Schengen Visit Visa</li>
            <li>Study Visa</li>
            <li>Umrah Visa</li>
            <li>Saudi Khidmat Services</li>
            <li>Airline Ticketing</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-[#D4AF37]">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 text-[#D4AF37]" /> {WHATSAPP_DISPLAY}</li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-[#D4AF37]" /> {CONTACT_EMAIL}</li>
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-[#D4AF37]" /> {CONTACT_ADDRESS}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="hover:text-[#D4AF37]">Terms &amp; Conditions</Link>
            <Link to="/privacy" className="hover:text-[#D4AF37]">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
