"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, Ruler, Weight, Clock, User } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  imageUrl: string;
  category: string | null;
  material: string | null;
  dimensions: string | null;
  weight: string | null;
  craftTime: string | null;
  artisan: string | null;
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const addItem = useCartStore((s) => s.addItem);
  const [product, setProduct] = useState<Product | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/products/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setProduct(null);
          return;
        }
        setProduct({
          id: data.id,
          name: data.name,
          slug: data.slug,
          description: data.description,
          price: Number(data.price),
          imageUrl: data.images?.[0]?.url || "/Maindoor/door1.jpeg",
          category: data.category?.name || null,
          material: data.material,
          dimensions: data.dimensions,
          weight: data.weight,
          craftTime: data.craftTime,
          artisan: data.artisan,
        });
      })
      .catch(() => !cancelled && setProduct(null));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (product === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-wood-400">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="text-3xl font-bold text-wood-800 mb-4 font-[family-name:var(--font-playfair)]">
          Product Not Found
        </h1>
        <p className="text-wood-500 mb-6">
          The product you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-wood-900 text-white rounded-lg hover:bg-wood-800 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const specs = [
    { icon: Ruler, label: "Dimensions", value: product.dimensions },
    { icon: Weight, label: "Weight", value: product.weight },
    { icon: Clock, label: "Craft Time", value: product.craftTime },
    { icon: User, label: "Artisan", value: product.artisan },
  ].filter((s) => s.value);

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-wood-400">
          <Link href="/" className="hover:text-gold-500">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gold-500">
            Shop
          </Link>
          <span>/</span>
          <span className="text-wood-700">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-wood-100 shadow-xl">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.category && (
              <span className="absolute top-4 left-4 bg-wood-950/70 text-gold-400 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                {product.category}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              {product.material && (
                <p className="text-xs text-wood-400 uppercase tracking-wider mb-1">
                  {product.material}
                </p>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                {product.name}
              </h1>
            </div>

            <p className="text-2xl font-bold text-temple-500">
              {formatPrice(product.price)}
            </p>
            {product.description && (
              <p className="text-wood-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Specs */}
            {specs.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center gap-3 p-3 bg-wood-50 rounded-lg border border-wood-100"
                  >
                    <spec.icon
                      size={18}
                      className="text-gold-500 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs text-wood-400">{spec.label}</p>
                      <p className="text-sm font-semibold text-wood-700">
                        {spec.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() =>
                  addItem({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    currency: "NPR",
                  })
                }
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors shadow-lg"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </button>
              <Link
                href="/contact"
                className="flex-1 text-center px-6 py-4 border-2 border-wood-300 text-wood-700 font-semibold rounded-lg hover:border-gold-500 hover:text-gold-600 transition-colors"
              >
                Inquire About This Piece
              </Link>
            </div>

            {/* Trust */}
            <div className="border-t border-wood-100 pt-6 space-y-2 text-sm text-wood-500">
              <p>✓ 100% Handcrafted by master artisans</p>
              <p>✓ Premium quality wood, seasoned for longevity</p>
              <p>✓ International shipping available</p>
              <p>✓ Custom sizing available on request</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
