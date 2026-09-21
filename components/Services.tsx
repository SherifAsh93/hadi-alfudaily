"use client";

import { motion } from "framer-motion";
import { Video, Palette, Sparkles, Music, Clapperboard, Layers, ArrowLeft, PenTool } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Video: <Video size={28} />,
  Palette: <Palette size={28} />,
  Sparkles: <Sparkles size={28} />,
  Music: <Music size={28} />,
  Clapperboard: <Clapperboard size={28} />,
  Layers: <Layers size={28} />,
  PenTool: <PenTool size={28} />,
};

export default function Services() {
  return (
    <section className="py-20 px-4 bg-[#141414] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#c62828]/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">ماذا أقدّم</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">خدمات إبداعية متكاملة في صناعة السينما وال泮حتوى البصري</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-8 hover:border-[#c62828]/40 transition-all overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Hover background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c62828]/0 to-[#c62828]/0 group-hover:from-[#c62828]/5 group-hover:to-transparent transition-all" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-xl bg-[#c62828]/10 flex items-center justify-center text-[#c62828] mb-5 group-hover:bg-[#c62828]/20 group-hover:scale-110 transition-all">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#c62828] transition-colors">{service.title}</h3>
                <p className="text-[#a0a0a0] leading-relaxed">{service.description}</p>

                {/* Hover arrow */}
                <div className="mt-4 flex items-center gap-2 text-[#c62828] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">المزيد</span>
                  <ArrowLeft size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
