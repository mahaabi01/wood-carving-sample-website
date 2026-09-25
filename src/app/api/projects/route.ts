import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET all projects (public: only published; admin: all)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const projects = await prisma.project.findMany({
      where: all ? {} : { published: true },
      include: { images: { orderBy: { sortOrder: "asc" } } },
      orderBy: [
        { featured: "desc" },
        { completedAt: "desc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// POST create a project
export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      client,
      location,
      description,
      challenge,
      solution,
      result,
      coverImage,
      category,
      materials,
      duration,
      year,
      featured,
      published,
      images,
    } = body;

    if (!title || !description || !coverImage) {
      return NextResponse.json(
        { message: "Title, description, and cover image are required" },
        { status: 400 },
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await prisma.project.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { message: "A project with this title already exists" },
        { status: 409 },
      );
    }

    const project = await prisma.project.create({
      data: {
        slug,
        title,
        client: client || null,
        location: location || null,
        description,
        challenge: challenge || null,
        solution: solution || null,
        result: result || null,
        coverImage,
        category: category || null,
        materials: materials || null,
        duration: duration || null,
        year: year || null,
        featured: featured ?? false,
        published: published ?? false,
        completedAt: year ? new Date(`${year}-01-01`) : null,
        images: images?.length
          ? {
              create: images.map(
                (img: { url: string; caption?: string }, i: number) => ({
                  url: img.url,
                  caption: img.caption || null,
                  sortOrder: i,
                }),
              ),
            }
          : undefined,
      },
      include: { images: true },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 },
    );
  }
}
