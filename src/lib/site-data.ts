import { siteConfig } from "@/data/siteConfig";
import { db } from "@/lib/db";
import type {
  LandingCategory,
  LandingPageData,
  LandingProduct,
  LandingSettings,
} from "@/types/landing";

function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  }
  return phone;
}

function mapProductTag(product: { isPopular: boolean; oldPrice: number | null }): string | undefined {
  if (product.isPopular) return "Хит";
  if (product.oldPrice && product.oldPrice > 0) return "Акция";
  return undefined;
}

function mapDbProduct(p: {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice: number | null;
  imageUrl: string;
  isPopular: boolean;
  category: { title: string } | null;
}): LandingProduct {
  return {
    id: String(p.id),
    name: p.title,
    description: p.description,
    price: p.price,
    oldPrice: p.oldPrice,
    image: p.imageUrl,
    tag: mapProductTag(p),
    category: p.category?.title,
  };
}

function fallbackFromConfig(): LandingPageData {
  const { popularBouquets, catalog, categories, contacts, hero, brand, messengerOrder, currency } = siteConfig;

  const whatsapp = messengerOrder.channels.find((c) => c.name === "whatsapp")?.href ?? "";
  const telegram = messengerOrder.channels.find((c) => c.name === "telegram")?.href ?? "";
  const instagram = messengerOrder.channels.find((c) => c.name === "instagram")?.href ?? "";

  return {
    popularBouquets,
    catalog,
    categories,
    settings: {
      siteName: brand.name,
      heroTitle: hero.title,
      heroText: hero.description,
      phone: contacts.phone,
      phoneDisplay: contacts.phoneDisplay,
      address: contacts.address,
      whatsapp,
      telegram,
      instagram,
    },
    currency,
    fromDb: false,
  };
}

export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    const [products, categories, settingsRow] = await Promise.all([
      db.product.findMany({
        where: { isActive: true },
        include: { category: true },
        orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      }),
      db.category.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
      }),
      db.siteSettings.findUnique({ where: { id: 1 } }),
    ]);

    if (products.length === 0 && categories.length === 0) {
      return fallbackFromConfig();
    }

    const mappedProducts = products.map(mapDbProduct);
    const popularBouquets = mappedProducts.filter((_, i) => products[i]?.isPopular);

    const categoryTitles = categories.map((c) => c.title);
    const filters = ["Все", ...categoryTitles];

    const mappedCategories: LandingCategory[] = categories.map((c) => ({
      id: String(c.id),
      name: c.title,
      description: c.description,
      image: c.imageUrl,
    }));

    const settings: LandingSettings = settingsRow
      ? {
          siteName: settingsRow.siteName,
          heroTitle: settingsRow.heroTitle,
          heroText: settingsRow.heroText,
          phone: settingsRow.phone,
          phoneDisplay: formatPhoneDisplay(settingsRow.phone),
          address: settingsRow.address,
          whatsapp: settingsRow.whatsapp,
          telegram: settingsRow.telegram,
          instagram: settingsRow.instagram,
        }
      : fallbackFromConfig().settings;

    return {
      popularBouquets: popularBouquets.length > 0 ? popularBouquets : mappedProducts.slice(0, 6),
      catalog: {
        title: siteConfig.catalog.title,
        subtitle: siteConfig.catalog.subtitle,
        filters,
        items: mappedProducts,
      },
      categories: mappedCategories.length > 0 ? mappedCategories : fallbackFromConfig().categories,
      settings,
      currency: siteConfig.currency,
      fromDb: true,
    };
  } catch (error) {
    console.error("[site-data] DB unavailable, using siteConfig fallback:", error);
    return fallbackFromConfig();
  }
}

export async function getAdminStats() {
  const [products, categories, ordersNew, ordersTotal] = await Promise.all([
    db.product.count(),
    db.category.count(),
    db.order.count({ where: { status: "new" } }),
    db.order.count(),
  ]);
  return { products, categories, ordersNew, ordersTotal };
}
