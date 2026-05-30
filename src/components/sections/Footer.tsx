"use client";

import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  const { brand, navigation, contacts, footer, social } = siteConfig;

  return (
    <footer className="bg-sage-900 text-sage-200 py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-serif text-2xl text-white mb-3">{brand.logoText}</p>
            <p className="text-sm text-sage-400 leading-relaxed">{footer.description}</p>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="text-white font-medium mb-4">Навигация</p>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-sage-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-white font-medium mb-4">Контакты</p>
            <ul className="space-y-2 text-sm text-sage-400">
              <li>{contacts.address}</li>
              <li>
                <a href={`tel:${contacts.phone}`} className="hover:text-white transition-colors">
                  {contacts.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacts.email}`} className="hover:text-white transition-colors">
                  {contacts.email}
                </a>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              {social.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-sage-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-sage-800 pt-8 text-center text-sm text-sage-500">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
