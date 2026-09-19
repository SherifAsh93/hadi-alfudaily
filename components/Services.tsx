"use client";

import { motion } from "framer-motion";
import { Video, Palette, Sparkles, Music, Clapperboard, Layers } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Video: <Video size={32} />,
  Palette: <Palette size={32} />,
  Sparkles: <Sparkles size={32} />,
  Music: <Music size={32} />,
  Clapperboard: <Clapperboard size={32} />,
  Layers: <Layers size={32} />,
};

export default function Services() {
  return (
    <section className="py-20 px-4 bg-[#141414]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">خدماتي</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">خدمات إنتاجية متكاملة بأعلى مستوى من الجودة</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c62828]/50 transition-colors group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-lg bg-[#c62828]/10 flex items-center justify-center text-[#c62828] mb-4 group-hover:bg-[#c62828]/20 transition-colors">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#ffffff]">{service.title}</h3>
              <p className="text-[#a0a0a0]">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}