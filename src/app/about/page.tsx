import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "About Us — Master Artisans of Nepali Woodcraft",
  description:
    "Learn about Om Wood Carving — our story, mission, workshop, and the master artisans preserving Nepal's sacred wood carving heritage.",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About Us"
        subtitle="Master artisans preserving Nepal's sacred heritage since 1995"
        imageUrl="/Maindoor/door8.jpg"
      />

      {/* Who We Are */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-400/30 rounded-xl" />
            <Image
              src="/sample%20image/image2.jpg"
              alt="Om Wood Carving workshop"
              width={600}
              height={450}
              className="relative rounded-xl object-cover shadow-2xl w-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-gold-500" />
              <span className="text-gold-600 text-sm uppercase tracking-[0.2em] font-semibold">
                Who We Are
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-wood-900 mb-6 font-[family-name:var(--font-playfair)] leading-tight">
              Where Sacred Traditions
              <br />
              <span className="text-temple-500">Meet Master Craftsmanship</span>
            </h2>
            <p className="text-wood-600 leading-relaxed mb-4">
              Welcome to Om Wood Carving, nestled in the ancient artisan village
              of Bungamati, Lalitpur, Nepal. For over three decades, our family
              of skilled Newari craftsmen has been carrying forward a legacy
              that stretches back centuries.
            </p>
            <p className="text-wood-600 leading-relaxed">
              From restoring UNESCO World Heritage temples to creating bespoke
              pieces for international collectors and designers, every creation
              from our workshop embodies the soul of Nepali and Indian wood
              carving heritage — a perfect blend of devotion, skill, and
              artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-wood-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
          <div className="p-8 bg-white rounded-xl border border-wood-100 shadow-sm">
            <div className="w-12 h-12 bg-temple-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold text-wood-900 mb-3 font-[family-name:var(--font-playfair)]">
              Our Mission
            </h3>
            <p className="text-wood-600 leading-relaxed">
              To preserve and promote Nepal&apos;s centuries-old tradition of
              sacred wood carving, offering authentic, museum-quality creations
              that connect people across the world with our exceptional cultural
              heritage.
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl border border-wood-100 shadow-sm">
            <div className="w-12 h-12 bg-gold-50 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="text-2xl font-bold text-wood-900 mb-3 font-[family-name:var(--font-playfair)]">
              Our Vision
            </h3>
            <p className="text-wood-600 leading-relaxed">
              To be recognized globally as the premier destination for heritage
              woodcraft, blending ancient Newari techniques with contemporary
              design sensibilities to inspire generations.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Our Workshop"
            title="Where Heritage Takes Shape"
            subtitle="Step inside our workshop in Bungamati, where raw timber transforms into sacred art"
          />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/sample%20image/image6.jpg",
              "/sample%20image/image7.jpg",
              "/sample%20image/image8.jpg",
            ].map((src, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group"
              >
                <Image
                  src={src}
                  alt={`Workshop photo ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-wood-900">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12 font-[family-name:var(--font-playfair)]">
            What Guides Us
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🙏",
                title: "Authenticity",
                description:
                  "Every piece uses genuine traditional techniques and sacred motifs — no shortcuts, no compromises.",
              },
              {
                icon: "🌿",
                title: "Sustainability",
                description:
                  "We source only sustainably harvested timber and treat every piece of wood with reverence.",
              },
              {
                icon: "💎",
                title: "Excellence",
                description:
                  "Museum-quality craftsmanship is our standard. Each piece undergoes rigorous quality inspection.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-playfair)]">
                  {value.title}
                </h3>
                <p className="text-wood-400 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
