import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Gallery | Om Wood Carving",
  description:
    "Browse our gallery of handcrafted wood carvings — main doors, furniture, tudal, and more.",
};

export default async function GalleryPage() {
  // Fetch categories from DB
  const dbCategories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });

  // Map to the shape gallery expects
  const categories = dbCategories.map((cat) => ({
    slug: cat.slug,
    title: cat.name,
    description:
      cat.description || `Browse our ${cat.name.toLowerCase()} collection.`,
    image: cat.imageUrl || "/Maindoor/door1.jpeg",
    count: cat._count.products,
  }));

  return (
    <div>
      <PageBanner
        title="Our Gallery"
        subtitle="Explore our portfolio of sacred woodcraft — each piece tells a story of heritage and devotion."
        imageUrl="/Maindoor/door5.jpg"
      />

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Collections"
            title="Browse by Category"
            subtitle="Discover our finest works organized by craft type."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/gallery/${cat.slug}`}
                className="group relative rounded-xl overflow-hidden shadow-lg aspect-[3/4] block"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-gold-400 text-xs font-semibold tracking-widest uppercase">
                    {cat.count} {cat.count === 1 ? "Piece" : "Pieces"}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 font-[family-name:var(--font-playfair)]">
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="white"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight reel */}
      <section className="py-16 bg-wood-50 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Featured"
            title="Highlights from Our Workshop"
            subtitle="A glimpse into the finest pieces created by our master artisans."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mt-12">
            {[
              "/Maindoor/door3.jpeg",
              "/Maindoor/door7.jpg",
              "/Maindoor/door11.jpg",
              "/Maindoor/door15.jpg",
              "/Maindoor/door19.jpg",
              "/Maindoor/door23.jpg",
              "/sample%20image/image3.jpg",
              "/sample%20image/image5.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className={`relative rounded-lg overflow-hidden shadow-md ${
                  i === 0 || i === 5
                    ? "row-span-2 aspect-[3/5]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={src}
                  alt={`Highlight piece ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-4">
            Have a Custom Vision?
          </h2>
          <p className="text-wood-500 mb-6">
            Share your ideas with us. We bring custom woodcraft visions to life
            with traditional artistry.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-temple-500 text-white rounded-lg hover:bg-temple-600 transition-colors font-medium"
          >
            Request a Custom Piece
          </Link>
        </div>
      </section>
    </div>
  );
}
