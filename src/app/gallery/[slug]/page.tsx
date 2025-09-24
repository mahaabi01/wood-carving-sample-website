//app/gallery/[slug]/page.tsx
"use client"

import { useParams } from "next/navigation"; 
 const products: Record<string, { name: string; image: string } []> = {
  sculpture: [
    { name: "Marble Statue", image: "/images/sculpture1.jpg" },
    { name: "Wood Carving", image: "/images/sculpture2.jpg" },
    { name: "Bronze Figure", image: "/images/sculpture3.jpg" },
  ],
  wallpanel: [
    { name: "wallpanel1", image: "/images/wallpanel1.jpg" },
    { name: "wallpanel2", image: "/images/wallpanel2.jpg" },
    { name: "wallpanel3", image: "/images/wallpanel3.jpg" },
  ],
  bowlsandvessels: [
    { name: "wood bowl1", image: "/images/bowl1.jpg" },
    { name: "wood bowl2", image: "/images/bowl2.jpg" },
    { name: "wood bowl3", image: "/images/bowl3.jpg" },
  ],
  custompieces: [
    { name: "custom piece1", image: "/images/custom1.jpg" },
    { name: "custom piece2", image: "/images/custom2.jpg" },
    { name: "custom piece3", image: "/images/custom3.jpg" },
  ],
};

export default function CategoryPage() {
  const { slug } = useParams();
  const items = products[slug as string] || [];

  return (
    <div className="min-h-screen px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">
        {slug} Collection
      </h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">No products found in this categories</p>):
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <div
              key={idx}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="relative w-full h-48">
                  <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover" />
                </div>
                <div className="p-4 bg-white">
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                </div>
                </div>

            ))}

          </div>
        )}
    </div>
  )
}
