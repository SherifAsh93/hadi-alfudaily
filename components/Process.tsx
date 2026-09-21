"use client";

import { motion } from "framer-motion";
import { MessageSquare, PenTool, Video, CheckCircle, Lightbulb, Clapperboard } from "lucide-react";
import { processSteps } from "@/lib/data";

const stepIcons = [Lightbulb, PenTool, Clapperboard, Video, CheckCircle, MessageSquare];

export default function Process() {
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
            <span className="text-gradient-gold">كيف أعمل</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">من الفكرة إلى النسخة النهائية - رحلة إبداعية متكاملة</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-16 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#c62828]/0 via-[#c62828]/50 to-[#c62828]/0" />

          {processSteps.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Step circle */}
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="absolute inset-0 rounded-full bg-[#c62828]/10 border-2 border-[#c62828]/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={32} className="text-[#c62828]" />
                  </div>
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 gradient-gold rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                </motion.div>

                <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-[#a0a0a0] text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
