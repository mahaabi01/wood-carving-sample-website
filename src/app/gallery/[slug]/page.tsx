"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, X } from "lucide-react";
import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

const galleryData: Record<
  string,
  { title: string; description: string; images: GalleryImage[] }
> = {
  "main-doors": {
    title: "Main Doors",
    description:
      "Handcrafted wooden doors adorned with traditional Nepali motifs, sacred geometry, and cultural symbolism.",
    images: Array.from({ length: 38 }, (_, i) => {
      const num = i + 1;
      const ext = num <= 3 ? "jpeg" : "jpg";
      return {
        src: `/Maindoor/door${num}.${ext}`,
        alt: `Carved wooden door ${num}`,
      };
    }),
  },
  furniture: {
    title: "Furniture & Designs",
    description:
      "Bespoke furniture and decorative wood designs handcrafted by Om Wood Carving artisans.",
    images: [
      { src: "/Design/chair_design_1.jpg", alt: "Handcarved chair design" },
    ],
  },
  tudal: {
    title: "Tudal & Struts",
    description:
      "Traditional tudal (window frames) and temple struts featuring intricate mythological carvings.",
    images: [
      { src: "/Tudal/image1.jpg", alt: "Traditional Nepali tudal carving" },
    ],
  },
  samples: {
    title: "Sample Works",
    description:
      "A curated selection of sample woodwork demonstrating various carving styles and techniques.",
    images: Array.from({ length: 10 }, (_, i) => ({
      src: `/sample%20image/image${i + 1}.jpg`,
      alt: `Sample woodwork ${i + 1}`,
    })),
  },
};

export default function GalleryCategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const category = galleryData[slug];
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="text-3xl font-bold text-wood-800 mb-4 font-[family-name:var(--font-playfair)]">
          Category Not Found
        </h1>
        <p className="text-wood-500 mb-6">
          This gallery category doesn&apos;t exist.
        </p>
        <Link
          href="/gallery"
          className="px-6 py-3 bg-wood-900 text-white rounded-lg hover:bg-wood-800 transition-colors"
        >
          Back to Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-wood-500 hover:text-temple-500 transition-colors text-sm mb-6"
        >
          <ArrowLeft size={16} /> Back to Gallery
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
          {category.title}
        </h1>
        <p className="text-wood-500 mt-3 max-w-2xl text-lg">
          {category.description}
        </p>
        <p className="text-sm text-wood-400 mt-2">
          {category.images.length}{" "}
          {category.images.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
          {category.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className="block mb-3 md:mb-4 w-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer break-inside-avoid"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={800}
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                lightbox > 0 ? lightbox - 1 : category.images.length - 1,
              );
            }}
            className="absolute left-4 text-white/70 hover:text-white text-3xl z-10"
          >
            ‹
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={category.images[lightbox].src}
              alt={category.images[lightbox].alt}
              width={1200}
              height={900}
              className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              priority
            />
            <p className="text-center text-white/60 text-sm mt-3">
              {lightbox + 1} / {category.images.length}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                lightbox < category.images.length - 1 ? lightbox + 1 : 0,
              );
            }}
            className="absolute right-4 text-white/70 hover:text-white text-3xl z-10"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
