import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET single project by id or slug
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Try by id first, then by slug
    let project = await prisma.project.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    });

    if (!project) {
      project = await prisma.project.findUnique({
        where: { slug: id },
        include: { images: { orderBy: { sortOrder: "asc" } } },
      });
    }

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { message: "Failed to fetch project" },
      { status: 500 },
    );
  }
}

// PUT update project
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const data: Record<string, unknown> = {};
    if (body.title !== undefined) {
      data.title = body.title;
      data.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (body.client !== undefined) data.client = body.client || null;
    if (body.location !== undefined) data.location = body.location || null;
    if (body.description !== undefined) data.description = body.description;
    if (body.challenge !== undefined) data.challenge = body.challenge || null;
    if (body.solution !== undefined) data.solution = body.solution || null;
    if (body.result !== undefined) data.result = body.result || null;
    if (body.coverImage !== undefined) data.coverImage = body.coverImage;
    if (body.category !== undefined) data.category = body.category || null;
    if (body.materials !== undefined) data.materials = body.materials || null;
    if (body.duration !== undefined) data.duration = body.duration || null;
    if (body.year !== undefined) {
      data.year = body.year || null;
      data.completedAt = body.year ? new Date(`${body.year}-01-01`) : null;
    }
    if (body.featured !== undefined) data.featured = body.featured;
    if (body.published !== undefined) data.published = body.published;

    const project = await prisma.project.update({
      where: { id },
      data,
      include: { images: true },
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE project
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const deleted = await prisma.project.delete({ where: { id } });

    revalidatePath("/projects");
    revalidatePath(`/projects/${deleted.slug}`);

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { message: "Failed to delete project" },
      { status: 500 },
    );
  }
}
