"use client";

import { useState } from "react";
import { Flower2, X } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { MessengerButtons } from "@/components/shared/MessengerButtons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FloatingCTA() {
  const { floatingCta } = siteConfig;
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8 flex flex-col items-end gap-3">
      <div
        className={cn(
          "flex flex-col gap-2 transition-all duration-300 origin-bottom-right",
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        )}
        role="menu"
        aria-hidden={!open}
      >
        <MessengerButtons size="icon" />
        <Button
          href={floatingCta.href}
          size="icon"
          variant="secondary"
          className="rounded-full h-11 w-11 shadow-md"
          aria-label="Оформить заявку на сайте"
        >
          <Flower2 className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-13 px-6 rounded-full text-sm font-medium shadow-lg transition-all duration-300",
          open
            ? "bg-sage-800 text-white hover:bg-sage-900"
            : "bg-sage-700 text-white hover:bg-sage-800 shadow-sage-900/20 hover:shadow-xl"
        )}
        aria-label={open ? "Закрыть меню заказа" : floatingCta.label}
        aria-expanded={open}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <>
            <Flower2 className="h-5 w-5" aria-hidden="true" />
            <span className="hidden sm:inline">{floatingCta.label}</span>
            <span className="sm:hidden">Заказ</span>
          </>
        )}
      </button>
    </div>
  );
}
