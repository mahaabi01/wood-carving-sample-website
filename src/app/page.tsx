import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductCard from "@/components/ProductCard";
import StatsSection from "@/components/StatsSection";
import SectionHeading from "@/components/SectionHeading";
import TestimonialsSection from "@/components/TestimonialsSection";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";

const craftHighlights = [
  {
    icon: "🪵",
    title: "Hand-Selected Wood",
    description:
      "We source premium Sal and Teak wood, aged and seasoned for durability that lasts centuries.",
  },
  {
    icon: "🔨",
    title: "Master Artisans",
    description:
      "Skilled Newari craftsmen with decades of experience in traditional temple carving techniques.",
  },
  {
    icon: "🏛️",
    title: "Heritage Designs",
    description:
      "Authentic patterns from Malla-era temples, Newari architecture, and sacred Hindu-Buddhist motifs.",
  },
  {
    icon: "🌍",
    title: "International Shipping",
    description:
      "We deliver our handcrafted masterpieces to collectors and designers across 5+ countries.",
  },
];

const galleryPreview = [
  { src: "/Maindoor/door3.jpeg", alt: "Ornate temple door carving" },
  { src: "/Maindoor/door5.jpg", alt: "Traditional wooden window" },
  { src: "/Maindoor/door7.jpg", alt: "Sacred wooden sculpture" },
  { src: "/Maindoor/door9.jpg", alt: "Heritage door panel" },
  { src: "/Maindoor/door11.jpg", alt: "Carved ceiling detail" },
  { src: "/Maindoor/door13.jpg", alt: "Decorative wall mandala" },
];

export default async function HomePage() {
  // Fetch featured/published testimonials for the homepage section
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 6,
  });

  // Fetch featured in-stock products for the homepage section
  const dbFeaturedProducts = await prisma.product.findMany({
    where: { inStock: true },
    include: { category: true, images: { orderBy: { isPrimary: "desc" } } },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 4,
  });

  const featuredProducts = dbFeaturedProducts.map((p) => ({
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
      <Hero />
      <AboutSection />

      {/* Craftsmanship Highlights */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Why Choose Us"
            title="The Art of Sacred Woodcraft"
            subtitle="Every piece is a labour of love — from selecting the finest timber to the final polish."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {craftHighlights.map((item) => (
              <div
                key={item.title}
                className="text-center p-6 rounded-xl border border-wood-100 hover:border-gold-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-wood-800 mb-2 font-[family-name:var(--font-playfair)]">
                  {item.title}
                </h3>
                <p className="text-sm text-wood-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 px-4 bg-wood-50">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              label="Our Collection"
              title="Featured Masterpieces"
              subtitle="Discover our finest handcrafted wood carvings — each a unique work of art."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/shop"
                className="inline-flex items-center px-8 py-3 bg-wood-900 text-white font-semibold rounded-lg hover:bg-wood-800 transition-colors"
              >
                View Full Collection →
              </Link>
            </div>
          </div>
        </section>
      )}

      <StatsSection />

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <TestimonialsSection
          testimonials={JSON.parse(JSON.stringify(testimonials))}
        />
      )}

      {/* Gallery Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Gallery"
            title="A Glimpse of Our Work"
            subtitle="From temple doors to intricate sculptures, witness the beauty of heritage woodcraft."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryPreview.map((img, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-wood-950/0 group-hover:bg-wood-950/40 transition-all duration-300" />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center px-8 py-3 border-2 border-wood-300 text-wood-700 font-semibold rounded-lg hover:border-gold-500 hover:text-gold-600 transition-colors"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Artisan Spotlight / CTA */}
      <section className="relative py-20 overflow-hidden">
        <Image
          src="/Maindoor/door15.jpg"
          alt="Wood carving artisan at work"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-wood-950/90 to-wood-950/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-gold-400" />
              <span className="text-gold-400 text-sm uppercase tracking-[0.2em]">
                Custom Orders
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)] leading-tight">
              Have a Vision?
              <br />
              <span className="text-gold-300">
                We&apos;ll Carve It Into Reality
              </span>
            </h2>
            <p className="text-wood-300 leading-relaxed mb-8 max-w-lg">
              Whether you&apos;re an interior designer, architect, temple
              builder, or a collector seeking something unique — our master
              artisans can bring any design to life. We welcome custom
              commissions of all sizes and ship internationally.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors shadow-lg"
              >
                Start a Custom Project
              </Link>
              <Link
                href="/team"
                className="px-8 py-3 border-2 border-gold-400 text-gold-400 font-semibold rounded-lg hover:bg-gold-400 hover:text-wood-900 transition-all"
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
