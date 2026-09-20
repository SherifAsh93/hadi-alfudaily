"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ExternalLink, Loader2, X, Image as ImageIcon, Film } from "lucide-react";

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
  const [success, setSuccess] = useState(false);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setItems(data.data || []);
    } catch {} finally { setLoading(false); }
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
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        fetchItems();
      }
    } catch {} finally { setSubmitting(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("هل أنت متأكد من حذف هذا العمل؟")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) fetchItems();
    } catch {}
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
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-gradient-gold">إدارة الأعمال</span>
          </h1>
          <p className="text-[#a0a0a0] text-sm mt-1">{items.length} عمل في المعرض</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 gradient-gold text-white px-5 py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? "إلغاء" : "إضافة عمل"}
        </button>
      </div>

      {/* Success message */}
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6 text-green-400 text-center">
          تمت إضافة العمل بنجاح!
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-[#141414] border border-[#c62828]/30 rounded-xl p-6 mb-8 animate-fade-in">
          <h2 className="text-lg font-bold mb-5 text-white">إضافة عمل جديد</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">عنوان العمل *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:border-[#c62828] focus:outline-none transition-colors"
                  placeholder="مثال: فيديو إعلاني لشركة X" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">النوع *</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:border-[#c62828] focus:outline-none transition-colors">
                  <option value="video">فيديو</option>
                  <option value="image">صورة / تصميم</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">التصنيف *</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:border-[#c62828] focus:outline-none transition-colors">
                  <option value="video">فيديوهات</option>
                  <option value="image">تصاميم</option>
                  <option value="music-video">فيديو كليب</option>
                  <option value="ad">إعلان</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">الترتيب (الأعلى = يظهر أولاً)</label>
                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:border-[#c62828] focus:outline-none transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                {formData.type === "video" ? "رابط يوتيوب أو Vimeo *" : "رابط الصورة *"}
              </label>
              <input type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} required
                className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:border-[#c62828] focus:outline-none transition-colors"
                placeholder={formData.type === "video" ? "https://youtube.com/watch?v=..." : "https://example.com/image.jpg"} />
              <p className="text-xs text-[#666] mt-1">
                {formData.type === "video" ? "الصغط رابط الفيديو من يوتيوب أو فيميو" : "ضع رابط الصورة من الإنترنت"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">الوصف (اختياري)</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={2}
                className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-2.5 text-white focus:border-[#c62828] focus:outline-none transition-colors resize-none"
                placeholder="وصف مختصر للعمل..." />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={submitting}
                className="flex items-center gap-2 gradient-gold text-white px-6 py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
                {submitting ? <><Loader2 size={16} className="animate-spin" />جاري الحفظ...</> : "حفظ العمل"}
              </button>
              <button type="button" onClick={() => setShowForm(false)}
                className="px-6 py-2.5 rounded-lg border border-[#2a2a2a] text-[#a0a0a0] hover:text-white hover:border-[#444] transition-colors">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Portfolio list */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="text-center py-16 bg-[#141414] border border-dashed border-[#2a2a2a] rounded-xl">
            <ImageIcon size={48} className="text-[#333] mx-auto mb-4" />
            <p className="text-[#a0a0a0] text-lg mb-2">لا توجد أعمال بعد</p>
            <p className="text-[#666] text-sm mb-4">ابدأ بإضافة أول عمل لمعرضك</p>
            <button onClick={() => setShowForm(true)} className="gradient-gold text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity">
              <Plus size={16} className="inline ml-2" />
              أضف أول عمل
            </button>
          </div>
        ) : (
          items.map((item, index) => (
            <div key={item.id}
              className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-4 hover:border-[#c62828]/30 transition-all group">
              {/* Order number */}
              <div className="text-[#333] text-sm font-bold w-6 text-center">
                {index + 1}
              </div>

              {/* Thumbnail */}
              <div className="w-24 h-16 bg-[#1e1e1e] rounded-lg overflow-hidden flex-shrink-0">
                {item.type === "video" ? (
                  <div className="w-full h-full relative">
                    <img
                      src={`https://img.youtube.com/vi/${item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=))([^"&?\/\s]{11})/)?.[1] || ""}/mqdefault.jpg`}
                      alt={item.title} className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <Film size={16} className="text-white/80" />
                    </div>
                  </div>
                ) : (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white truncate">{item.title}</div>
                <div className="text-sm text-[#a0a0a0] flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-[#1e1e1e] rounded text-xs">
                    {item.type === "video" ? "فيديو" : "صورة"}
                  </span>
                  <span>{item.category}</span>
                  {item.order !== null && item.order > 0 && (
                    <span className="text-[#666]">#{item.order}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="p-2 text-[#a0a0a0] hover:text-[#c62828] rounded-lg hover:bg-[#1e1e1e] transition-colors" title="فتح">
                  <ExternalLink size={16} />
                </a>
                <button onClick={() => handleDelete(item.id)}
                  className="p-2 text-[#a0a0a0] hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-colors" title="حذف">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
