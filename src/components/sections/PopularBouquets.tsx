"use client";

import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import type { LandingProduct } from "@/types/landing";

interface PopularBouquetsProps {
  products: LandingProduct[];
  currency: string;
}

export function PopularBouquets({ products, currency }: PopularBouquetsProps) {

  return (
    <SectionWrapper id="bouquets">
      <SectionHeader title="Популярные букеты" subtitle="Готовые композиции — можно заказать как есть или адаптировать под ваши пожелания" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((bouquet, i) => (
          <AnimateInView key={bouquet.id} delay={i * 0.08}>
            <article className="group rounded-2xl overflow-hidden bg-white border border-sage-100 hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={bouquet.image}
                  alt={bouquet.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {bouquet.tag && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-xs font-medium text-sage-800 backdrop-blur-sm">
                    {bouquet.tag}
                  </span>
                )}
              </div>
              <div className="p-5 md:p-6">
                <h3 className="font-serif text-xl font-medium text-sage-900 mb-1">{bouquet.name}</h3>
                <p className="text-sm text-sage-600 mb-4">{bouquet.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-sage-800">{formatPrice(bouquet.price, currency)}</span>
                  <Button href="#order" size="sm" variant="secondary">
                    Заказать
                  </Button>
                </div>
              </div>
            </article>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
