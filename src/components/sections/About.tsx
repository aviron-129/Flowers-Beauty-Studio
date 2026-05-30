"use client";

import Image from "next/image";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, AnimateInView } from "@/components/shared/Section";

export function About() {
  const { about } = siteConfig;

  return (
    <SectionWrapper id="about" variant="sage">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <AnimateInView>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={about.image}
              alt="О цветочной студии Верба"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </AnimateInView>

        <AnimateInView delay={0.15}>
          <p className="text-sm tracking-widest uppercase text-sage-600 mb-3">{about.subtitle}</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-sage-900 mb-6">{about.title}</h2>
          <div className="space-y-4 text-sage-700 leading-relaxed mb-10">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {about.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl md:text-3xl font-medium text-sage-900">{stat.value}</p>
                <p className="text-sm text-sage-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateInView>
      </div>
    </SectionWrapper>
  );
}
