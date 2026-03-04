import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function PageBanner({
  title,
  subtitle,
  imageUrl = "/Maindoor/door2.jpeg",
}: PageBannerProps) {
  return (
    <section className="relative h-[300px] md:h-[400px]">
      <Image
        src={imageUrl}
        alt={title}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-wood-950/70 to-wood-950/80" />
      <div className="absolute inset-0 wood-texture-overlay" />

      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-px bg-gold-400" />
          <span className="text-gold-400 text-xs uppercase tracking-[0.3em]">
            Om Wood Carving
          </span>
          <span className="w-10 h-px bg-gold-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white font-[family-name:var(--font-playfair)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-wood-300 max-w-xl text-lg">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
