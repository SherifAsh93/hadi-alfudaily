"use client";

import { motion } from "framer-motion";
import { Award, Film, Users, Play, Sparkles, Zap } from "lucide-react";
import { aboutText, socialLinks } from "@/lib/data";

export default function About() {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">من أنا</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">تعرّف عليّ أكثر</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#c62828]/30">
              <img
                src="/hero.jpg"
                alt="هادي الفضيلي"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 gradient-gold text-white px-6 py-3 rounded-xl font-bold shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              مخرج سينمائي بالذكاء الاصطناعي
            </motion.div>

            {/* Floating mini cards */}
            <motion.div
              className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 flex items-center gap-2 border border-[#c62828]/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              animate={{ y: [0, -5, 0] }}
            >
              <Sparkles size={18} className="text-[#c62828]" />
              <span className="text-sm font-medium text-white">ذكاء اصطناعي</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 -left-6 glass rounded-xl px-4 py-3 flex items-center gap-2 border border-[#c62828]/20 hidden lg:flex"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              animate={{ y: [0, 5, 0] }}
            >
              <Zap size={18} className="text-[#c62828]" />
              <span className="text-sm font-medium text-white">+50 مشروع</span>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              مؤلف ومخرج سينمائي<br />
              <span className="text-gradient-gold">متخصص في السينما الافتراضية</span>
            </h3>

            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-4">
              {aboutText.bio}
            </p>
            <p className="text-[#a0a0a0] text-base leading-relaxed mb-4">
              {aboutText.bioExtra}
            </p>
            <p className="text-[#a0a0a0] text-base leading-relaxed mb-4">
              {aboutText.bioExtra2}
            </p>
            <p className="text-[#a0a0a0] text-base leading-relaxed mb-8">
              {aboutText.bioExtra3}
            </p>

            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Play, text: "المَرَدَة - فيلم سينمائي سوداني" },
                { icon: Film, text: "قاش مان - أول سوبر هيرو عربي" },
                { icon: Sparkles, text: "متخصص بالذكاء الاصطناعي" },
                { icon: Award, text: "خبرة +3 سنوات" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2 text-sm text-[#a0a0a0]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Icon size={16} className="text-[#c62828] shrink-0" />
                    <span>{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: aboutText.experience, label: "سنوات خبرة" },
                { value: aboutText.projects, label: "مشروع" },
                { value: aboutText.clients, label: "عميل" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-4 bg-[#141414] rounded-xl border border-[#2a2a2a]"
                  whileHover={{ scale: 1.05, borderColor: "rgba(198,40,40,0.3)" }}
                >
                  <div className="text-2xl font-bold text-[#c62828]">{stat.value}</div>
                  <div className="text-sm text-[#a0a0a0]">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Social CTA */}
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gradient-gold text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              تواصل معي
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
