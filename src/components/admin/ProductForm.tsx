import { db } from "@/lib/db";
import { createProduct, updateProduct } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProductFormProps {
  product?: {
    id: number;
    title: string;
    description: string;
    price: number;
    oldPrice: number | null;
    imageUrl: string;
    categoryId: number | null;
    isPopular: boolean;
    isActive: boolean;
    sortOrder: number;
  };
}

export async function ProductForm({ product }: ProductFormProps) {
  const categories = await db.category.findMany({ orderBy: { sortOrder: "asc" } });
  const action = product ? updateProduct.bind(null, product.id) : createProduct;

  return (
    <Card>
      <CardHeader>
        <h2 className="font-medium text-slate-900">{product ? "Редактировать товар" : "Новый товар"}</h2>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="title">Название *</Label>
            <Input id="title" name="title" defaultValue={product?.title} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea id="description" name="description" defaultValue={product?.description} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Цена (₽) *</Label>
              <Input id="price" name="price" type="number" min={0} defaultValue={product?.price ?? 0} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="oldPrice">Старая цена (₽)</Label>
              <Input id="oldPrice" name="oldPrice" type="number" min={0} defaultValue={product?.oldPrice ?? ""} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Путь к фото *</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={product?.imageUrl ?? "/%D1%86%D0%B2%D0%B5%D1%82%D1%8B/%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%B1%D1%83%D0%BA%D0%B5%D1%82%D0%BE%D0%B2/%D0%A0%D0%BE%D0%B7%D1%8B/images.jpg"}
              placeholder="/цветы/каталог букетов/Розы/images.jpg"
              required
            />
            <p className="text-xs text-slate-500">Файл должен лежать в public/цветы/</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryId">Категория</Label>
            <select
              id="categoryId"
              name="categoryId"
              defaultValue={product?.categoryId ?? ""}
              className="flex h-11 w-full rounded-xl border border-sage-200 bg-white px-4 py-2 text-sm"
            >
              <option value="">Без категории</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sortOrder">Порядок сортировки</Label>
            <Input id="sortOrder" name="sortOrder" type="number" defaultValue={product?.sortOrder ?? 0} />
          </div>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="isPopular" defaultChecked={product?.isPopular} className="rounded" />
              Популярный (хит)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={product?.isActive ?? true}
                className="rounded"
              />
              Активен на сайте
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit">{product ? "Сохранить" : "Создать"}</Button>
            <Button href="/admin/products" variant="outline">
              Отмена
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
