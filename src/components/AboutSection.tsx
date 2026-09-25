import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="py-20 px-4 bg-wood-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image with decorative frame */}
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-400/30 rounded-xl" />
          <Image
            src="/sample%20image/image2.jpg"
            alt="Om Wood Carving artisan workshop in Lalitpur, Nepal"
            width={600}
            height={450}
            className="relative rounded-xl object-cover shadow-2xl w-full"
          />
          {/* Experience badge */}
          <div className="absolute bottom-4 right-4 md:-bottom-6 md:-right-6 bg-wood-900 text-white px-6 py-4 rounded-xl shadow-xl">
            <p className="text-3xl font-bold text-gold-400 font-[family-name:var(--font-playfair)]">
              30+
            </p>
            <p className="text-xs uppercase tracking-wider text-wood-300">
              Years of Craft
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gold-500" />
            <span className="text-gold-600 text-sm uppercase tracking-[0.2em] font-semibold">
              Our Story
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-wood-900 mb-6 font-[family-name:var(--font-playfair)] leading-tight">
            Preserving Sacred Heritage,
            <br />
            <span className="text-temple-500">One Carving at a Time</span>
          </h2>

          <p className="text-wood-600 leading-relaxed mb-4">
            Welcome to Om Wood Carving, where ancient Newari traditions meet
            masterful craftsmanship in the heritage city of Lalitpur, Nepal. For
            over three decades, our artisans have been breathing life into
            sacred wood — creating temple doors, ornate windows, divine
            sculptures, and architectural marvels.
          </p>

          <p className="text-wood-600 leading-relaxed mb-8">
            Each piece we create carries the soul of centuries-old Nepali and
            Indian wood carving traditions, meticulously handcrafted using
            techniques passed down through generations of master carvers.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/about"
              className="px-6 py-3 bg-wood-900 text-white font-semibold rounded-lg hover:bg-wood-800 transition-colors"
            >
              Read Our Story
            </Link>
            <Link
              href="/heritage"
              className="px-6 py-3 border-2 border-wood-300 text-wood-700 font-semibold rounded-lg hover:border-gold-500 hover:text-gold-600 transition-colors"
            >
              Explore Heritage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
