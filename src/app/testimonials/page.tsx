import { Metadata } from "next";
import prisma from "@/lib/prisma";
import PageBanner from "@/components/PageBanner";
import TestimonialsGrid from "@/components/TestimonialsGrid";

export const metadata: Metadata = {
  title: "Testimonials — Om Wood Carving",
  description:
    "Read what our customers say about their experience with Om Wood Carving — handcrafted Nepali wood carvings delivered worldwide.",
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <PageBanner
        title="Customer Testimonials"
        subtitle="Hear from collectors, designers, and homeowners who trusted us with their vision"
        imageUrl="/Maindoor/door9.jpg"
      />

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                {testimonials.length}+
              </p>
              <p className="text-sm text-wood-500">Happy Customers</p>
            </div>
            <div className="w-px bg-wood-200 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                {(
                  testimonials.reduce((a, t) => a + t.rating, 0) /
                    testimonials.length || 0
                ).toFixed(1)}
              </p>
              <p className="text-sm text-wood-500">Average Rating</p>
            </div>
            <div className="w-px bg-wood-200 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                5+
              </p>
              <p className="text-sm text-wood-500">Countries Served</p>
            </div>
          </div>

          <TestimonialsGrid testimonials={testimonials} />
        </div>
      </section>
    </>
  );
}
