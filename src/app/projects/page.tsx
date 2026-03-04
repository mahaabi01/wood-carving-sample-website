import { Metadata } from "next";
import prisma from "@/lib/prisma";
import PageBanner from "@/components/PageBanner";
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata: Metadata = {
  title: "Our Projects — Om Wood Carving",
  description:
    "Explore our completed projects — temple restorations, residential installations, and custom commissions crafted by master Nepali artisans.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ featured: "desc" }, { completedAt: "desc" }],
  });

  const categories = [
    "All",
    ...new Set(projects.map((p) => p.category).filter(Boolean) as string[]),
  ];

  return (
    <>
      <PageBanner
        title="Our Projects"
        subtitle="From sacred temples to modern homes — explore the spaces we've transformed through woodcraft"
        imageUrl="/Maindoor/door5.jpg"
      />

      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="text-center">
              <p className="text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                {projects.length}+
              </p>
              <p className="text-sm text-wood-500">Projects Completed</p>
            </div>
            <div className="w-px bg-wood-200 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                {new Set(projects.map((p) => p.location).filter(Boolean)).size}
              </p>
              <p className="text-sm text-wood-500">Locations</p>
            </div>
            <div className="w-px bg-wood-200 hidden sm:block" />
            <div className="text-center">
              <p className="text-3xl font-bold text-wood-900 font-[family-name:var(--font-playfair)]">
                {projects.filter((p) => p.featured).length}
              </p>
              <p className="text-sm text-wood-500">Featured Works</p>
            </div>
          </div>

          <ProjectsGrid
            projects={JSON.parse(JSON.stringify(projects))}
            categories={categories}
          />
        </div>
      </section>
    </>
  );
}
