import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Heritage — Centuries of Sacred Wood Carving",
  description:
    "Explore the rich history of Nepali and Indian wood carving traditions — from ancient temple architecture to modern masterpieces.",
};

const timeline = [
  {
    era: "Ancient Period",
    year: "5th Century",
    title: "Origins of Newari Woodcraft",
    description:
      "Wood carving in the Kathmandu Valley traces back to the Licchavi period. Early artisans created religious icons and temple decorations using primitive tools.",
    imageUrl: "/Maindoor/door3.jpeg",
  },
  {
    era: "Malla Period",
    year: "12th–18th Century",
    title: "The Golden Era of Temple Architecture",
    description:
      "Under the Malla kings, wood carving reached its zenith. The Durbar Squares of Kathmandu, Patan, and Bhaktapur showcase exquisite woodwork — intricately carved struts, windows, and torana that remain marvels of craftsmanship.",
    imageUrl: "/Maindoor/door5.jpg",
  },
  {
    era: "Shah Period",
    year: "18th–20th Century",
    title: "Preserving Traditions",
    description:
      "After unification, Newari craftsmen continued their traditions, passing skills from father to son. Their techniques became cultural treasures, recognized by UNESCO World Heritage designations.",
    imageUrl: "/Maindoor/door7.jpg",
  },
  {
    era: "Modern Era",
    year: "21st Century",
    title: "Revival & Global Recognition",
    description:
      "Today, master artisans like our team at Om Wood Carving blend ancient techniques with modern sensibilities. Our pieces reach collectors and designers across 5+ countries, keeping this sacred heritage alive.",
    imageUrl: "/Maindoor/door9.jpg",
  },
];

const techniques = [
  {
    name: "Chip Carving",
    description:
      "Removing small chips of wood to create geometric patterns — one of the oldest carving techniques.",
  },
  {
    name: "Relief Carving",
    description:
      "Sculpting figures that project from a flat background, used extensively in temple struts and torana.",
  },
  {
    name: "Lathe Turning",
    description:
      "Spinning wood on a lathe to create symmetrical shapes — pillars, balusters, and decorative spindles.",
  },
  {
    name: "Pierced Carving",
    description:
      "Cutting completely through the wood to create intricate openwork patterns, seen in traditional windows.",
  },
];

export default function HeritagePage() {
  return (
    <>
      <PageBanner
        title="Our Heritage"
        subtitle="Centuries of sacred woodcraft traditions preserved through generations"
        imageUrl="/Maindoor/door7.jpg"
      />

      {/* Introduction */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeading
            label="Living Tradition"
            title="The Soul of Nepali & Indian Woodcraft"
          />
          <p className="text-wood-600 leading-relaxed text-lg">
            For over a thousand years, the Kathmandu Valley has been a cradle of
            extraordinary wood carving artistry. From the sacred temples of
            Bhaktapur to the ornate palaces of Patan, every carved beam, window,
            and strut tells a story of devotion, skill, and cultural identity.
            At Om Wood Carving, we are the inheritors of this magnificent
            tradition.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-wood-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Through the Ages"
            title="A Journey Through Time"
            subtitle="From ancient Licchavi carvings to modern heritage restoration"
          />

          <div className="space-y-16">
            {timeline.map((item, i) => (
              <div
                key={item.era}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  i % 2 === 1 ? "md:direction-rtl" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-gold-100 text-gold-700 text-xs font-semibold rounded-full">
                      {item.era}
                    </span>
                    <span className="text-wood-400 text-sm">{item.year}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-wood-900 mb-3 font-[family-name:var(--font-playfair)]">
                    {item.title}
                  </h3>
                  <p className="text-wood-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Craftsmanship"
            title="Traditional Techniques"
            subtitle="Ancient methods preserved and practiced by our master artisans"
          />

          <div className="grid sm:grid-cols-2 gap-8">
            {techniques.map((tech) => (
              <div
                key={tech.name}
                className="p-6 bg-wood-50 rounded-xl border border-wood-100 hover:border-gold-300 transition-colors"
              >
                <h3 className="text-xl font-bold text-wood-800 mb-2 font-[family-name:var(--font-playfair)]">
                  {tech.name}
                </h3>
                <p className="text-wood-500 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-wood-900 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
            Become Part of This Heritage
          </h2>
          <p className="text-wood-300 mb-8">
            Own a piece of living history. Each carving carries the soul of
            centuries-old traditions.
          </p>
          <Link
            href="/shop"
            className="inline-flex px-8 py-3 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors"
          >
            Explore Our Collection
          </Link>
        </div>
      </section>
    </>
  );
}
