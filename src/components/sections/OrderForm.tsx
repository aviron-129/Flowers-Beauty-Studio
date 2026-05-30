"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/siteConfig";
import { SectionWrapper, SectionHeader, AnimateInView } from "@/components/shared/Section";
import { MessengerButtons } from "@/components/shared/MessengerButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { MessengerChannel } from "@/types/site";

interface OrderFormData {
  name: string;
  phone: string;
  occasion: string;
  budget: string;
  comment: string;
}

const initialForm: OrderFormData = {
  name: "",
  phone: "",
  occasion: "",
  budget: "",
  comment: "",
};

interface OrderFormProps {
  messengerChannels: MessengerChannel[];
}

export function OrderForm({ messengerChannels }: OrderFormProps) {
  const { orderForm, messengerOrder } = siteConfig;
  const [form, setForm] = useState<OrderFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Не удалось отправить заявку");
        return;
      }
      setSubmitted(true);
      setForm(initialForm);
    } catch {
      setError("Ошибка соединения. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof OrderFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <SectionWrapper id="order" variant="sage">
      <SectionHeader title={orderForm.title} subtitle={orderForm.subtitle} />
      <AnimateInView className="max-w-xl mx-auto mb-8 text-center">
        <p className="text-sage-600 mb-4">{messengerOrder.subtitle}</p>
        <MessengerButtons variant="light" channels={messengerChannels} className="justify-center" />
        <p className="text-sm text-sage-400 mt-5">— или заполните форму —</p>
      </AnimateInView>
      <AnimateInView className="max-w-xl mx-auto">
        {submitted ? (
          <div className="text-center p-8 rounded-2xl bg-white border border-sage-100" role="status">
            <p className="font-serif text-2xl text-sage-900 mb-2">Заявка отправлена</p>
            <p className="text-sage-600">{orderForm.successMessage}</p>
            <Button className="mt-6" variant="secondary" onClick={() => setSubmitted(false)}>
              Отправить ещё одну
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 md:p-8 rounded-2xl bg-white border border-sage-100 shadow-sm"
            aria-label="Форма заказа букета"
          >
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Как к вам обращаться"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occasion">Повод</Label>
              <select
                id="occasion"
                name="occasion"
                value={form.occasion}
                onChange={(e) => updateField("occasion", e.target.value)}
                className="flex h-11 w-full rounded-xl border border-sage-200 bg-white px-4 py-2 text-sm text-sage-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
              >
                <option value="">Не указан</option>
                {orderForm.occasionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Примерный бюджет</Label>
              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={(e) => updateField("budget", e.target.value)}
                className="flex h-11 w-full rounded-xl border border-sage-200 bg-white px-4 py-2 text-sm text-sage-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400"
              >
                <option value="">Не указан</option>
                {orderForm.budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Пожелания по цветам, дате и времени доставки..."
                value={form.comment}
                onChange={(e) => updateField("comment", e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Отправляем..." : orderForm.submitLabel}
            </Button>
          </form>
        )}
      </AnimateInView>
    </SectionWrapper>
  );
}
