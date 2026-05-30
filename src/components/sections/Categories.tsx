"use client";

import Image from "next/image";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";
import type { LandingCategory } from "@/types/landing";

interface CategoriesProps {
  categories: LandingCategory[];
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <SectionWrapper id="categories" variant="cream">
      <SectionHeader title="Категории цветов" subtitle="Выберите настроение — мы соберём идеальную композицию" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <AnimateInView key={cat.id} delay={i * 0.08}>
            <a
              href="#catalog"
              className="group block relative aspect-[3/4] rounded-2xl overflow-hidden"
              aria-label={`Категория: ${cat.name}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-950/70 via-sage-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <h3 className="font-serif text-lg md:text-xl font-medium text-white">{cat.name}</h3>
                <p className="text-xs md:text-sm text-sage-200 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>
              </div>
            </a>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
