"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, Loader2, CheckCircle, Clock, ShoppingCart } from "lucide-react";

interface Order {
  id: number;
  name: string;
  phone: string;
  category: string;
  description: string | null;
  status: string | null;
  createdAt: Date | null;
}

const categoryLabels: Record<string, string> = {
  video: "إنتاج فيديو",
  graphic: "تصميم جرافيكي",
  "music-video": "فيديو كليب",
  brand: "هوية بصرية",
  ad: "إعلان",
  other: "أخرى",
};

export default function OrdersView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/list");
      const data = await res.json();
      setOrders(data.data || []);
    } catch {} finally { setLoading(false); }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`مرحباً ${name}، شكراً لتواصلك معنا. كيف يمكنني مساعدتك؟`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-[#c62828]" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          <span className="text-gradient-gold">الطلبات</span>
        </h1>
        <p className="text-[#a0a0a0] text-sm mt-1">{orders.length} طلب إجمالاً</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "all", label: "الكل", count: orders.length },
          { id: "new", label: "جديد", count: orders.filter(o => o.status === "new").length },
          { id: "contacted", label: "تم التواصل", count: orders.filter(o => o.status === "contacted").length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              filter === tab.id
                ? "gradient-gold text-white"
                : "bg-[#1e1e1e] text-[#a0a0a0] hover:text-white border border-[#2a2a2a]"
            }`}
          >
            {tab.label}
            <span className="mr-1 text-xs opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-[#141414] border border-dashed border-[#2a2a2a] rounded-xl">
          <ShoppingCart size={48} className="text-[#333] mx-auto mb-4" />
          <p className="text-[#a0a0a0] text-lg">
            {filter === "all" ? "لا توجد طلبات بعد" : "لا توجد طلبات في هذا التصنيف"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div key={order.id}
              className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-5 hover:border-[#c62828]/30 transition-all">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white font-bold text-sm">
                    {order.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">{order.name}</h3>
                      {order.status === "new" ? (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                          <Clock size={10} /> جديد
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-[#c62828]/20 text-[#c62828] text-xs rounded-full flex items-center gap-1">
                          <CheckCircle size={10} /> تم التواصل
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#666] mt-0.5">
                      {categoryLabels[order.category] || order.category}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#666]">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric", month: "short", day: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>

              {/* Description */}
              {order.description && (
                <p className="text-[#a0a0a0] text-sm mb-3 bg-[#1e1e1e] p-3 rounded-lg leading-relaxed">
                  {order.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#2a2a2a]">
                <div className="flex items-center gap-1.5 text-sm text-[#a0a0a0]">
                  <Phone size={14} />
                  <span dir="ltr">{order.phone}</span>
                </div>
                <button
                  onClick={() => openWhatsApp(order.phone, order.name)}
                  className="flex items-center gap-2 px-4 py-1.5 bg-[#25D366] text-white text-sm rounded-lg hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle size={14} />
                  واتساب
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
