"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Happy Clients" },
  { value: 500, suffix: "+", label: "Pieces Created" },
  { value: 30, suffix: "+", label: "Years of Craft" },
  { value: 5, suffix: "+", label: "Countries Served" },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={ref}
      className="text-3xl md:text-4xl font-bold text-gold-400 font-[family-name:var(--font-playfair)]"
    >
      {count}
      {suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-wood-900 relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 wood-texture-overlay opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p className="text-wood-400 text-sm uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
