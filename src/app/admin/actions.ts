"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import type { OrderStatus } from "@/types/order";

async function requireAdmin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const oldPriceRaw = String(formData.get("oldPrice") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const categoryIdRaw = String(formData.get("categoryId") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const isPopular = formData.get("isPopular") === "on";
  const isActive = formData.get("isActive") === "on";

  if (!title || !imageUrl || Number.isNaN(price)) {
    throw new Error("Заполните обязательные поля");
  }

  await db.product.create({
    data: {
      title,
      description,
      price: Math.round(price),
      oldPrice: oldPriceRaw ? Math.round(Number(oldPriceRaw)) : null,
      imageUrl,
      categoryId: categoryIdRaw ? Number(categoryIdRaw) : null,
      sortOrder,
      isPopular,
      isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: number, formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const oldPriceRaw = String(formData.get("oldPrice") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const categoryIdRaw = String(formData.get("categoryId") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const isPopular = formData.get("isPopular") === "on";
  const isActive = formData.get("isActive") === "on";

  await db.product.update({
    where: { id },
    data: {
      title,
      description,
      price: Math.round(price),
      oldPrice: oldPriceRaw ? Math.round(Number(oldPriceRaw)) : null,
      imageUrl,
      categoryId: categoryIdRaw ? Number(categoryIdRaw) : null,
      sortOrder,
      isPopular,
      isActive,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: number) {
  await requireAdmin();
  await db.product.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/products");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();

  await db.category.create({
    data: {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") !== "off",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
}

export async function updateCategory(id: number, formData: FormData) {
  await requireAdmin();

  await db.category.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: number) {
  await requireAdmin();
  await db.category.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/categories");
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  await requireAdmin();
  await db.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}

export async function updateOrderStatusFromForm(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("orderId"));
  const status = formData.get("status") as OrderStatus;
  if (!id || !status) return;
  await db.order.update({ where: { id }, data: { status } });
  revalidatePath("/admin/orders");
}

export async function deleteOrder(id: number) {
  await requireAdmin();
  await db.order.delete({ where: { id } });
  revalidatePath("/admin/orders");
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();

  await db.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteName: String(formData.get("siteName") ?? ""),
      heroTitle: String(formData.get("heroTitle") ?? ""),
      heroText: String(formData.get("heroText") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      telegram: String(formData.get("telegram") ?? ""),
      instagram: String(formData.get("instagram") ?? ""),
    },
    update: {
      siteName: String(formData.get("siteName") ?? ""),
      heroTitle: String(formData.get("heroTitle") ?? ""),
      heroText: String(formData.get("heroText") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      telegram: String(formData.get("telegram") ?? ""),
      instagram: String(formData.get("instagram") ?? ""),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}

export async function logoutAdmin() {
  const { clearSessionCookie } = await import("@/lib/auth");
  await clearSessionCookie();
  redirect("/admin/login");
}
