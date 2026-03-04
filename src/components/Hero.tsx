import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px]">
      {/* Background Image */}
      <Image
        src="/Maindoor/door1.jpeg"
        alt="Handcrafted Nepali wood carving — ornate temple door"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-wood-950/70 via-wood-950/40 to-wood-950/80" />
      <div className="absolute inset-0 wood-texture-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
        {/* Ornamental top accent */}
        <div className="mb-6 flex items-center gap-4">
          <span className="w-16 h-px bg-gold-400" />
          <span className="text-gold-400 text-sm uppercase tracking-[0.3em] font-[family-name:var(--font-inter)]">
            Since 1995 · Lalitpur, Nepal
          </span>
          <span className="w-16 h-px bg-gold-400" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight font-[family-name:var(--font-playfair)]">
          Sacred Woodcraft,
          <br />
          <span className="text-gold-300">Timeless Heritage</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-wood-200 max-w-2xl leading-relaxed font-[family-name:var(--font-inter)]">
          Master artisans preserving centuries of Nepali and Indian temple
          carving traditions — handcrafting doors, windows, sculptures &amp;
          architectural marvels for collectors and designers worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="px-8 py-4 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-all shadow-xl shadow-temple-500/30 text-lg"
          >
            Explore Collection
          </Link>
          <Link
            href="/heritage"
            className="px-8 py-4 border-2 border-gold-400 text-gold-400 font-semibold rounded-lg hover:bg-gold-400 hover:text-wood-900 transition-all text-lg"
          >
            Our Heritage
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
          {[
            { value: "100+", label: "Happy Clients" },
            { value: "30+", label: "Years of Craft" },
            { value: "500+", label: "Pieces Created" },
            { value: "5+", label: "Countries Served" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-gold-400 font-[family-name:var(--font-playfair)]">
                {stat.value}
              </p>
              <p className="text-xs text-wood-300 uppercase tracking-wider mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold-400/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gold-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
