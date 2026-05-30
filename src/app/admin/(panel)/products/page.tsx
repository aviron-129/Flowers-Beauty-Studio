import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { deleteProduct } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Товары / букеты</h1>
        <Button href="/admin/products/new">+ Добавить</Button>
      </div>

      {products.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-slate-500">
            Товаров пока нет.{" "}
            <Link href="/admin/products/new" className="text-sage-700 underline">
              Добавить первый
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Фото</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Название</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Категория</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Цена</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Статус</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                        <Image src={p.imageUrl} alt={p.title} fill className="object-cover" sizes="48px" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{p.title}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{p.description}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.category?.title ?? "—"}</td>
                    <td className="px-4 py-3">
                      <span className="font-medium">{formatPrice(p.price)}</span>
                      {p.oldPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">{formatPrice(p.oldPrice)}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.isActive ? <Badge variant="success">Активен</Badge> : <Badge variant="danger">Скрыт</Badge>}
                        {p.isPopular && <Badge variant="info">Хит</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button href={`/admin/products/${p.id}/edit`} size="sm" variant="secondary">
                          Изменить
                        </Button>
                        <form action={deleteProduct.bind(null, p.id)}>
                          <Button type="submit" size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                            Удалить
                          </Button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
