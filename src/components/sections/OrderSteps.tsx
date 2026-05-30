"use client";

import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";

export function OrderSteps() {
  const { orderSteps } = siteConfig;

  return (
    <SectionWrapper>
      <SectionHeader title={orderSteps.title} subtitle={orderSteps.subtitle} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {orderSteps.steps.map((step, i) => (
          <AnimateInView key={step.id} delay={i * 0.1}>
            <article className="relative text-center p-6">
              <div className="w-14 h-14 mx-auto rounded-full bg-sage-100 flex items-center justify-center mb-5">
                <span className="font-serif text-xl font-medium text-sage-800">{step.step}</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-sage-900 mb-2">{step.title}</h3>
              <p className="text-sm text-sage-600 leading-relaxed">{step.description}</p>
            </article>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
