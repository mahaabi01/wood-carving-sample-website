import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="container mx-auto py-12 px-4 grid md:grid-cols-2 gap-8 items-center">
      <Image
        src="/sample image/image1.jpg" // replace with actual image
        alt="About Us"
        width={600}
        height={400}
        className="rounded-lg object-cover"
      />
      <div>
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to Om Wood Carving, where tradition meets craftsmanship in
          the heart of Nepal. We are artisans dedicated to preserving the rich
          heritage of Nepali wood carving. From heritage-style architecture to
          modern masterpieces, our work reflects both culture and skill.
        </p>
        <button className="text-red-600 hover:underline">Read More</button>
      </div>
    </section>
  );
}
