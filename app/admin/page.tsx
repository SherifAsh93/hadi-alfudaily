"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, ShoppingCart, TrendingUp, Plus, ExternalLink, ArrowLeft } from "lucide-react";

interface Stats {
  portfolioCount: number;
  orderCount: number;
  newOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ portfolioCount: 0, orderCount: 0, newOrders: 0 });

  useEffect(() => {
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
      } catch {}
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        <span className="text-gradient-gold">لوحة التحكم</span>
      </h1>
      <p className="text-[#a0a0a0] mb-8">مرحباً بك في لوحة إدارة الموقع</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { icon: FolderOpen, count: stats.portfolioCount, label: "إجمالي الأعمال", color: "#c62828" },
          { icon: ShoppingCart, count: stats.orderCount, label: "إجمالي الطلبات", color: "#c62828" },
          { icon: TrendingUp, count: stats.newOrders, label: "طلبات جديدة", color: "#4caf50" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-[#141414] border border-[#2a2a2a] rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#c62828]/10 rounded-xl flex items-center justify-center">
                  <Icon size={24} className="text-[#c62828]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{stat.count}</div>
                  <div className="text-[#a0a0a0] text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick actions */}
      <h2 className="text-xl font-bold mb-4 text-white">إجراءات سريعة</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link
          href="/admin/portfolio"
          className="group flex items-center justify-between p-6 bg-[#141414] border border-[#2a2a2a] rounded-xl hover:border-[#c62828]/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#c62828]/10 rounded-lg flex items-center justify-center group-hover:bg-[#c62828]/20 transition-colors">
              <Plus size={24} className="text-[#c62828]" />
            </div>
            <div>
              <div className="font-bold text-white">إضافة عمل جديد</div>
              <div className="text-sm text-[#a0a0a0]">أضف فيديو أو تصميم لمعرض الأعمال</div>
            </div>
          </div>
          <ArrowLeft size={20} className="text-[#a0a0a0] group-hover:text-[#c62828] transition-colors" />
        </Link>

        <Link
          href="/admin/orders"
          className="group flex items-center justify-between p-6 bg-[#141414] border border-[#2a2a2a] rounded-xl hover:border-[#c62828]/50 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-lg flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
              <ShoppingCart size={24} className="text-[#25D366]" />
            </div>
            <div>
              <div className="font-bold text-white">عرض الطلبات</div>
              <div className="text-sm text-[#a0a0a0]">تابع الطلبات وتواصل مع العملاء</div>
            </div>
          </div>
          <ArrowLeft size={20} className="text-[#a0a0a0] group-hover:text-[#c62828] transition-colors" />
        </Link>
      </div>

      {/* View site */}
      <a
        href="/"
        target="_blank"
        className="inline-flex items-center gap-2 text-[#c62828] font-medium hover:underline"
      >
        <ExternalLink size={16} />
        مشاهدة الموقع
      </a>
    </div>
  );
}
