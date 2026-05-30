"use client";

import { Camera, Flower2, Sparkles, Truck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";

const iconMap = {
  flower: Flower2,
  truck: Truck,
  sparkles: Sparkles,
  camera: Camera,
};

export function Benefits() {
  const { benefits } = siteConfig;

  return (
    <SectionWrapper variant="cream">
      <SectionHeader title="Почему выбирают нас" subtitle="Забота о деталях — в каждом букете" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {benefits.map((item, i) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Flower2;
          return (
            <AnimateInView key={item.id} delay={i * 0.1}>
              <article className="group p-6 md:p-8 rounded-2xl bg-white border border-sage-100 hover:border-sage-200 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-sage-100 flex items-center justify-center mb-5 group-hover:bg-sage-200 transition-colors">
                  <Icon className="h-6 w-6 text-sage-700" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-medium text-sage-900 mb-2">{item.title}</h3>
                <p className="text-sage-600 text-sm leading-relaxed">{item.description}</p>
              </article>
            </AnimateInView>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
