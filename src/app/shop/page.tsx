import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import prisma from "@/lib/prisma";
import ShopContent from "@/components/ShopFilters";

export const metadata: Metadata = {
  title: "Shop — Handcrafted Wood Carvings",
  description:
    "Browse our collection of handcrafted Nepali & Indian wood carvings — temple doors, windows, sculptures, and architectural pieces.",
};

// Products data (will come from Prisma in production)
const products = [
  {
    id: "1",
    name: "Wood Carving Art Piece",
    slug: "wood-carving-art-piece",
    price: 1500,
    imageUrl: "/Maindoor/door1.jpeg",
    category: "Sculpture",
    material: "Sal Wood",
  },
  {
    id: "2",
    name: "Wooden Wall Panel",
    slug: "wooden-wall-panel",
    price: 2500,
    imageUrl: "/Maindoor/door2.jpeg",
    category: "Panels",
    material: "Teak Wood",
  },
  {
    id: "3",
    name: "Decorative Wood Bowl",
    slug: "decorative-wood-bowl",
    price: 1200,
    imageUrl: "/Maindoor/door3.jpeg",
    category: "Decor",
    material: "Walnut",
  },
  {
    id: "4",
    name: "Traditional Window Frame",
    slug: "traditional-wooden-window-frame",
    price: 5500,
    imageUrl: "/Maindoor/door4.jpg",
    category: "Windows",
    material: "Sal Wood",
  },
  {
    id: "5",
    name: "Wooden Temple Door",
    slug: "wooden-temple-door",
    price: 8500,
    imageUrl: "/Maindoor/door5.jpg",
    category: "Doors",
    material: "Teak Wood",
  },
  {
    id: "6",
    name: "Carved Wooden Mask",
    slug: "carved-wooden-mask",
    price: 3200,
    imageUrl: "/Maindoor/door6.jpg",
    category: "Sculpture",
    material: "Sal Wood",
  },
  {
    id: "7",
    name: "Wooden Jewelry Box",
    slug: "wooden-jewelry-box",
    price: 1800,
    imageUrl: "/Maindoor/door7.jpg",
    category: "Decor",
    material: "Rosewood",
  },
  {
    id: "8",
    name: "Wooden Buddha Statue",
    slug: "wooden-buddha-statue",
    price: 4500,
    imageUrl: "/Maindoor/door8.jpg",
    category: "Sculpture",
    material: "Sal Wood",
  },
  {
    id: "9",
    name: "Carved Ceiling Panel",
    slug: "carved-wooden-ceiling-panel",
    price: 7200,
    imageUrl: "/Maindoor/door9.jpg",
    category: "Panels",
    material: "Teak Wood",
  },
  {
    id: "10",
    name: "Wooden Elephant Sculpture",
    slug: "wooden-elephant-sculpture",
    price: 3900,
    imageUrl: "/Maindoor/door10.jpg",
    category: "Sculpture",
    material: "Sal Wood",
  },
  {
    id: "11",
    name: "Traditional Wooden Chair",
    slug: "traditional-wooden-chair",
    price: 2800,
    imageUrl: "/Maindoor/door11.jpg",
    category: "Furniture",
    material: "Teak Wood",
  },
  {
    id: "12",
    name: "Wooden Serving Tray",
    slug: "wooden-serving-tray",
    price: 1600,
    imageUrl: "/Maindoor/door12.jpg",
    category: "Decor",
    material: "Walnut",
  },
];

export default async function ShopPage() {
  // Fetch categories from DB
  const dbCategories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
  const categoryNames = ["All", ...dbCategories.map((c) => c.name)];

  return (
    <>
      <PageBanner
        title="Our Collection"
        subtitle="Handcrafted wood carvings made with centuries-old Nepali & Indian techniques"
        imageUrl="/Maindoor/door5.jpg"
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Dynamic category filters + products */}
          <ShopContent categories={categoryNames} products={products} />

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border-2 border-wood-300 text-wood-700 font-semibold rounded-lg hover:border-gold-500 hover:text-gold-600 transition-colors">
              Load More Products
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
