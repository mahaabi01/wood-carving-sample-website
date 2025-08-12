// shop/index.tsx
import React from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Wood Carving Art Piece",
    description: "Handmade wooden sculpture with fine details.",
    price: 1500,
    imageUrl: "/images/carving1.jpg",
  },
  {
    id: 2,
    name: "Wooden Wall Panel",
    description: "Beautiful carved panel for wall decoration.",
    price: 2500,
    imageUrl: "/images/carving2.jpg",
  },
  {
    id: 3,
    name: "Decorative Wood Bowl",
    description: "Unique wood bowl with traditional designs.",
    price: 1200,
    imageUrl: "/images/carving3.jpg",
  },
];

const ShopIndex: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default ShopIndex;
