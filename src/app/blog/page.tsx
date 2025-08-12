// blog/index.tsx
import React from "react";
import Link from "next/link";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "history-of-wood-carving",
    title: "History of Wood Carving",
    excerpt: "Explore the ancient traditions and cultural significance of wood carving.",
    date: "2025-08-01",
  },
  {
    id: 2,
    slug: "tools-used-in-wood-carving",
    title: "Tools Used in Wood Carving",
    excerpt: "A guide to essential tools for wood carving beginners and professionals.",
    date: "2025-08-05",
  },
  {
    id: 3,
    slug: "care-and-maintenance-of-wooden-art",
    title: "Care and Maintenance of Wooden Art",
    excerpt: "Tips to preserve and care for your wooden art pieces for years to come.",
    date: "2025-08-10",
  },
];

const BlogList: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <br />
      <br />
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <ul className="space-y-6">
        {blogPosts.map((post) => (
          <li key={post.id} className="border-b pb-4">
            <Link href={`/blog/${post.slug}`}>
              <div className="text-2xl font-semibold text-blue-600 hover:underline">{post.title}</div>
            </Link>
            <p className="text-gray-600">{post.excerpt}</p>
            <small className="text-gray-400">{new Date(post.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BlogList;
