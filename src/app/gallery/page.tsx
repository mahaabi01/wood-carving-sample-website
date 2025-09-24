//appp/gallery/page.tsx
import Link from "next/link";

const categories = [
  {name: "Sculptures", slug:"sculpture", imageUrl: "/images/gallery1.jpg", link: "/gallery/sculptures"},
  {name: "Wall Panels", slug:"wallpanel", imageUrl: "/images/gallery2.jpg", link: "/gallery/wall-panels"},
  {name: "Bowls & Vessels", slug:"bowlsandvessels", imageUrl: "/images/gallery3.jpg", link: "/gallery/bowls-vessels"},
  {name: "Custom Pieces", slug:"custompieces", imageUrl: "/images/gallery4.jpg", link: "/gallery/custom-pieces"},
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Product Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`gallery/${category.slug}`}
            className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full h-48 ">
            <img
            src={category.imageUrl}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
          </div>
          <div className="p-4 bg-white">
            <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
              {category.name}
            </h2>
    </div>
    </Link>
        ))}
      </div>
    </div>
  )
}