"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/data";

export default function CtaBanner() {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-gold opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c62828]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c62828]/50 to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            <span className="text-gradient-gold">جاهز لتحويل فكرتك</span>
            <br />
            <span className="text-white">لمحتوى بصري مبهر؟</span>
          </h2>

          <p className="text-[#a0a0a0] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            تواصل معي الآن ودعنا نبدأ رحلة صناعة محتوى يتحدث بلغة الإبداع والاحترافية
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={scrollToOrder}
              className="gradient-gold text-white px-10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              ابدأ مشروعك الآن
              <ArrowLeft size={20} />
            </motion.button>
            <motion.a
              href={`https://wa.me/${siteConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#20bd5a] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={20} />
              واتساب مباشر
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
