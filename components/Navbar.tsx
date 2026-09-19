"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { socialLinks } from "@/lib/data";

const navLinks = [
  { href: "#portfolio", label: "الأعمال" },
  { href: "#services", label: "الخدمات" },
  { href: "#about", label: "من أنا" },
  { href: "#order", label: "طلب مشروع" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="هادي الفضيلي" className="w-10 h-10 rounded-full object-cover" />
            <span className="font-bold text-lg text-[#c62828]">هادي الفضيلي</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#a0a0a0] hover:text-[#c62828] transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#a0a0a0] hover:text-[#c62828] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#141414] border-b border-[#2a2a2a]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-[#a0a0a0] hover:text-[#c62828] transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}

              {/* Social links */}
              <div className="flex gap-4 pt-4 border-t border-[#2a2a2a]">
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#c62828]"
                >
                  فيسبوك
                </a>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#c62828]"
                >
                  إنستغرام
                </a>
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a0a0a0] hover:text-[#c62828]"
                >
                  تيك توك
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}