"use client";

import { useEffect, useState } from "react";
import { FolderOpen, ShoppingCart, TrendingUp } from "lucide-react";

interface Stats {
  portfolioCount: number;
  orderCount: number;
  newOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    portfolioCount: 0,
    orderCount: 0,
    newOrders: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [portfolioRes, ordersRes] = await Promise.all([
        fetch("/api/portfolio"),
        fetch("/api/orders/list"),
      ]);

      const portfolioData = await portfolioRes.json();
      const ordersData = await ordersRes.json();

      setStats({
        portfolioCount: portfolioData.data?.length || 0,
        orderCount: ordersData.data?.length || 0,
        newOrders: ordersData.data?.filter((o: { status: string }) => o.status === "new").length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        <span className="text-gradient-gold">لوحة التحكم</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Portfolio count */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#c62828]/10 rounded-lg flex items-center justify-center">
              <FolderOpen size={24} className="text-[#c62828]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.portfolioCount}</div>
              <div className="text-[#a0a0a0]">إجمالي الأعمال</div>
            </div>
          </div>
        </div>

        {/* Total orders */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#c62828]/10 rounded-lg flex items-center justify-center">
              <ShoppingCart size={24} className="text-[#c62828]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.orderCount}</div>
              <div className="text-[#a0a0a0]">إجمالي الطلبات</div>
            </div>
          </div>
        </div>

        {/* New orders */}
        <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#c62828]/10 rounded-lg flex items-center justify-center">
              <TrendingUp size={24} className="text-[#c62828]" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{stats.newOrders}</div>
              <div className="text-[#a0a0a0]">طلبات جديدة</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-white">إجراءات سريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/portfolio"
            className="block p-4 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg hover:border-[#c62828]/50 transition-colors"
          >
            <div className="font-bold text-white mb-1">إضافة عمل جديد</div>
            <div className="text-sm text-[#a0a0a0]">أضف فيديو أو تصميم جديد到معرض الأعمال</div>
          </a>
          <a
            href="/admin/orders"
            className="block p-4 bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg hover:border-[#c62828]/50 transition-colors"
          >
            <div className="font-bold text-white mb-1">عرض الطلبات</div>
            <div className="text-sm text-[#a0a0a0]">تابع الطلبات الجديدة من العملاء</div>
          </a>
        </div>
      </div>
    </div>
  );
}