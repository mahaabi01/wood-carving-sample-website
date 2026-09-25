import { SITE_STATS } from "@/lib/constants";

export default function StatsSection() {
  return (
    <section className="py-16 bg-wood-900 relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 wood-texture-overlay opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {SITE_STATS.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <div className="text-3xl md:text-4xl font-bold text-gold-400 font-[family-name:var(--font-playfair)]">
              {stat.value}
            </div>
            <p className="text-wood-400 text-sm uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
