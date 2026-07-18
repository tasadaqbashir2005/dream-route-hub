import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BRAND_NAME, CONTACT_ADDRESS, CONTACT_EMAIL, WHATSAPP_DISPLAY, INSTAGRAM_URL, FACEBOOK_URL } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-20 gradient-royal text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-[#0B2545]">
              <span className="font-serif text-lg font-bold">S</span>
            </div>
            <div className="font-serif text-base font-bold">{BRAND_NAME}</div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Trusted visa consultants delivering premium international visa and Saudi Khidmat services with unmatched expertise and personal care.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-[#D4AF37] hover:text-[#D4AF37]"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
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
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
          <p>Crafted with excellence for global travelers.</p>
        </div>
      </div>
    </footer>
  );
}
