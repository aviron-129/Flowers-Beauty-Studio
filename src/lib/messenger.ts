import type { LandingSettings } from "@/types/landing";
import type { MessengerChannel } from "@/types/site";

export function buildMessengerChannels(settings: LandingSettings): MessengerChannel[] {
  return [
    { name: "telegram", label: "Telegram", href: settings.telegram || "#" },
    { name: "whatsapp", label: "WhatsApp", href: settings.whatsapp || "#" },
    { name: "instagram", label: "Instagram", href: settings.instagram || "#" },
  ].filter((c) => c.href && c.href !== "#") as MessengerChannel[];
}
