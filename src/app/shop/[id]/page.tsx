// shop/[slug].tsx
import { useRouter } from "next/router";
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
    slug: "wood-carving-art-piece",
    name: "Wood Carving Art Piece",
    description: "Handmade wooden sculpture with fine details.",
    price: 1500,
    imageUrl: "/images/carving1.jpg",
  },
  {
    id: 2,
    slug: "wooden-wall-panel",
    name: "Wooden Wall Panel",
    description: "Beautiful carved panel for wall decoration.",
    price: 2500,
    imageUrl: "/images/carving2.jpg",
  },
  {
    id: 3,
    slug: "decorative-wood-bowl",
    name: "Decorative Wood Bowl",
    description: "Unique wood bowl with traditional designs.",
    price: 1200,
    imageUrl: "/images/carving3.jpg",
  },
];

const ProductDetails: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <p className="p-8 text-center">Product not found.</p>;
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full max-h-[400px] object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold">Price: Rs. {product.price.toLocaleString()}</p>
    </main>
  );
};

export default ProductDetails;
