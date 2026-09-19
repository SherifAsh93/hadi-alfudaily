"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  description: string | null;
  type: string;
  url: string;
  category: string;
  order: number | null;
}

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video",
    url: "",
    category: "video",
    order: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setItems(data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ title: "", description: "", type: "video", url: "", category: "video", order: 0 });
        fetchItems();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا العمل؟")) return;

    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-[#c62828]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-gradient-gold">إدارة الأعمال</span>
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 gradient-gold text-[#0a0a0a] px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          إضافة عمل جديد
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">إضافة عمل جديد</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">العنوان *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:border-[#c62828] focus:outline-none"
                  placeholder="عنوان العمل"
                />
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">النوع *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:border-[#c62828] focus:outline-none"
                >
                  <option value="video">فيديو</option>
                  <option value="image">صورة</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">التصنيف *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:border-[#c62828] focus:outline-none"
                >
                  <option value="video">فيديوهات</option>
                  <option value="image">تصاميم</option>
                  <option value="music-video">فيديو كليب</option>
                  <option value="ad">إعلان</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-[#a0a0a0] mb-1">الترتيب</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:border-[#c62828] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#a0a0a0] mb-1">
                {formData.type === "video" ? "رابط يوتيوب/Vimeo *" : "رابط الصورة *"}
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:border-[#c62828] focus:outline-none"
                placeholder={formData.type === "video" ? "https://youtube.com/watch?v=..." : "https://example.com/image.jpg"}
              />
            </div>

            <div>
              <label className="block text-sm text-[#a0a0a0] mb-1">الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white focus:border-[#c62828] focus:outline-none resize-none"
                placeholder="وصف اختياري..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 gradient-gold text-[#0a0a0a] px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ"
                )}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 rounded-lg border border-[#2a2a2a] text-[#a0a0a0] hover:text-white transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Portfolio list */}
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-16 bg-[#141414] border border-[#2a2a2a] rounded-xl">
            <p className="text-[#a0a0a0] text-lg">لا توجد أعمال بعد</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 text-[#c62828] hover:underline"
            >
              أضف أول عمل
            </button>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4 hover:border-[#c62828]/30 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-20 h-14 bg-[#1e1e1e] rounded-lg overflow-hidden flex-shrink-0">
                {item.type === "video" ? (
                  <img
                    src={`https://img.youtube.com/vi/${item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/)?.[1] || ""}/mqdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.jpg";
                    }}
                  />
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.jpg";
                    }}
                  />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white truncate">{item.title}</div>
                <div className="text-sm text-[#a0a0a0]">
                  {item.type === "video" ? "فيديو" : "صورة"} • {item.category}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[#a0a0a0] hover:text-[#c62828] transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-[#a0a0a0] hover:text-red-500 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}