"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink, X } from "lucide-react";
import { categories } from "@/lib/data";
import { getYouTubeEmbedUrl } from "@/lib/utils";

interface PortfolioItem {
  id: number;
  title: string;
  description: string | null;
  type: string;
  url: string;
  category: string;
}

interface PortfolioProps {
  items: PortfolioItem[];
}

export default function Portfolio({ items }: PortfolioProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 px-4 bg-[#141414]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">أعمالي</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">مجموعة مختارة من أحدث المشاريع</p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? "gradient-gold text-[#0a0a0a]"
                  : "bg-[#1e1e1e] text-[#a0a0a0] hover:text-[#d4a853] border border-[#2a2a2a]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl overflow-hidden cursor-pointer hover:border-[#d4a853]/50 transition-colors"
                onClick={() => setSelectedItem(item)}
              >
                {/* Thumbnail */}
                <div className="aspect-video relative overflow-hidden">
                  {item.type === "video" ? (
                    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center">
                      <img
                        src={`https://img.youtube.com/vi/${item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/)?.[1] || ""}/mqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Play size={48} className="text-[#d4a853]" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* View button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[#d4a853] text-[#0a0a0a] px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                      <ExternalLink size={16} />
                      عرض
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-[#a0a0a0] text-sm line-clamp-2">{item.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-[#a0a0a0] text-lg">لا توجد أعمال في هذا التصنيف</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-[#141414] rounded-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 left-4 z-10 bg-[#0a0a0a]/80 text-white p-2 rounded-full hover:bg-[#d4a853] hover:text-[#0a0a0a] transition-colors"
              >
                <X size={24} />
              </button>

              {selectedItem.type === "video" ? (
                <div className="aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedItem.url)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full"
                />
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                {selectedItem.description && (
                  <p className="text-[#a0a0a0]">{selectedItem.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}