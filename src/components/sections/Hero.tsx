"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/button";
import { MessengerButtons } from "@/components/shared/MessengerButtons";
import type { LandingSettings } from "@/types/landing";
import type { MessengerChannel } from "@/types/site";

interface HeroProps {
  settings: LandingSettings;
  messengerChannels: MessengerChannel[];
}

export function Hero({ settings, messengerChannels }: HeroProps) {
  const { hero } = siteConfig;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sage-950/65 via-sage-900/35 to-sage-900/10" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sage-200 text-sm md:text-base tracking-widest uppercase mb-4">{hero.subtitle}</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight mb-6">
            {settings.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-sage-100/90 leading-relaxed mb-8 max-w-xl">{settings.heroText}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="#order" size="lg" className="bg-white text-sage-900 hover:bg-cream-100">
              {hero.ctaPrimary}
            </Button>
            <Button href="#catalog" size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
              {hero.ctaSecondary}
            </Button>
          </div>
          <div className="mt-8">
            <p className="text-sage-200/80 text-sm mb-3">Или закажите в мессенджере:</p>
            <MessengerButtons variant="outline" channels={messengerChannels} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
