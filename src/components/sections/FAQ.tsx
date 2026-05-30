"use client";

import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";
import { AccordionItem } from "@/components/ui/accordion";

export function FAQ() {
  const { faq } = siteConfig;
  const [openId, setOpenId] = useState<string | null>(faq.items[0]?.id ?? null);

  return (
    <SectionWrapper>
      <SectionHeader title={faq.title} subtitle={faq.subtitle} />
      <AnimateInView className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-white border border-sage-100 px-6 md:px-8">
          {faq.items.map((item) => (
            <AccordionItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </AnimateInView>
    </SectionWrapper>
  );
}
