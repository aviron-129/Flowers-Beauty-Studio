import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id: Number(id) } });
  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-700 mb-4 inline-block">
        ← К списку
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Редактировать: {product.title}</h1>
      <ProductForm product={product} />
    </div>
  );
}
