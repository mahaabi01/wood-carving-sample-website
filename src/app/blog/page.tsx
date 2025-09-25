// blog/index.tsx
import React from "react";
import Link from "next/link";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  content: string;
  date: string;
};

// sample blog here
const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "history-of-wood-carving",
    title: "History of Wood Carving",
    content:
      "Wood carving is an ancient art form practiced across many cultures. From the intricate religious sculptures of medieval Europe to the tribal masks of Africa and Oceania, wood carving has served both functional and decorative purposes. Techniques and styles have evolved over centuries, influenced by available materials, cultural beliefs, and technological advancements.",
    date: "2025-08-01",
  },
  {
    id: 2,
    slug: "tools-used-in-wood-carving",
    title: "Tools Used in Wood Carving",
    content:
      "Carving tools vary depending on the style and complexity of the work. Some common tools include chisels, gouges, mallets, and knives. Specialized tools like veiners and V-tools help achieve fine details. Modern carvers may also use rotary tools and electric carving knives for precision and speed.",
    date: "2025-08-05",
  },
  {
    id: 3,
    slug: "care-and-maintenance-of-wooden-art",
    title: "Care and Maintenance of Wooden Art",
    content:
      "To keep wooden art looking beautiful, it is important to regularly dust, avoid direct sunlight, and occasionally treat with wood oils. Humidity control is crucial to prevent cracking or warping. For antique pieces, professional restoration may be necessary to preserve integrity.",
    date: "2025-08-10",
  },
  {
    id: 4,
    slug: "types-of-wood-for-carving",
    title: "Types of Wood for Carving",
    content:
      "Different woods offer different carving experiences. Basswood and butternut are soft and ideal for beginners. Hardwoods like oak and walnut provide durability but require more effort. Exotic woods such as teak or ebony offer unique aesthetics but may be expensive or difficult to source.",
    date: "2025-08-15",
  },
  {
    id: 5,
    slug: "wood-carving-in-cultural-tourism",
    title: "Wood Carving in Cultural Tourism",
    content:
      "Wood carving plays a vital role in cultural tourism. Visitors are drawn to traditional workshops, heritage sites, and local markets where artisans demonstrate their craft. In places like Nepal, Bali, and Oaxaca, wood carving is not just an art—it's a cultural experience that supports local economies and preserves ancestral knowledge.",
    date: "2025-08-20",
  },
  {
    id: 6,
    slug: "starting-a-wood-carving-business",
    title: "Starting a Wood Carving Business",
    content:
      "Launching a wood carving business involves more than mastering the craft. Entrepreneurs must consider branding, online presence, pricing strategies, and sourcing sustainable materials. Collaborating with cultural institutions or tourism boards can boost visibility and connect artisans with global audiences.",
    date: "2025-08-25",
  },
  {
    id: 7,
    slug: "exporting-handcrafted-wood-art",
    title: "Exporting Handcrafted Wood Art",
    content:
      "Exporting wood carvings requires understanding international trade regulations, packaging standards, and cultural sensitivities. Artisans can benefit from e-commerce platforms, fair trade certifications, and partnerships with galleries or cultural boutiques abroad. Storytelling and authenticity are key to attracting global buyers.",
    date: "2025-08-30",
  },
  {
    id: 8,
    slug: "wood-carving-and-cultural-preservation",
    title: "Wood Carving and Cultural Preservation",
    content:
      "Wood carving is a powerful tool for preserving cultural identity. Through motifs, symbols, and techniques passed down generations, communities safeguard their heritage. Supporting local carvers helps maintain these traditions and ensures that cultural narratives continue to thrive in a modern world.",
    date: "2025-09-05",
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
              <div className="text-2xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </div>
            </Link>
            <p className="text-gray-600">
              {post.content.split(" ").slice(0, 15).join(" ")}...
            </p>

            <small className="text-gray-400">
              {new Date(post.date).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default BlogList;
