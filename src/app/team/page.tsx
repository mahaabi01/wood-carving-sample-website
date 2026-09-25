import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/SectionHeading";
import prisma from "@/lib/prisma";

export const metadata = {
  title: "Our Team | Om Wood Carving",
  description:
    "Meet the master artisans behind Om Wood Carving — skilled craftspeople preserving Nepal's woodcarving heritage.",
};

export default async function TeamPage() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <PageBanner
        title="Our Team"
        subtitle="Meet the skilled artisans who bring sacred woodcraft to life with passion and precision."
        imageUrl="/Maindoor/door17.jpg"
      />

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Master Artisans"
            title="The Hands Behind the Art"
            subtitle="Each member of our team carries forward generations of woodcarving knowledge."
          />

          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md border border-wood-100 hover:shadow-xl transition-shadow"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs bg-gold-500/90 text-wood-900 px-3 py-1 rounded-full font-medium">
                        {member.experience}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                      {member.name}
                    </h3>
                    <p className="text-temple-500 text-sm font-medium mt-1">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-wood-500 text-sm mt-3 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-wood-400 mt-12">
              Team profiles coming soon.
            </p>
          )}
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 bg-wood-900 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-playfair)] mb-4">
            Want to Join Our Workshop?
          </h2>
          <p className="text-wood-300 mb-6">
            We&apos;re always looking for passionate artisans and apprentices
            who want to learn and practice the sacred art of wood carving.
          </p>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@omwoodcarving.com"}`}
            className="inline-block px-8 py-3 bg-gold-500 text-wood-900 rounded-lg hover:bg-gold-400 transition-colors font-semibold"
          >
            Apply to Join
          </a>
        </div>
      </section>
    </div>
  );
}
