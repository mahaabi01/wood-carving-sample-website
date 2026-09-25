import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import prisma from "@/lib/prisma";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug: id } });

  if (!post) {
    notFound();
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

      {post.coverImage && (
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
      )}

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
          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
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
