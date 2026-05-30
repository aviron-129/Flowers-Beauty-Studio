"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Flower2, LayoutDashboard, Package, FolderOpen, ShoppingBag, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товары", icon: Package },
  { href: "/admin/categories", label: "Категории", icon: FolderOpen },
  { href: "/admin/orders", label: "Заявки", icon: ShoppingBag },
  { href: "/admin/settings", label: "Настройки", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 shrink-0">
        <div className="px-5 py-6 border-b border-slate-100">
          <Link href="/admin" className="flex items-center gap-2 text-slate-900 font-semibold">
            <Flower2 className="h-5 w-5 text-sage-700" />
            Админка «Верба»
          </Link>
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-700 mt-2 block">
            ← На сайт
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                pathname === href ? "bg-sage-100 text-sage-900 font-medium" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Выйти
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between gap-2">
          <span className="font-semibold text-slate-900">Админка</span>
          <div className="flex gap-2 overflow-x-auto">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className="text-xs whitespace-nowrap px-2 py-1 rounded bg-slate-100">
                {label}
              </Link>
            ))}
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
