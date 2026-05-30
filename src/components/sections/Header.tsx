"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandingSettings } from "@/types/landing";

interface HeaderProps {
  settings: LandingSettings;
}

export function Header({ settings }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { brand, navigation, floatingCta } = siteConfig;
  const logoText = settings.siteName.includes("«")
    ? settings.siteName.match(/«([^»]+)»/)?.[1] ?? brand.logoText
    : settings.siteName.split(" ").pop() ?? brand.logoText;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/30 bg-white/75 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex h-16 md:h-18 items-center justify-between gap-4">
          <a href="#" className="flex flex-col shrink-0" aria-label={`${settings.siteName} — на главную`}>
            <span className="font-serif text-xl md:text-2xl font-medium text-sage-900">{logoText}</span>
            <span className="text-[10px] md:text-xs text-sage-500 tracking-widest uppercase hidden sm:block">
              {brand.tagline}
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Основная навигация">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-sage-700 hover:text-sage-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-2 text-sm text-sage-700 hover:text-sage-900 transition-colors"
              aria-label={`Позвонить: ${settings.phoneDisplay}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">{settings.phoneDisplay}</span>
            </a>
            <Button href={floatingCta.href} size="sm">
              {floatingCta.label}
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-sage-700"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 border-b border-white/30 bg-white/85 backdrop-blur-md",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-3" aria-label="Мобильная навигация">
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sage-700 hover:text-sage-900 py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={`tel:${settings.phone}`} className="text-sage-700 py-2">
            {settings.phoneDisplay}
          </a>
          <Button href={floatingCta.href} className="mt-2" onClick={() => setOpen(false)}>
            {floatingCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
