import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductCard from "@/components/ProductCard";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const products = [
    { name: "Wood Carving Kalash", price: "Rs. 14,000.00", img: "/product1.jpg" },
    { name: "Peacock Traditional Wood Carving", price: "Rs. 16,000.00", img: "/product2.jpg" },
    { name: "Wooden Yellow Statue", price: "Rs. 46,000.00", img: "/product3.jpg" },
    { name: "Antique Peacock Window", price: "Rs. 42,000.00", img: "/product4.jpg" },
  ];

  return (
    <>
      <Hero />
      <AboutSection />

      {/* Popular Products */}
      <section className="bg-blue-900 py-12 px-4 text-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Popular Products</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <ProductCard key={i} {...p} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-white text-blue-900 px-5 py-2 rounded-lg hover:bg-gray-100">
              See More Products
            </button>
          </div>
        </div>
      </section>

      <StatsSection />
    </>
  );
}
