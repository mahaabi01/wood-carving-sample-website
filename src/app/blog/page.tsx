import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import prisma from "@/lib/prisma";

import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog — Wood Carving Insights & Heritage Stories",
  description:
    "Read about wood carving techniques, cultural heritage, artisan stories, and the art of Nepali and Indian woodcraft.",
};

export default async function BlogPage() {
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  if (blogPosts.length === 0) {
    return (
      <>
        <PageBanner
          title="Our Blog"
          subtitle="Stories, insights, and wisdom from the world of wood carving"
          imageUrl="/Maindoor/door10.jpg"
        />
        <section className="py-24 px-4 text-center">
          <p className="text-wood-400">No blog posts published yet.</p>
        </section>
      </>
    );
  }

  const [featured, ...rest] = blogPosts;

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
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl overflow-hidden shadow-lg border border-wood-100 hover:shadow-xl transition-shadow">
                <div className="relative aspect-[4/3] md:aspect-auto bg-wood-100">
                  {featured.coverImage && (
                    <Image
                      src={featured.coverImage}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <span className="absolute top-4 left-4 bg-temple-500 text-white text-xs px-3 py-1 rounded-full">
                    Featured
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex gap-2 mb-3">
                    {featured.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-wood-100 text-wood-600 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-bold text-wood-900 mb-3 group-hover:text-temple-500 transition-colors font-[family-name:var(--font-playfair)]">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-wood-500 mb-4">{featured.excerpt}</p>
                  )}
                  <p className="text-sm text-wood-400">
                    {formatDate(featured.publishedAt || featured.createdAt)}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md border border-wood-100 hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-wood-100">
                    {post.coverImage && (
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
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
                    {post.excerpt && (
                      <p className="text-sm text-wood-500 line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}
                    <p className="text-xs text-wood-400">
                      {formatDate(post.publishedAt || post.createdAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
