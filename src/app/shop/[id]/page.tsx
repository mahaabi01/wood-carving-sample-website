// shop/[slug].tsx
"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

// Dummy product data for demo
const products: Product[] = [
  {
    id: 1,
    name: "Wood Carving Art Piece",
    slug: "wood-carving-art-piece",
    description: "Handmade wooden sculpture with fine details.",
    price: 1500,
    imageUrl: "/images/carving1.jpg",
  },
  {
    id: 2,
    name: "Wooden Wall Panel",
    slug: "wooden-wall-panel",
    description: "Beautiful carved panel for wall decoration.",
    price: 2500,
    imageUrl: "/images/carving2.jpg",
  },
  {
    id: 3,
    name: "Decorative Wood Bowl",
    slug: "decorative-wood-bowl",
    description: "Unique wood bowl with traditional designs.",
    price: 1200,
    imageUrl: "/images/carving3.jpg",
  },
  {
    id: 4,
    name: "Traditional Wooden Window Frame",
    slug: "traditional-wooden-window-frame",
    description: "Intricately carved wooden window frame inspired by traditional Nepali architecture.",
    price: 5500,
    imageUrl: "/images/carving4.jpg",
  },
  {
    id: 5,
    name: "Wooden Temple Door",
    slug: "wooden-temple-door",
    description: "Handcrafted wooden temple-style door with religious motifs.",
    price: 8500,
    imageUrl: "/images/carving5.jpg",
  },
  {
    id: 6,
    name: "Carved Wooden Mask",
    slug: "carved-wooden-mask",
    description: "Traditional wooden mask used in cultural dances and rituals.",
    price: 3200,
    imageUrl: "/images/carving6.jpg",
  },
  {
    id: 7,
    name: "Wooden Jewelry Box",
    slug: "wooden-jewelry-box",
    description: "Decorative jewelry storage box with fine wood carvings.",
    price: 1800,
    imageUrl: "/images/carving7.jpg",
  },
  {
    id: 8,
    name: "Wooden Buddha Statue",
    slug: "wooden-buddha-statue",
    description: "Sacred wooden Buddha statue carved with peaceful expressions.",
    price: 4500,
    imageUrl: "/images/carving8.jpg",
  },
  {
    id: 9,
    name: "Carved Wooden Ceiling Panel",
    slug: "carved-wooden-ceiling-panel",
    description: "Decorative ceiling panel showcasing traditional floral patterns.",
    price: 7200,
    imageUrl: "/images/carving9.jpg",
  },
  {
    id: 10,
    name: "Wooden Elephant Sculpture",
    slug: "wooden-elephant-sculpture",
    description: "Symbolic elephant sculpture carved from high-quality wood.",
    price: 3900,
    imageUrl: "/images/carving10.jpg",
  },
  {
    id: 11,
    name: "Traditional Wooden Chair",
    slug: "traditional-wooden-chair",
    description: "Classic wooden chair with hand-carved backrest and legs.",
    price: 2800,
    imageUrl: "/images/carving11.jpg",
  },
  {
    id: 12,
    name: "Wooden Serving Tray",
    slug: "wooden-serving-tray",
    description: "Functional serving tray with ornate woodwork design.",
    price: 1600,
    imageUrl: "/images/carving12.jpg",
  },
  {
    id: 13,
    name: "Wooden Wall Hanging Mandala",
    slug: "wooden-wall-hanging-mandala",
    description: "Sacred mandala pattern carved into a wooden wall hanging.",
    price: 3000,
    imageUrl: "/images/carving13.jpg",
  },
];



// interface ProductDetailsProps {
//   params: {slug: string};
// }

// const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
//   const { slug } = router.query;

//   const product = products.find((p) => p.slug === slug);

//   if (!product) {
//     return <p className="p-8 text-center">Product not found.</p>;
//   }

//   return (
//     <main className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
//       <img
//         src={product.imageUrl}
//         alt={product.name}
//         className="w-full max-h-[400px] object-cover rounded-lg mb-6"
//       />
//       <p className="text-gray-700 mb-4">{product.description}</p>
//       <p className="text-xl font-semibold">Price: Rs. {product.price.toLocaleString()}</p>
//     </main>
//   );
// };

// export default ProductDetails;


const ProductDetails: React.FC = () => {
  const params = useParams();
  const slug = params?.id as string;
  const product = products.find((p) => p.slug === slug);

  if(!product) {
    return <p className="p-8 text-center">Product not found.</p>
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 my-10">{product.name}</h1>
      <Image
        width={800}
        height={600}
        src = {product.imageUrl}
        alt = {product.name}
        className = "w-full max-h-[400px] object-cover rounded-lg mb-6"
      />

      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold">
        Price: Rs. {product.price.toLocaleString()}
      </p>
    </main>
  )
}

export default ProductDetails;