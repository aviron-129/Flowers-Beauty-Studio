import { siteConfig } from "@/data/siteConfig";

export function SiteBackground() {
  const { hero } = siteConfig;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={hero.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-white/72" />
    </div>
  );
}
