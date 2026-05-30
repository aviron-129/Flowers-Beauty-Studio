"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, AnimateInView } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";

export function Promo() {
  const { promo } = siteConfig;

  return (
    <SectionWrapper id="promo">
      <AnimateInView>
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0">
            <Image src={promo.image} alt={promo.title} fill sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-sage-900/60" />
          </div>
          <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-xl">
              {promo.badge && (
                <span className="inline-block px-3 py-1 rounded-full bg-cream-100/90 text-sage-800 text-xs font-medium mb-4">
                  {promo.badge}
                </span>
              )}
              <h2 className="font-serif text-3xl md:text-4xl font-medium text-white mb-4">{promo.title}</h2>
              <p className="text-sage-100 leading-relaxed">{promo.description}</p>
            </div>
            <Button href={promo.ctaHref} size="lg" className="bg-white text-sage-900 hover:bg-cream-100 shrink-0">
              {promo.ctaLabel}
            </Button>
          </div>
        </div>
      </AnimateInView>
    </SectionWrapper>
  );
}
