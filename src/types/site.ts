export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  href: string;
  label: string;
}

export interface MessengerChannel {
  name: "telegram" | "whatsapp" | "instagram";
  label: string;
  href: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Bouquet {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tag?: string;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface PricePlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface GalleryItem {
  id: string;
  image: string;
  alt: string;
}

export interface AudienceItem {
  id: string;
  title: string;
  description: string;
}

export interface OrderStep {
  id: string;
  step: number;
  title: string;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  city: string;
  workingHours: string;
  mapLink: string;
}

export interface OrderFormConfig {
  title: string;
  subtitle: string;
  submitLabel: string;
  successMessage: string;
  occasionOptions: string[];
  budgetOptions: string[];
}

export interface PromoBlock {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  badge?: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    tagline: string;
    description: string;
    logoText: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
    video?: string;
  };
  navigation: NavLink[];
  benefits: Benefit[];
  popularBouquets: Bouquet[];
  catalog: {
    title: string;
    subtitle: string;
    filters: string[];
    items: Bouquet[];
  };
  categories: Category[];
  services: Service[];
  pricing: PricePlan[];
  gallery: GalleryItem[];
  about: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    image: string;
    stats: { value: string; label: string }[];
  };
  audience: {
    title: string;
    subtitle: string;
    items: AudienceItem[];
  };
  orderSteps: {
    title: string;
    subtitle: string;
    steps: OrderStep[];
  };
  delivery: {
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
    image: string;
  };
  promo: PromoBlock;
  reviews: {
    title: string;
    subtitle: string;
    items: Review[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FAQItem[];
  };
  orderForm: OrderFormConfig;
  messengerOrder: {
    title: string;
    subtitle: string;
    orderMessage: string;
    channels: MessengerChannel[];
  };
  contacts: ContactInfo;
  social: SocialLink[];
  footer: {
    copyright: string;
    description: string;
  };
  floatingCta: {
    label: string;
    href: string;
  };
  currency: string;
}
