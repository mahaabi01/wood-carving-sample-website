import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Trophy,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });

  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} — Om Wood Carving`,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });

  if (!project || !project.published) notFound();

  // Get related projects
  const related = await prisma.project.findMany({
    where: {
      published: true,
      id: { not: project.id },
      ...(project.category ? { category: project.category } : {}),
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wood-950 via-wood-950/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-4 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Projects
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-3">
              {project.category && (
                <span className="px-3 py-1 bg-white/15 backdrop-blur-md text-white text-xs rounded-full border border-white/10">
                  {project.category}
                </span>
              )}
              {project.featured && (
                <span className="px-3 py-1 bg-gold-500/90 text-white text-xs rounded-full font-medium">
                  Featured Project
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white font-[family-name:var(--font-playfair)] mb-3 leading-tight">
              {project.title}
            </h1>

            {project.client && (
              <p className="text-white/70 text-lg">
                For{" "}
                <span className="text-gold-300 font-medium">
                  {project.client}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="bg-wood-900 text-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap gap-6 md:gap-10 text-sm">
          {project.location && (
            <span className="flex items-center gap-2 text-wood-300">
              <MapPin size={16} className="text-gold-400" />
              {project.location}
            </span>
          )}
          {project.year && (
            <span className="flex items-center gap-2 text-wood-300">
              <Calendar size={16} className="text-gold-400" />
              {project.year}
            </span>
          )}
          {project.duration && (
            <span className="flex items-center gap-2 text-wood-300">
              <Clock size={16} className="text-gold-400" />
              {project.duration}
            </span>
          )}
          {project.materials && (
            <span className="flex items-center gap-2 text-wood-300">
              <Layers size={16} className="text-gold-400" />
              {project.materials}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Description */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-4">
              About This Project
            </h2>
            <p className="text-wood-600 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          {/* Challenge / Solution / Result cards */}
          {(project.challenge || project.solution || project.result) && (
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {project.challenge && (
                <div className="bg-temple-50 rounded-2xl p-6 border border-temple-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-temple-500 flex items-center justify-center text-white">
                      <AlertCircle size={20} />
                    </div>
                    <h3 className="font-bold text-wood-900">The Challenge</h3>
                  </div>
                  <p className="text-wood-600 text-sm leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="bg-gold-50 rounded-2xl p-6 border border-gold-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center text-white">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="font-bold text-wood-900">Our Solution</h3>
                  </div>
                  <p className="text-wood-600 text-sm leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.result && (
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white">
                      <Trophy size={20} />
                    </div>
                    <h3 className="font-bold text-wood-900">The Result</h3>
                  </div>
                  <p className="text-wood-600 text-sm leading-relaxed">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Project Gallery */}
          {project.images.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-6">
                Project Gallery
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.images.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={img.url}
                      alt={img.caption || project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                    {img.caption && (
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-xs">{img.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-wood-50 rounded-2xl p-8 md:p-12 text-center border border-wood-100">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle2 size={20} className="text-gold-500" />
              <span className="text-gold-600 text-sm font-medium uppercase tracking-wider">
                Inspired?
              </span>
            </div>
            <h3 className="text-2xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-3">
              Have a Similar Project in Mind?
            </h3>
            <p className="text-wood-500 max-w-lg mx-auto mb-6">
              We welcome custom commissions of all sizes. Share your vision and
              our master artisans will bring it to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-temple-500 text-white font-semibold rounded-lg hover:bg-temple-600 transition-colors shadow-lg"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* Related Projects */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-wood-900 font-[family-name:var(--font-playfair)] mb-6">
                Related Projects
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/projects/${r.slug}`}
                    className="group bg-white rounded-xl border border-wood-100 overflow-hidden shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={r.coverImage}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-wood-900 group-hover:text-temple-600 transition-colors">
                        {r.title}
                      </h4>
                      {r.client && (
                        <p className="text-xs text-wood-400 mt-1">{r.client}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
