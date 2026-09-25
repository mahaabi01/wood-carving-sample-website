import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import prisma from "@/lib/prisma";
import ShopContent from "@/components/ShopFilters";

export const metadata: Metadata = {
  title: "Shop — Handcrafted Wood Carvings",
  description:
    "Browse our collection of handcrafted Nepali & Indian wood carvings — temple doors, windows, sculptures, and architectural pieces.",
};

export default async function ShopPage() {
  // Fetch categories and in-stock products from DB
  const [dbCategories, dbProducts] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { inStock: true },
      include: {
        category: true,
        images: { orderBy: { isPrimary: "desc" } },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    }),
  ]);

  const categoryNames = ["All", ...dbCategories.map((c) => c.name)];

  const products = dbProducts.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    imageUrl: p.images[0]?.url || "/Maindoor/door1.jpeg",
    category: p.category?.name || "Uncategorized",
    material: p.material || "N/A",
  }));

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
