import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="pt-20">
      {/* Hero Banner */}
      <section className="relative h-[300px]">
        <Image
          src="/about-banner.jpg" // Replace with your image
          alt="About Om Wood Carving"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
        </div>
      </section>

      {/* Company Intro */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <Image
          src="/about.jpg" // Replace with your image
          alt="Our Workshop"
          width={600}
          height={400}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4 text-red-600">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to Om Wood Carving, where tradition meets craftsmanship in
            the heart of Nepal. For decades, our artisans have been preserving
            the rich heritage of Nepali wood carving. From intricate heritage-style
            architecture to modern masterpieces, every creation is a blend of skill,
            culture, and dedication.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our workshop is inspired by Nepal’s cultural legacy, crafting pieces
            that capture the stories of our land. Whether it's restoring ancient
            designs or creating new works, we ensure every product holds the
            essence of true Nepali artistry.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-red-600">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To preserve and promote Nepal’s centuries-old tradition of wood carving,
              offering authentic, high-quality creations that connect people with
              our cultural heritage.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-red-600">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be recognized globally as a leader in heritage woodcraft, blending
              traditional techniques with innovative designs to inspire future
              generations.
            </p>
          </div>
        </div>
      </section>

      {/* Workshop / Team Showcase */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Workshop</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["workshop1.jpg", "workshop2.jpg", "workshop3.jpg"].map((img, i) => (
            <div key={i} className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={`/${img}`} // replace with actual workshop images
                alt="Workshop"
                width={400}
                height={300}
                className="object-cover w-full h-64 hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
