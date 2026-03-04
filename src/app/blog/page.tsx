import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";

import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Wood Carving Insights & Heritage Stories",
  description:
    "Read about wood carving techniques, cultural heritage, artisan stories, and the art of Nepali and Indian woodcraft.",
};

const blogPosts = [
  {
    id: 1,
    slug: "history-of-wood-carving",
    title: "The Ancient History of Wood Carving",
    excerpt:
      "Wood carving is an ancient art form practiced across many cultures. From the intricate religious sculptures of medieval Europe to the tribal masks of Africa and Oceania...",
    content: "Wood carving is an ancient art form...",
    coverImage: "/Maindoor/door3.jpeg",
    date: "2025-08-01",
    tags: ["History", "Culture"],
    author: "Om Wood Carving",
  },
  {
    id: 2,
    slug: "tools-used-in-wood-carving",
    title: "Essential Tools Used in Wood Carving",
    excerpt:
      "Carving tools vary depending on the style and complexity of the work. Some common tools include chisels, gouges, mallets, and knives...",
    content: "Carving tools vary...",
    coverImage: "/Maindoor/door6.jpg",
    date: "2025-08-05",
    tags: ["Tools", "Techniques"],
    author: "Om Wood Carving",
  },
  {
    id: 3,
    slug: "care-and-maintenance-of-wooden-art",
    title: "Care and Maintenance of Wooden Art",
    excerpt:
      "To keep wooden art looking beautiful, it is important to regularly dust, avoid direct sunlight, and occasionally treat with wood oils...",
    content: "To keep wooden art...",
    coverImage: "/Maindoor/door8.jpg",
    date: "2025-08-10",
    tags: ["Care", "Tips"],
    author: "Om Wood Carving",
  },
  {
    id: 4,
    slug: "types-of-wood-for-carving",
    title: "Best Types of Wood for Carving",
    excerpt:
      "Different woods offer different carving experiences. Basswood and butternut are soft and ideal for beginners. Hardwoods like oak provide durability...",
    content: "Different woods offer...",
    coverImage: "/Maindoor/door10.jpg",
    date: "2025-08-15",
    tags: ["Materials", "Guide"],
    author: "Om Wood Carving",
  },
  {
    id: 5,
    slug: "wood-carving-in-cultural-tourism",
    title: "Wood Carving in Cultural Tourism",
    excerpt:
      "Wood carving plays a vital role in cultural tourism. Visitors are drawn to traditional workshops, heritage sites, and local markets...",
    content: "Wood carving plays...",
    coverImage: "/Maindoor/door12.jpg",
    date: "2025-08-20",
    tags: ["Tourism", "Culture"],
    author: "Om Wood Carving",
  },
  {
    id: 6,
    slug: "starting-a-wood-carving-business",
    title: "Starting a Wood Carving Business",
    excerpt:
      "Launching a wood carving business involves more than mastering the craft. Entrepreneurs must consider branding, online presence, pricing strategies...",
    content: "Launching a wood carving...",
    coverImage: "/Maindoor/door14.jpg",
    date: "2025-08-25",
    tags: ["Business", "Guide"],
    author: "Om Wood Carving",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageBanner
        title="Our Blog"
        subtitle="Stories, insights, and wisdom from the world of wood carving"
        imageUrl="/Maindoor/door10.jpg"
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured Post */}
          <div className="mb-16">
            <Link href={`/blog/${blogPosts[0].slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-lg border border-wood-100 hover:shadow-xl transition-shadow">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image
                    src={blogPosts[0].coverImage}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <span className="absolute top-4 left-4 bg-temple-500 text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex gap-2 mb-3">
                    {blogPosts[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-wood-100 text-wood-600 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-wood-900 mb-3 group-hover:text-temple-500 transition-colors font-[family-name:var(--font-playfair)]">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-wood-500 mb-4">{blogPosts[0].excerpt}</p>
                  <p className="text-sm text-wood-400">
                    {formatDate(blogPosts[0].date)}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md border border-wood-100 hover:shadow-xl transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex gap-2 mb-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-wood-100 text-wood-500 px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-bold text-wood-800 mb-2 group-hover:text-temple-500 transition-colors font-[family-name:var(--font-playfair)]">
                    {post.title}
                  </h3>
                  <p className="text-sm text-wood-500 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-wood-400">
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
