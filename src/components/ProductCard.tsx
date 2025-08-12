import Image from "next/image";

interface ProductProps {
  name: string;
  price: string;
  img: string;
}

export default function ProductCard({ name, price, img }: ProductProps) {
  return (
    <div className="bg-white text-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <Image
        src={img}
        alt={name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold mb-2">{name}</h3>
        <p className="text-red-600 font-bold">{price}</p>
        <button className="mt-3 bg-blue-900 text-white px-3 py-1 rounded hover:bg-blue-800">
          View Details
        </button>
      </div>
    </div>
  );
}
