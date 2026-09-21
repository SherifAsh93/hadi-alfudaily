"use client";

import { motion } from "framer-motion";
import { ChevronDown, Play, Camera, Film, Clapperboard } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/40 to-[#0a0a0a]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/60" />

      {/* Animated red accent lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c62828] to-transparent opacity-40" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c62828]/30 to-transparent" />

      {/* Floating icons */}
      <motion.div
        className="absolute top-24 right-12 text-[#c62828]/20 hidden lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Camera size={60} />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-12 text-[#c62828]/20 hidden lg:block"
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      >
        <Film size={50} />
      </motion.div>
      <motion.div
        className="absolute top-40 left-1/4 text-[#c62828]/10 hidden lg:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        <Clapperboard size={40} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-[#c62828]/10 border border-[#c62828]/30 rounded-full px-5 py-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-[#c62828] rounded-full animate-pulse" />
            <span className="text-[#c62828] text-sm font-medium">AI Film Director & Writer</span>
          </motion.div>

          {/* Logo */}
          <motion.div
            className="relative inline-block mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
          >
            <div className="relative">
              <motion.img
                src="/logo.jpeg"
                alt="هادي الفضيلي"
                className="w-36 h-36 md:w-44 md:h-44 mx-auto rounded-full object-cover border-[3px] border-[#c62828]/50"
                whileHover={{ scale: 1.05 }}
              />
              <div className="absolute inset-0 rounded-full bg-[#c62828]/10 animate-pulse" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-gradient-gold">{siteConfig.name}</span>
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-transparent via-[#c62828] to-transparent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />

          {/* Title */}
          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-[#a0a0a0] mb-4 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            مؤلف ومخرج سينمائي في مجال السينما الافتراضية
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-lg text-[#666] mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            أتعامل مع الذكاء الاصطناعي كأداة لصناعة السينما، وليس كبديل عن الرؤية الإخراجية
          </motion.p>

          {/* Stats row */}
          <motion.div
            className="flex justify-center gap-6 md:gap-12 mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            {[
              { value: "+3", label: "سنوات خبرة" },
              { value: "+50", label: "مشروع منجز" },
              { value: "+100", label: "عميل سعيد" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#c62828]">{stat.value}</div>
                <div className="text-xs md:text-sm text-[#808080] mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <motion.button
              onClick={scrollToOrder}
              className="gradient-gold text-white px-10 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity animate-pulse-gold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              طلب مشروع
            </motion.button>
            <motion.button
              onClick={scrollToPortfolio}
              className="flex items-center justify-center gap-2 border-2 border-[#c62828] text-[#c62828] px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#c62828]/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play size={20} />
              مشاهدة الأعمال
            </motion.button>
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
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#666]">اكتشف المزيد</span>
          <ChevronDown size={24} className="text-[#c62828]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
