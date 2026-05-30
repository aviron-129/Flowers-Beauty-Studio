"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-sage-100 last:border-0">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-sage-700"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-sage-900">{question}</span>
        <ChevronDown
          className={cn("h-5 w-5 shrink-0 text-sage-500 transition-transform duration-300", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100 pb-5" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="text-sage-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}
