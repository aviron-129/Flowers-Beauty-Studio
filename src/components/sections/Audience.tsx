"use client";

import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";

export function Audience() {
  const { audience } = siteConfig;

  return (
    <SectionWrapper variant="cream">
      <SectionHeader title={audience.title} subtitle={audience.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {audience.items.map((item, i) => (
          <AnimateInView key={item.id} delay={i * 0.08}>
            <article className="p-6 rounded-2xl bg-white border border-sage-100 hover:border-sage-200 hover:shadow-md transition-all duration-300 h-full">
              <h3 className="font-serif text-lg font-medium text-sage-900 mb-2">{item.title}</h3>
              <p className="text-sm text-sage-600 leading-relaxed">{item.description}</p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
