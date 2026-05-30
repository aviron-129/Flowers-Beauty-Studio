"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";
import { MessengerButtons } from "@/components/shared/MessengerButtons";
import type { LandingSettings } from "@/types/landing";
import type { MessengerChannel } from "@/types/site";

interface ContactsProps {
  settings: LandingSettings;
  messengerChannels: MessengerChannel[];
}

export function Contacts({ settings, messengerChannels }: ContactsProps) {
  const { contacts } = siteConfig;

  return (
    <SectionWrapper id="contacts">
      <SectionHeader title="Контакты" subtitle="Приезжайте в студию или заказывайте онлайн — мы на связи каждый день" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <AnimateInView className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
              <MapPin className="h-5 w-5 text-sage-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-medium text-sage-900 mb-1">Адрес</h3>
              <p className="text-sage-600">{settings.address}</p>
              <a
                href={contacts.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sage-700 underline underline-offset-4 mt-1 inline-block hover:text-sage-900"
              >
                Открыть на карте
              </a>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
              <Phone className="h-5 w-5 text-sage-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-medium text-sage-900 mb-1">Телефон</h3>
              <a href={`tel:${settings.phone}`} className="text-sage-600 hover:text-sage-900 transition-colors">
                {settings.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-sage-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-medium text-sage-900 mb-1">Email</h3>
              <a href={`mailto:${contacts.email}`} className="text-sage-600 hover:text-sage-900 transition-colors">
                {contacts.email}
              </a>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
              <Clock className="h-5 w-5 text-sage-700" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-medium text-sage-900 mb-1">Режим работы</h3>
              <p className="text-sage-600">{contacts.workingHours}</p>
            </div>
          </div>

          <div className="pt-4">
            <p className="font-medium text-sage-900 mb-3">Заказать в мессенджере</p>
            <MessengerButtons variant="light" channels={messengerChannels} />
          </div>
        </AnimateInView>

        <AnimateInView delay={0.15}>
          <div className="rounded-2xl overflow-hidden border border-sage-100 bg-sage-50 aspect-[4/3] flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-12 w-12 text-sage-400 mx-auto mb-4" aria-hidden="true" />
              <p className="font-serif text-xl text-sage-800 mb-2">Москва</p>
              <p className="text-sage-600 text-sm">{settings.address}</p>
              <a
                href={contacts.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mt-6 h-11 px-6 rounded-full border border-sage-300 text-sage-800 hover:bg-sage-50 transition-all text-sm font-medium"
              >
                Построить маршрут
              </a>
            </div>
          </div>
        </AnimateInView>
      </div>
    </SectionWrapper>
  );
}
