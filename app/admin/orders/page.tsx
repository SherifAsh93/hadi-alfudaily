"use client";

import { useEffect, useState } from "react";
import { Phone, MessageCircle, Loader2, CheckCircle, Clock } from "lucide-react";

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

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/list");
      const data = await res.json();
      setOrders(data.data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = (phone: string, name: string) => {
    const message = encodeURIComponent(`مرحباً ${name}، شكراً لتواصلك معنا.`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
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
      <h1 className="text-3xl font-bold mb-8">
        <span className="text-gradient-gold">الطلبات</span>
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-[#141414] border border-[#2a2a2a] rounded-xl">
          <p className="text-[#a0a0a0] text-lg">لا توجد طلبات بعد</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#c62828]/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-white">{order.name}</h3>
                    {order.status === "new" ? (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                        <Clock size={12} />
                        جديد
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#c62828]/20 text-[#c62828] text-xs rounded-full flex items-center gap-1">
                        <CheckCircle size={12} />
                        تم التواصل
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-[#a0a0a0]">
                    {categoryLabels[order.category] || order.category}
                  </div>
                </div>

                <div className="text-sm text-[#a0a0a0]">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </div>
              </div>

              {order.description && (
                <p className="text-[#a0a0a0] mb-4 bg-[#1e1e1e] p-3 rounded-lg">
                  {order.description}
                </p>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-[#a0a0a0]">
                  <Phone size={16} />
                  <span>{order.phone}</span>
                </div>

                <button
                  onClick={() => openWhatsApp(order.phone, order.name)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle size={16} />
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