"use client";

import { useState } from "react";
import { Star, Quote, MapPin, ChevronDown } from "lucide-react";

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
  featured: boolean;
}

export default function TestimonialsGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("all");

  const projectTypes = [
    "all",
    ...new Set(
      testimonials.map((t) => t.projectType).filter(Boolean) as string[],
    ),
  ];

  const filtered =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.projectType === filter);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div>
      {/* Filter pills */}
      {projectTypes.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                setShowAll(false);
              }}
              className={`px-4 py-2 text-sm rounded-full border transition-all ${
                filter === type
                  ? "bg-wood-900 text-white border-wood-900"
                  : "border-wood-200 text-wood-600 hover:border-gold-500 hover:text-gold-600"
              }`}
            >
              {type === "all" ? "All Reviews" : type}
            </button>
          ))}
        </div>
      )}

      {/* Masonry-style grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {displayed.map((t) => (
          <div
            key={t.id}
            className={`break-inside-avoid bg-white rounded-2xl border overflow-hidden transition-shadow hover:shadow-xl ${
              t.featured
                ? "border-gold-300 shadow-gold-100 shadow-md"
                : "border-wood-100 shadow-sm"
            }`}
          >
            {/* Product image if available */}
            {t.imageUrl && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={t.imageUrl}
                  alt={`${t.name}'s project`}
                  className="w-full h-full object-cover"
                />
                {t.featured && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-gold-500 text-white text-[10px] uppercase tracking-wider font-bold rounded-full">
                    Featured
                  </div>
                )}
              </div>
            )}

            <div className="p-6">
              {/* Quote icon */}
              <Quote
                size={28}
                className={`mb-3 ${
                  t.featured ? "text-gold-400" : "text-wood-200"
                }`}
              />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < t.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-200"
                    }
                  />
                ))}
              </div>

              {/* Review text */}
              <p className="text-wood-700 text-sm leading-relaxed mb-4">
                &ldquo;{t.review}&rdquo;
              </p>

              {/* Project type badge */}
              {t.projectType && (
                <span className="inline-block text-[11px] px-3 py-1 bg-wood-50 text-wood-500 rounded-full mb-4 border border-wood-100">
                  {t.projectType}
                </span>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-wood-50">
                {t.avatarUrl ? (
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-wood-100"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-temple-500 flex items-center justify-center text-white text-sm font-bold">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-wood-800">
                    {t.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-wood-400">
                    {t.role && <span>{t.role}</span>}
                    {t.role && t.location && <span>•</span>}
                    {t.location && (
                      <span className="flex items-center gap-0.5">
                        <MapPin size={10} /> {t.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show more */}
      {!showAll && filtered.length > 6 && (
        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-wood-300 text-wood-700 font-semibold rounded-lg hover:border-gold-500 hover:text-gold-600 transition-colors"
          >
            Show All Reviews ({filtered.length})
            <ChevronDown size={18} />
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-wood-400 text-lg">No testimonials yet</p>
        </div>
      )}
    </div>
  );
}
