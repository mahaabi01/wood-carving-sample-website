"use client"
// blog/[slug].tsx
import { useRouter } from "next/navigation";
import React from "react";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  content: string;
  date: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "history-of-wood-carving",
    title: "History of Wood Carving",
    content:
      "Wood carving is an ancient art form practiced across many cultures... [full content here]",
    date: "2025-08-01",
  },
  {
    id: 2,
    slug: "tools-used-in-wood-carving",
    title: "Tools Used in Wood Carving",
    content:
      "Carving tools vary depending on the style and complexity of the work. Some common tools include chisels, gouges, mallets... [full content here]",
    date: "2025-08-05",
  },
  {
    id: 3,
    slug: "care-and-maintenance-of-wooden-art",
    title: "Care and Maintenance of Wooden Art",
    content:
      "To keep wooden art looking beautiful, it is important to regularly dust, avoid direct sunlight, and occasionally treat with wood oils... [full content here]",
    date: "2025-08-10",
  },
];

const BlogDetails: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <p className="p-8 text-center">Blog post not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <small className="text-gray-400 mb-6 block">{new Date(post.date).toLocaleDateString()}</small>
      <article className="prose max-w-none">{post.content}</article>
    </main>
  );
};

export default BlogDetails;
