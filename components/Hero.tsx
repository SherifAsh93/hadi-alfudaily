"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/60 to-[#0a0a0a]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.img
            src="/logo.jpeg"
            alt="هادي الفضيلي"
            className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full object-cover border-4 border-[#c62828]/50"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          {/* Name */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="text-gradient-gold">{siteConfig.name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            className="text-xl md:text-2xl text-[#a0a0a0] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            مخرج | منتج فيديو | مصمم جرافيكي
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-8 md:gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c62828]">+3</div>
              <div className="text-sm text-[#a0a0a0]">سنوات خبرة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c62828]">+50</div>
              <div className="text-sm text-[#a0a0a0]">مشروع</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#c62828]">+100</div>
              <div className="text-sm text-[#a0a0a0]">عميل</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <button
              onClick={scrollToOrder}
              className="gradient-gold text-white px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity animate-pulse-gold"
            >
              طلب مشروع
            </button>
            <button
              onClick={scrollToPortfolio}
              className="flex items-center justify-center gap-2 border-2 border-[#c62828] text-[#c62828] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#c62828]/10 transition-colors"
            >
              <Play size={20} />
              مشاهدة الأعمال
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={32} className="text-[#c62828]" />
        </motion.div>
      </motion.div>
    </section>
  );
}