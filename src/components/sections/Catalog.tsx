"use client";

import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";
import { MessengerButtons } from "@/components/shared/MessengerButtons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandingCatalogData } from "@/types/landing";
import type { MessengerChannel } from "@/types/site";

interface CatalogProps {
  catalog: LandingCatalogData;
  currency: string;
  messengerChannels: MessengerChannel[];
}

export function Catalog({ catalog, currency, messengerChannels }: CatalogProps) {
  const [activeFilter, setActiveFilter] = useState("Все");

  const filtered =
    activeFilter === "Все"
      ? catalog.items
      : catalog.items.filter((item) => item.category === activeFilter);

  return (
    <SectionWrapper id="catalog" variant="cream">
      <SectionHeader title={catalog.title} subtitle={catalog.subtitle} />
      <AnimateInView className="flex flex-wrap justify-center gap-2 mb-10">
        {catalog.filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeFilter === filter
                ? "bg-sage-800 text-white"
                : "bg-white text-sage-700 border border-sage-200 hover:border-sage-300"
            )}
            aria-pressed={activeFilter === filter}
          >
            {filter}
          </button>
        ))}
      </AnimateInView>

      {filtered.length === 0 ? (
        <p className="text-center text-sage-600 py-8">В этой категории пока нет букетов</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {filtered.map((item, i) => (
            <AnimateInView key={item.id} delay={i * 0.05}>
              <article className="group rounded-2xl overflow-hidden bg-white border border-sage-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-xs font-medium text-sage-800">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-serif text-lg font-medium text-sage-900 mb-1">{item.name}</h3>
                  {item.category && <p className="text-xs text-sage-500 mb-1">{item.category}</p>}
                  <p className="text-sm text-sage-600 mb-4 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="font-medium text-sage-800">{formatPrice(item.price, currency)}</span>
                      {item.oldPrice && (
                        <span className="text-xs text-sage-400 line-through ml-2">
                          {formatPrice(item.oldPrice, currency)}
                        </span>
                      )}
                    </div>
                    <Button href="#order" size="sm" variant="secondary">
                      Заказать
                    </Button>
                  </div>
                </div>
              </article>
            </AnimateInView>
          ))}
        </div>
      )}

      <AnimateInView className="mt-12 text-center">
        <p className="text-sage-600 mb-4">Не нашли нужный букет? Напишите нам — соберём индивидуально</p>
        <MessengerButtons variant="default" channels={messengerChannels} className="justify-center" />
      </AnimateInView>
    </SectionWrapper>
  );
}
