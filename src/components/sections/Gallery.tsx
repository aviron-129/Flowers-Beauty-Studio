"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";

export function Gallery() {
  const { gallery } = siteConfig;

  return (
    <SectionWrapper id="gallery">
      <SectionHeader title="Галерея работ" subtitle="Каждый букет — маленькое произведение" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {gallery.map((item, i) => (
          <AnimateInView key={item.id} delay={i * 0.05} className={i === 0 ? "col-span-2 row-span-2" : ""}>
            <div
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 ? "aspect-square md:aspect-auto md:h-full min-h-[280px]" : "aspect-square"
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-sage-900/0 group-hover:bg-sage-900/20 transition-colors duration-300" />
            </div>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
