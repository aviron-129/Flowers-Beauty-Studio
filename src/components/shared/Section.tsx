"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface AnimateInViewProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateInView({ children, className, delay = 0 }: AnimateInViewProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "cream" | "sage";
}

export function SectionWrapper({ id, children, className, variant = "default" }: SectionWrapperProps) {
  const bg = {
    default: "bg-transparent",
    cream: "bg-cream-50/30",
    sage: "bg-sage-50/30",
  };

  return (
    <section id={id} className={cn("py-16 md:py-24", bg[variant], className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ title, subtitle, align = "center", className }: SectionHeaderProps) {
  return (
    <AnimateInView className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-sage-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-lg text-sage-600 max-w-2xl", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </AnimateInView>
  );
}
