"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FolderOpen, ShoppingCart, LogOut, Lock } from "lucide-react";

const adminLinks = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "الأعمال", icon: FolderOpen },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingCart },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "hadi2026") {
      sessionStorage.setItem("admin-auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("كلمة المرور غير صحيحة");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-auth");
    setIsAuthenticated(false);
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Lock size={48} className="text-[#c62828] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#c62828]">لوحة التحكم</h1>
            <p className="text-[#a0a0a0] mt-2">أدخل كلمة المرور للدخول</p>
          </div>

          <form onSubmit={handleLogin} className="bg-[#141414] border border-[#2a2a2a] rounded-2xl p-8">
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#2a2a2a] rounded-lg px-4 py-3 text-white focus:border-[#c62828] focus:outline-none transition-colors text-center text-lg tracking-widest"
                placeholder="كلمة المرور"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full gradient-gold text-[#0a0a0a] py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity"
            >
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-l border-[#2a2a2a] p-6 hidden md:block">
        <div className="mb-8">
          <img src="/logo.jpeg" alt="هادي الفضيلي" className="w-16 h-16 rounded-full object-cover mx-auto" />
          <h2 className="text-center text-[#c62828] font-bold mt-3">لوحة التحكم</h2>
        </div>

        <nav className="space-y-2">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[#c62828]/10 text-[#c62828] border border-[#c62828]/30"
                    : "text-[#a0a0a0] hover:bg-[#1e1e1e] hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#a0a0a0] hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span>تسجيل الخروج</span>
        </button>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#141414] border-t border-[#2a2a2a] z-50">
        <nav className="flex justify-around p-2">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isActive ? "text-[#c62828]" : "text-[#a0a0a0]"
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{link.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-[#a0a0a0] hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-xs">خروج</span>
          </button>
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 pb-24 md:pb-8">{children}</main>
    </div>
  );
}