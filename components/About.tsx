"use client";

import { motion } from "framer-motion";
import { Award, Film, Users } from "lucide-react";
import { aboutText } from "@/lib/data";

export default function About() {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient-gold">من أنا</span>
            </h2>
            <p className="text-[#a0a0a0] text-lg leading-relaxed mb-8">
              {aboutText.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                className="text-center p-4 bg-[#141414] rounded-xl border border-[#2a2a2a]"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="w-8 h-8 text-[#c62828] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#c62828]">{aboutText.experience}</div>
                <div className="text-sm text-[#a0a0a0]">سنوات خبرة</div>
              </motion.div>

              <motion.div
                className="text-center p-4 bg-[#141414] rounded-xl border border-[#2a2a2a]"
                whileHover={{ scale: 1.05 }}
              >
                <Film className="w-8 h-8 text-[#c62828] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#c62828]">{aboutText.projects}</div>
                <div className="text-sm text-[#a0a0a0]">مشروع</div>
              </motion.div>

              <motion.div
                className="text-center p-4 bg-[#141414] rounded-xl border border-[#2a2a2a]"
                whileHover={{ scale: 1.05 }}
              >
                <Users className="w-8 h-8 text-[#c62828] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#c62828]">{aboutText.clients}</div>
                <div className="text-sm text-[#a0a0a0]">عميل</div>
              </motion.div>
            </div>
          </motion.div>

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
              className="absolute -bottom-4 -right-4 bg-[#c62828] text-white px-6 py-3 rounded-xl font-bold"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              مخرج سينمائي
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}