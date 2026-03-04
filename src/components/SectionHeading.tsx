import { ReactNode } from "react";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {label && (
        <div
          className={`flex items-center gap-3 mb-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="w-10 h-px bg-gold-500" />
          <span className="text-gold-600 text-sm uppercase tracking-[0.2em] font-semibold">
            {label}
          </span>
          <span className="w-10 h-px bg-gold-500" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-wood-500 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
