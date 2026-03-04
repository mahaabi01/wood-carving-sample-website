"use client";

import { useState, useEffect, useRef } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  role: string | null;
  avatarUrl: string | null;
  rating: number;
  review: string;
  projectType: string | null;
  imageUrl: string | null;
}

export default function TestimonialsSection({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((p) => (p + 1) % testimonials.length);
    }, 5000);
  };

  useEffect(() => {
    if (testimonials.length > 1) startAutoplay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
    startAutoplay();
  };

  const prev = () =>
    goTo((activeIndex - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((activeIndex + 1) % testimonials.length);

  if (testimonials.length === 0) return null;

  const t = testimonials[activeIndex];

  return (
    <section className="py-20 px-4 bg-wood-950 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 wood-texture-overlay" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-12 h-px bg-gold-500" />
            <span className="text-gold-400 text-xs uppercase tracking-[0.3em] font-medium">
              What Our Customers Say
            </span>
            <span className="w-12 h-px bg-gold-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-playfair)]">
            Trusted by Collectors &amp; Designers
          </h2>
        </div>

        {/* Testimonial card */}
        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
          <Quote size={48} className="absolute top-6 left-6 text-gold-500/20" />

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Image side */}
            {t.imageUrl && (
              <div className="w-full md:w-1/3 aspect-square rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={t.imageUrl}
                  alt={`Project by ${t.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content side */}
            <div className={t.imageUrl ? "md:w-2/3" : "w-full"}>
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < t.rating
                        ? "text-gold-400 fill-gold-400"
                        : "text-white/20"
                    }
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-6 font-light italic">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Project type badge */}
              {t.projectType && (
                <span className="inline-block text-xs px-3 py-1 bg-white/10 text-gold-300 rounded-full mb-5 border border-white/10">
                  {t.projectType}
                </span>
              )}

              {/* Author */}
              <div className="flex items-center gap-4">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gold-500/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-temple-500 flex items-center justify-center text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold">{t.name}</p>
                  <div className="flex items-center gap-1.5 text-white/50 text-sm">
                    {t.role && <span>{t.role}</span>}
                    {t.role && t.location && (
                      <span className="text-white/30">•</span>
                    )}
                    {t.location && (
                      <span className="flex items-center gap-0.5">
                        <MapPin size={12} /> {t.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/10"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === activeIndex
                    ? "w-8 h-2 bg-gold-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            href="/testimonials"
            className="text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
          >
            View All Testimonials →
          </Link>
        </div>
      </div>
    </section>
  );
}
