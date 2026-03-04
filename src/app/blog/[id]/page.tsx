"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

const blogPosts = [
  {
    slug: "history-of-wood-carving",
    title: "The Ancient History of Wood Carving",
    content:
      "Wood carving is an ancient art form practiced across many cultures. From the intricate religious sculptures of medieval Europe to the tribal masks of Africa and Oceania, wood carving has served both functional and decorative purposes.\n\nIn the Kathmandu Valley of Nepal, wood carving has a particularly rich history dating back to the Licchavi period (5th-8th centuries). The Newari people developed an extraordinary tradition of architectural woodwork — creating elaborate temple struts, torana, windows, and doors.\n\nThe Malla period (12th-18th centuries) saw wood carving reach its zenith. The Durbar Squares of Kathmandu, Patan, and Bhaktapur became showcases of this artistry.\n\nToday, master carvers like those at Om Wood Carving continue these traditions, ensuring the sacred art of Nepali woodcraft endures for future generations.",
    coverImage: "/Maindoor/door3.jpeg",
    date: "2025-08-01",
    tags: ["History", "Culture"],
    author: "Om Wood Carving",
  },
  {
    slug: "tools-used-in-wood-carving",
    title: "Essential Tools Used in Wood Carving",
    content:
      "Carving tools vary depending on the style and complexity of the work. Each tool serves a specific purpose, and master artisans develop intimate relationships with their tools over decades.\n\nChisels are the backbone of any carver's toolkit. Flat chisels create smooth surfaces, while curved chisels (gouges) are used for detailed work.\n\nGouges come in different sweeps — from nearly flat to deeply curved. They're the workhorses of decorative carving.\n\nSpecialized tools like veiners and V-tools help achieve fine details. At Om Wood Carving, we use a combination of traditional hand tools and modern precision instruments.",
    coverImage: "/Maindoor/door6.jpg",
    date: "2025-08-05",
    tags: ["Tools", "Techniques"],
    author: "Om Wood Carving",
  },
  {
    slug: "care-and-maintenance-of-wooden-art",
    title: "Care and Maintenance of Wooden Art",
    content:
      "To keep wooden art looking beautiful for generations, proper care and maintenance are essential.\n\nRegular dusting with a soft, dry cloth prevents buildup. For intricate carvings, use a soft-bristled brush.\n\nAvoid direct sunlight and heat sources. Humidity control is crucial — maintain relative humidity between 40-60%.\n\nOccasionally treat pieces with appropriate wood oils. For antique pieces, professional restoration may be necessary.",
    coverImage: "/Maindoor/door8.jpg",
    date: "2025-08-10",
    tags: ["Care", "Tips"],
    author: "Om Wood Carving",
  },
  {
    slug: "types-of-wood-for-carving",
    title: "Best Types of Wood for Carving",
    content:
      "Different woods offer different carving experiences. Choosing the right wood is crucial.\n\nSal Wood is the traditional choice in Nepal — hard, durable, and resistant to insects.\n\nTeak is prized for beauty, durability, and natural protective oils.\n\nWalnut offers beautiful grain patterns and a warm, rich color.\n\nAt Om Wood Carving, we primarily work with Sal and Teak woods, sourced sustainably.",
    coverImage: "/Maindoor/door10.jpg",
    date: "2025-08-15",
    tags: ["Materials", "Guide"],
    author: "Om Wood Carving",
  },
  {
    slug: "wood-carving-in-cultural-tourism",
    title: "Wood Carving in Cultural Tourism",
    content:
      "Wood carving plays a vital role in cultural tourism, particularly in Nepal.\n\nVisitors are drawn to traditional workshops and heritage sites. Workshop visits offer an intimate look at the craft.\n\nCultural tourism is vital for keeping traditional crafts alive. When travelers purchase authentic pieces, they directly support artisan communities.",
    coverImage: "/Maindoor/door12.jpg",
    date: "2025-08-20",
    tags: ["Tourism", "Culture"],
    author: "Om Wood Carving",
  },
  {
    slug: "starting-a-wood-carving-business",
    title: "Starting a Wood Carving Business",
    content:
      "Launching a wood carving business involves mastering both craft and business.\n\nBranding is crucial — authenticity and story are your greatest assets.\n\nAn online presence is essential for reaching global audiences.\n\nSustainable sourcing is both an ethical imperative and a market differentiator.",
    coverImage: "/Maindoor/door14.jpg",
    date: "2025-08-25",
    tags: ["Business", "Guide"],
    author: "Om Wood Carving",
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.id as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <h1 className="text-3xl font-bold text-wood-800 mb-4 font-[family-name:var(--font-playfair)]">
          Post Not Found
        </h1>
        <p className="text-wood-500 mb-6">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 bg-wood-900 text-white rounded-lg hover:bg-wood-800 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-wood-500 hover:text-temple-500 transition-colors text-sm"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="relative aspect-[2/1] rounded-xl overflow-hidden shadow-xl">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 pb-16">
        <div className="flex gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-wood-100 text-wood-600 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-wood-900 mb-4 font-[family-name:var(--font-playfair)] leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 text-sm text-wood-400 border-b border-wood-100 pb-6">
          <span>By {post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((p, i) => (
            <p key={i} className="text-wood-600 leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>

        <div className="mt-12 p-8 bg-wood-50 rounded-xl border border-wood-100 text-center">
          <h3 className="text-xl font-bold text-wood-900 mb-2 font-[family-name:var(--font-playfair)]">
            Interested in Our Woodcraft?
          </h3>
          <p className="text-wood-500 mb-4">
            Explore our handcrafted collection or get in touch for custom
            pieces.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="px-6 py-2 bg-temple-500 text-white rounded-lg hover:bg-temple-600 transition-colors"
            >
              View Collection
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 border-2 border-wood-300 text-wood-700 rounded-lg hover:border-gold-500 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
