export interface LandingProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  tag?: string;
  category?: string;
}

export interface LandingCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface LandingSettings {
  siteName: string;
  heroTitle: string;
  heroText: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
}

export interface LandingCatalogData {
  title: string;
  subtitle: string;
  filters: string[];
  items: LandingProduct[];
}

export interface LandingPageData {
  popularBouquets: LandingProduct[];
  catalog: LandingCatalogData;
  categories: LandingCategory[];
  settings: LandingSettings;
  currency: string;
  fromDb: boolean;
}
