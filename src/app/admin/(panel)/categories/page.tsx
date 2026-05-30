import { db } from "@/lib/db";
import { createCategory, updateCategory, deleteCategory } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold text-slate-900">Категории</h1>

      <Card>
        <CardHeader>
          <h2 className="font-medium">Добавить категорию</h2>
        </CardHeader>
        <CardContent>
          <form action={createCategory} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            <div className="space-y-2">
              <Label htmlFor="new-title">Название</Label>
              <Input id="new-title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-imageUrl">Путь к фото</Label>
              <Input id="new-imageUrl" name="imageUrl" placeholder="/цветы/каталог букетов/Розы/images.jpg" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="new-description">Описание</Label>
              <Textarea id="new-description" name="description" rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-sortOrder">Порядок</Label>
              <Input id="new-sortOrder" name="sortOrder" type="number" defaultValue={0} />
            </div>
            <div className="flex items-end">
              <Button type="submit">Добавить</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {categories.length === 0 ? (
          <p className="text-slate-500">Категорий пока нет</p>
        ) : (
          categories.map((cat) => (
            <Card key={cat.id}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">{cat.title}</span>
                  {cat.isActive ? <Badge variant="success">Активна</Badge> : <Badge variant="danger">Скрыта</Badge>}
                  <span className="text-xs text-slate-400">({cat._count.products} товаров)</span>
                </div>
                <form action={updateCategory.bind(null, cat.id)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Название</Label>
                    <Input name="title" defaultValue={cat.title} required />
                  </div>
                  <div className="space-y-2">
                    <Label>Путь к фото</Label>
                    <Input name="imageUrl" defaultValue={cat.imageUrl} required />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Описание</Label>
                    <Textarea name="description" defaultValue={cat.description} rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Порядок</Label>
                    <Input name="sortOrder" type="number" defaultValue={cat.sortOrder} />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input type="checkbox" name="isActive" defaultChecked={cat.isActive} className="rounded" />
                    <Label>Активна на сайте</Label>
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" size="sm">
                      Сохранить
                    </Button>
                  </div>
                </form>
                <form action={deleteCategory.bind(null, cat.id)}>
                  <Button type="submit" size="sm" variant="outline" className="text-red-600">
                    Удалить категорию
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
