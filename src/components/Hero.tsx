import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-[500px]">
      <Image
        src="/hero.jpg" // replace with actual image
        alt="Wooden Bardali"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Wooden Bardali
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Preserving Nepal’s rich heritage through fine wood carving
        </p>
        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg">
            Shop Now
          </button>
          <button className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-lg">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
