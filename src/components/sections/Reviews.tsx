"use client";

import { Star } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";

export function Reviews() {
  const { reviews } = siteConfig;

  return (
    <SectionWrapper id="reviews" variant="cream">
      <SectionHeader title={reviews.title} subtitle={reviews.subtitle} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {reviews.items.map((review, i) => (
          <AnimateInView key={review.id} delay={i * 0.1}>
            <article className="p-6 md:p-8 rounded-2xl bg-white border border-sage-100 h-full">
              <div className="flex gap-1 mb-4" aria-label={`Оценка: ${review.rating} из 5`}>
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-sage-700 leading-relaxed mb-6">&ldquo;{review.text}&rdquo;</blockquote>
              <footer className="flex items-center justify-between">
                <cite className="not-italic font-medium text-sage-900">{review.name}</cite>
                <time className="text-sm text-sage-500">{review.date}</time>
              </footer>
            </article>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
