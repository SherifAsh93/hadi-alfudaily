"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { orderCategories, siteConfig } from "@/lib/data";
import { formatWhatsAppMessage } from "@/lib/utils";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save to database
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Error saving order:", error);
    }

    // Open WhatsApp
    const message = formatWhatsAppMessage(formData);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", phone: "", category: "", description: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="order" className="py-20 px-4 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-gold">طلب مشروع</span>
          </h2>
          <p className="text-[#a0a0a0] text-lg">أرسل طلبك وسنتواصل معك خلال 24 ساعة</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isSubmitted ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={64} className="text-[#c62828] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">تم إرسال طلبك بنجاح!</h3>
              <p className="text-[#a0a0a0]">سنتواصل معك قريباً</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#a0a0a0]">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#c62828] focus:outline-none transition-colors"
                  placeholder="أدخل اسمك"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-[#a0a0a0]">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#c62828] focus:outline-none transition-colors"
                  placeholder="+20 xxx xxx xxxx"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2 text-[#a0a0a0]">
                  نوع الطلب *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#c62828] focus:outline-none transition-colors"
                >
                  <option value="">اختر نوع الطلب</option>
                  {orderCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2 text-[#a0a0a0]">
                  وصف المشروع *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#c62828] focus:outline-none transition-colors resize-none"
                  placeholder="اكتب وصفاً مختصراً لمشروعك..."
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-gold text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    إرسال الطلب
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}