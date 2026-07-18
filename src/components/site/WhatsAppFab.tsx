import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { waLink } from "@/lib/site-data";

export function WhatsAppFab() {
  return (
    <motion.a
      href={waLink("Hello SHAHID PRIME SERVICES, I have an inquiry.")}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-2xl sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
      style={{
        background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
        boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.7)",
        animation: "pulse-green 2s infinite",
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <style>{`
        @keyframes pulse-green {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
          70% { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}</style>
    </motion.a>
  );
}
