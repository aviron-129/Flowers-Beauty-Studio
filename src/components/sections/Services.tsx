"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";

export function Services() {
  const { services } = siteConfig;

  return (
    <SectionWrapper id="services">
      <SectionHeader title="Услуги флориста" subtitle="От одного букета до полного цветочного оформления" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {services.map((service, i) => (
          <AnimateInView key={service.id} delay={i * 0.1}>
            <article className="group flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-white border border-sage-100 hover:shadow-lg transition-all duration-300">
              <div className="relative sm:w-2/5 aspect-[4/3] sm:aspect-auto shrink-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="font-serif text-xl md:text-2xl font-medium text-sage-900 mb-3">{service.title}</h3>
                <p className="text-sage-600 leading-relaxed">{service.description}</p>
              </div>
            </article>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
