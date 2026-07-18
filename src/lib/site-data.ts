export const WHATSAPP_NUMBER = "923114811886";
export const WHATSAPP_DISPLAY = "03114811886";
export const CONTACT_EMAIL = "info@shahidprimeservices.com";
export const CONTACT_ADDRESS = "Islamabad, Pakistan";
export const BRAND_NAME = "SHAHID PRIME SERVICES";

export const waLink = (text?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const SCHENGEN_COUNTRIES = [
  "Italy", "Germany", "Netherlands", "Switzerland", "Czech Republic", "Spain", "Portugal",
];
export const GLOBAL_COUNTRIES = [
  "USA", "UK", "Australia", "Japan", "Canada", "New Zealand", "Albania",
];
export const WORK_PERMIT_COUNTRIES = ["Portugal", "Albania", "Bulgaria"];
export const STUDY_COUNTRIES = [
  "Hungary", "Italy", "Bulgaria", "Romania", "Slovenia", "Slovakia", "Germany", "France",
];
export const SAUDI_SERVICES = [
  "Wakala", "Agency Services", "Naqal Kafala", "Azad Visa", "Amal Manzali", "Saie Khas",
];

export const ALL_SERVICES: string[] = [
  ...SCHENGEN_COUNTRIES.map((c) => `Schengen Visit Visa — ${c}`),
  ...GLOBAL_COUNTRIES.map((c) => `Global Visit Visa — ${c}`),
  ...WORK_PERMIT_COUNTRIES.map((c) => `Work Permit — ${c}`),
  ...STUDY_COUNTRIES.map((c) => `Study Visa — ${c}`),
  "Umrah Visa — 1 Month (700 SAR)",
  "Umrah Visa — 3 Month (1200 SAR)",
  ...SAUDI_SERVICES.map((s) => `Saudi Khidmat — ${s}`),
];
