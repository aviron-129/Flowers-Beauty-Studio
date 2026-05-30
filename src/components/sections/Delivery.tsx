"use client";

import Image from "next/image";
import { Truck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";

export function Delivery() {
  const { delivery } = siteConfig;

  return (
    <SectionWrapper variant="cream">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <AnimateInView>
          <SectionHeader title={delivery.title} subtitle={delivery.subtitle} align="left" className="mb-8" />
          <div className="space-y-6">
            {delivery.items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
                  <Truck className="h-5 w-5 text-sage-700" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium text-sage-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-sage-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimateInView>

        <AnimateInView delay={0.15}>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={delivery.image}
              alt="Доставка цветов по Москве"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </AnimateInView>
      </div>
    </SectionWrapper>
  );
}
