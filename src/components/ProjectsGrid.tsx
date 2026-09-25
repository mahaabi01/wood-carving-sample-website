"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Clock, ArrowRight, Award } from "lucide-react";

interface ProjectImage {
  id: string;
  url: string;
  caption: string | null;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  description: string;
  coverImage: string;
  images: ProjectImage[];
  category: string | null;
  materials: string | null;
  duration: string | null;
  year: string | null;
  featured: boolean;
}

export default function ProjectsGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      {/* Filter pills */}
      {categories.length > 2 && (
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-sm rounded-full border transition-all ${
                filter === cat
                  ? "bg-wood-900 text-white border-wood-900"
                  : "border-wood-200 text-wood-600 hover:border-gold-500 hover:text-gold-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="group bg-white rounded-2xl border border-wood-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Cover image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {p.featured && (
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-gold-500 text-white text-[10px] uppercase tracking-wider font-bold rounded-full">
                  <Award size={10} /> Featured
                </div>
              )}

              {p.category && (
                <span className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-wood-700 text-xs font-medium rounded-full">
                  {p.category}
                </span>
              )}

              {/* Hover overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="flex gap-3 text-white/80 text-xs">
                  {p.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {p.location}
                    </span>
                  )}
                  {p.year && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {p.year}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-1 group-hover:text-temple-600 transition-colors">
                {p.title}
              </h3>
              {p.client && (
                <p className="text-sm text-wood-400 mb-2">For {p.client}</p>
              )}
              <p className="text-sm text-wood-500 line-clamp-2 leading-relaxed mb-4">
                {p.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-wood-50">
                <div className="flex gap-4 text-xs text-wood-400">
                  {p.materials && <span>{p.materials}</span>}
                  {p.duration && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {p.duration}
                    </span>
                  )}
                </div>
                <span className="flex items-center gap-1 text-sm text-temple-500 font-medium group-hover:gap-2 transition-all">
                  View <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-wood-400 text-lg">
            No projects in this category yet
          </p>
        </div>
      )}
    </div>
  );
}
