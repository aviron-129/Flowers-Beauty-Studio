"use client";

import { Check } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { formatPrice } from "@/lib/utils";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Pricing() {
  const { pricing, currency } = siteConfig;

  return (
    <SectionWrapper id="pricing" variant="cream">
      <SectionHeader title="Цены" subtitle="Прозрачные пакеты — или индивидуальный расчёт под ваш бюджет" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
        {pricing.map((plan, i) => (
          <AnimateInView key={plan.id} delay={i * 0.1}>
            <article
              className={cn(
                "relative flex flex-col rounded-2xl p-6 md:p-8 h-full transition-all duration-300",
                plan.popular
                  ? "bg-sage-800 text-white shadow-xl scale-[1.02] border-2 border-sage-700"
                  : "bg-white border border-sage-100 hover:shadow-lg"
              )}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cream-100 text-sage-800 text-xs font-medium">
                  Популярный
                </span>
              )}
              <h3 className={cn("font-serif text-2xl font-medium mb-1", plan.popular ? "text-white" : "text-sage-900")}>
                {plan.name}
              </h3>
              <p className={cn("text-sm mb-4", plan.popular ? "text-sage-200" : "text-sage-600")}>{plan.description}</p>
              <p className={cn("text-3xl font-medium mb-6", plan.popular ? "text-white" : "text-sage-900")}>
                от {formatPrice(plan.price, currency)}
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className={cn("h-4 w-4 mt-0.5 shrink-0", plan.popular ? "text-sage-300" : "text-sage-600")} aria-hidden="true" />
                    <span className={plan.popular ? "text-sage-100" : "text-sage-700"}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                href="#order"
                variant={plan.popular ? "secondary" : "default"}
                className={plan.popular ? "bg-white text-sage-900 hover:bg-cream-100" : ""}
              >
                Выбрать
              </Button>
            </article>
          </AnimateInView>
        ))}
      </div>
    </SectionWrapper>
  );
}
