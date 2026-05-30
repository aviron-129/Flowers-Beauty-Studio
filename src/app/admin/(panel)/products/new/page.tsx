import Link from "next/link";
import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <Link href="/admin/products" className="text-sm text-slate-500 hover:text-slate-700 mb-4 inline-block">
        ← К списку
      </Link>
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Новый товар</h1>
      <ProductForm />
    </div>
  );
}
