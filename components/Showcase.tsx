"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { showcaseProjects, socialLinks } from "@/lib/data";

export default function Showcase() {
  return (
    <section className="py-20 px-4 bg-[#141414] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#c62828]/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">أبرز الأعمال</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">من إنتاج هادي الفضيلي</p>
        </motion.div>

        <div className="space-y-8">
          {showcaseProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl overflow-hidden hover:border-[#c62828]/30 transition-all"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -3 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Project Image */}
                <div className="md:w-2/5 aspect-[3/4] md:aspect-auto relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1e1e1e]/50 hidden md:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] to-transparent md:hidden" />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-[#c62828] bg-[#c62828]/10 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs text-[#666]">|</span>
                    <span className="text-xs text-[#666]">{project.stats}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-[#c62828] font-medium mb-4">{project.subtitle}</p>
                  <p className="text-[#a0a0a0] leading-relaxed">{project.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More work CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c62828] font-medium hover:underline"
          >
            <Sparkles size={18} />
            مشاهدة المزيد على صفحتنا
          </a>
        </motion.div>
      </div>
    </section>
  );
}
