"use client";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  id: number;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, name, price, imageUrl, slug }: ProductProps) {
  return (
    <div className="bg-white text-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <Image
        src={imageUrl}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-2">{name}</h3>
        <p className="text-red-600 font-bold">Price: {price}</p>
        {/* <button className="mt-3 bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800">
          View Details
        </button> */}
        <Link 
        href={`/shop/${slug}`}
        className="mt-4 inline-block text-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          See More
        </Link>
      </div>
    </div>
  );
}
