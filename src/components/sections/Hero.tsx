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
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {hero.video ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={hero.image}
            className="absolute inset-0 w-full h-full object-cover"
            aria-label="Видео: флорист собирает букет"
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero.image} alt="Авторский букет цветов" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-sage-950/70 via-sage-900/50 to-sage-900/30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20 md:py-32">
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
