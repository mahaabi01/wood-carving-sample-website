import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET single blog post by id or slug
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    let post = await prisma.blogPost.findUnique({ where: { id } });

    if (!post) {
      post = await prisma.blogPost.findUnique({ where: { slug: id } });
    }

    if (!post) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { message: "Failed to fetch blog post" },
      { status: 500 },
    );
  }
}

// PUT update blog post
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
    if (body.excerpt !== undefined) data.excerpt = body.excerpt || null;
    if (body.content !== undefined) data.content = body.content;
    if (body.coverImage !== undefined)
      data.coverImage = body.coverImage || null;
    if (body.tags !== undefined)
      data.tags = Array.isArray(body.tags) ? body.tags : [];
    if (body.author !== undefined) data.author = body.author;
    if (body.published !== undefined) {
      data.published = body.published;
      if (body.published) {
        const existing = await prisma.blogPost.findUnique({ where: { id } });
        if (existing && !existing.publishedAt) {
          data.publishedAt = new Date();
        }
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data,
    });

    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { message: "Failed to update blog post" },
      { status: 500 },
    );
  }
}

// DELETE blog post
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
    const deleted = await prisma.blogPost.delete({ where: { id } });

    revalidatePath("/blog");
    revalidatePath(`/blog/${deleted.slug}`);

    return NextResponse.json({ message: "Blog post deleted" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { message: "Failed to delete blog post" },
      { status: 500 },
    );
  }
}
