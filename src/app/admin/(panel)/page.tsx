import Link from "next/link";
import { getAdminStats } from "@/lib/site-data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const stats = await getAdminStats();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Обзор</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Товаров", value: stats.products, href: "/admin/products" },
          { label: "Категорий", value: stats.categories, href: "/admin/categories" },
          { label: "Новых заявок", value: stats.ordersNew, href: "/admin/orders" },
          { label: "Всего заявок", value: stats.ordersTotal, href: "/admin/orders" },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="text-3xl font-semibold text-slate-900 mt-1">{item.value}</p>
              <Link href={item.href} className="text-sm text-sage-700 hover:underline mt-2 inline-block">
                Открыть →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-medium text-slate-900">Быстрые действия</h2>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button href="/admin/products/new">Добавить товар</Button>
          <Button href="/admin/categories" variant="secondary">
            Категории
          </Button>
          <Button href="/admin/orders" variant="secondary">
            Заявки
          </Button>
          <Button href="/admin/settings" variant="outline">
            Настройки сайта
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
