"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  category?: string;
  material?: string;
  currency?: string;
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  imageUrl,
  category,
  material,
  currency = "NPR",
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-wood-100">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-wood-100">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 bg-wood-950/0 group-hover:bg-wood-950/30 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <Link
            href={`/shop/${slug}`}
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-wood-800 hover:bg-gold-400 hover:text-wood-950 transition-all shadow-lg"
            aria-label="View details"
          >
            <Eye size={18} />
          </Link>
          <button
            onClick={() =>
              addItem({ id, name, slug, price, imageUrl, currency })
            }
            className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-wood-800 hover:bg-temple-500 hover:text-white transition-all shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Category badge */}
        {category && (
          <span className="absolute top-3 left-3 bg-wood-950/70 text-gold-400 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {category}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {material && (
          <p className="text-xs text-wood-400 uppercase tracking-wider mb-1">
            {material}
          </p>
        )}
        <h3 className="font-semibold text-wood-800 font-[family-name:var(--font-playfair)] line-clamp-2 mb-2">
          {name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-temple-500 font-bold text-lg">
            {formatPrice(price, currency)}
          </p>
          <Link
            href={`/shop/${slug}`}
            className="text-xs text-wood-500 hover:text-temple-500 transition-colors underline underline-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
