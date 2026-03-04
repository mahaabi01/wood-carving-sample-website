import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET single testimonial
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });

    if (!testimonial) {
      return NextResponse.json(
        { message: "Testimonial not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error fetching testimonial:", error);
    return NextResponse.json(
      { message: "Failed to fetch testimonial" },
      { status: 500 },
    );
  }
}

// PUT update testimonial
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        name: body.name,
        location: body.location || null,
        role: body.role || null,
        avatarUrl: body.avatarUrl || null,
        rating: body.rating ?? 5,
        review: body.review,
        projectType: body.projectType || null,
        imageUrl: body.imageUrl || null,
        featured: body.featured ?? false,
        published: body.published ?? false,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { message: "Failed to update testimonial" },
      { status: 500 },
    );
  }
}

// DELETE testimonial
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { message: "Failed to delete testimonial" },
      { status: 500 },
    );
  }
}
