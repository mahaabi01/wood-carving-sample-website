"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShoppingBag, Ruler, Weight, Clock, User } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

// Product data (will come from Prisma in production)
const products = [
  {
    id: "1",
    name: "Wood Carving Art Piece",
    slug: "wood-carving-art-piece",
    description:
      "A masterfully handcrafted wooden sculpture featuring intricate Nepali temple motifs. This art piece showcases the traditional carving techniques passed down through generations of Newari artisans.",
    price: 1500,
    imageUrl: "/Maindoor/door1.jpeg",
    category: "Sculpture",
    material: "Sal Wood",
    dimensions: "30x20x15 cm",
    weight: "2.5 kg",
    craftTime: "2 weeks",
    artisan: "Master Rajesh Kumar",
  },
  {
    id: "2",
    name: "Wooden Wall Panel",
    slug: "wooden-wall-panel",
    description:
      "Beautiful hand-carved wall panel featuring traditional floral and geometric patterns inspired by Malla-era temple architecture.",
    price: 2500,
    imageUrl: "/Maindoor/door2.jpeg",
    category: "Panels",
    material: "Teak Wood",
    dimensions: "60x40x5 cm",
    weight: "4 kg",
    craftTime: "3 weeks",
    artisan: "Vikram Patel",
  },
  {
    id: "3",
    name: "Decorative Wood Bowl",
    slug: "decorative-wood-bowl",
    description:
      "A unique decorative bowl carved from premium walnut wood. Features traditional Nepali designs etched along the rim.",
    price: 1200,
    imageUrl: "/Maindoor/door3.jpeg",
    category: "Decor",
    material: "Walnut",
    dimensions: "25x25x10 cm",
    weight: "1 kg",
    craftTime: "1 week",
    artisan: "Anita Singh",
  },
  {
    id: "4",
    name: "Traditional Window Frame",
    slug: "traditional-wooden-window-frame",
    description:
      "Intricately carved wooden window frame inspired by traditional Nepali Newari architecture with peacock motifs and sacred geometric patterns.",
    price: 5500,
    imageUrl: "/Maindoor/door4.jpg",
    category: "Windows",
    material: "Sal Wood",
    dimensions: "120x80x15 cm",
    weight: "12 kg",
    craftTime: "4 weeks",
    artisan: "Master Rajesh Kumar",
  },
  {
    id: "5",
    name: "Wooden Temple Door",
    slug: "wooden-temple-door",
    description:
      "Handcrafted wooden temple-style door with religious motifs featuring deities and sacred symbols.",
    price: 8500,
    imageUrl: "/Maindoor/door5.jpg",
    category: "Doors",
    material: "Teak Wood",
    dimensions: "200x100x10 cm",
    weight: "45 kg",
    craftTime: "6 weeks",
    artisan: "Master Rajesh Kumar",
  },
  {
    id: "6",
    name: "Carved Wooden Mask",
    slug: "carved-wooden-mask",
    description:
      "Traditional wooden mask used in cultural dances and rituals, hand-carved with expressive features.",
    price: 3200,
    imageUrl: "/Maindoor/door6.jpg",
    category: "Sculpture",
    material: "Sal Wood",
    dimensions: "35x25x15 cm",
    weight: "1.5 kg",
    craftTime: "2 weeks",
    artisan: "Suman Rao",
  },
  {
    id: "7",
    name: "Wooden Jewelry Box",
    slug: "wooden-jewelry-box",
    description:
      "Decorative jewelry storage box with fine carvings featuring intricate lotus patterns.",
    price: 1800,
    imageUrl: "/Maindoor/door7.jpg",
    category: "Decor",
    material: "Rosewood",
    dimensions: "20x15x10 cm",
    weight: "0.8 kg",
    craftTime: "1 week",
    artisan: "Anita Singh",
  },
  {
    id: "8",
    name: "Wooden Buddha Statue",
    slug: "wooden-buddha-statue",
    description:
      "Sacred wooden Buddha statue carved with peaceful expressions — a perfect meditation companion.",
    price: 4500,
    imageUrl: "/Maindoor/door8.jpg",
    category: "Sculpture",
    material: "Sal Wood",
    dimensions: "40x20x15 cm",
    weight: "3 kg",
    craftTime: "3 weeks",
    artisan: "Vikram Patel",
  },
  {
    id: "9",
    name: "Carved Ceiling Panel",
    slug: "carved-wooden-ceiling-panel",
    description:
      "Decorative ceiling panel with traditional floral patterns, designed for heritage-style interiors.",
    price: 7200,
    imageUrl: "/Maindoor/door9.jpg",
    category: "Panels",
    material: "Teak Wood",
    dimensions: "100x100x8 cm",
    weight: "15 kg",
    craftTime: "5 weeks",
    artisan: "Master Rajesh Kumar",
  },
  {
    id: "10",
    name: "Wooden Elephant Sculpture",
    slug: "wooden-elephant-sculpture",
    description:
      "Symbolic elephant sculpture — elephants represent wisdom, power, and good fortune in Nepali culture.",
    price: 3900,
    imageUrl: "/Maindoor/door10.jpg",
    category: "Sculpture",
    material: "Sal Wood",
    dimensions: "30x25x20 cm",
    weight: "3.5 kg",
    craftTime: "2 weeks",
    artisan: "Suman Rao",
  },
  {
    id: "11",
    name: "Traditional Wooden Chair",
    slug: "traditional-wooden-chair",
    description:
      "Classic wooden chair with hand-carved backrest and legs featuring traditional Nepali aesthetics.",
    price: 2800,
    imageUrl: "/Maindoor/door11.jpg",
    category: "Furniture",
    material: "Teak Wood",
    dimensions: "90x45x45 cm",
    weight: "8 kg",
    craftTime: "3 weeks",
    artisan: "Vikram Patel",
  },
  {
    id: "12",
    name: "Wooden Serving Tray",
    slug: "wooden-serving-tray",
    description:
      "Functional serving tray with carved peacock handles — a symbol of beauty in Nepali art.",
    price: 1600,
    imageUrl: "/Maindoor/door12.jpg",
    category: "Decor",
    material: "Walnut",
    dimensions: "40x25x5 cm",
    weight: "1.2 kg",
    craftTime: "1 week",
    artisan: "Anita Singh",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const product = products.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);

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
  ];

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
            <span className="absolute top-4 left-4 bg-wood-950/70 text-gold-400 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
              {product.category}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-wood-400 uppercase tracking-wider mb-1">
                {product.material}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                {product.name}
              </h1>
            </div>

            <p className="text-2xl font-bold text-temple-500">
              {formatPrice(product.price)}
            </p>
            <p className="text-wood-600 leading-relaxed">
              {product.description}
            </p>

            {/* Specs */}
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
