"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Film, Users, Star } from "lucide-react";

const stats = [
  { icon: Award, value: 3, suffix: "+", label: "سنوات خبرة", color: "#c62828" },
  { icon: Film, value: 50, suffix: "+", label: "مشروع منجز", color: "#c62828" },
  { icon: Users, value: 100, suffix: "+", label: "عميل سعيد", color: "#c62828" },
  { icon: Star, value: 15, suffix: "M+", label: "مشاهدة", color: "#c62828" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-extrabold text-[#c62828]">
      {count}{suffix}
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 px-4 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c62828] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c62828] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">بالأرقام</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">إنجازات تتحدث عن نفسها</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="text-center p-6 bg-[#141414] rounded-2xl border border-[#2a2a2a] hover:border-[#c62828]/30 transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#c62828]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#c62828]/20 transition-colors">
                  <Icon size={28} className="text-[#c62828]" />
                </div>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="text-[#a0a0a0] mt-2">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
