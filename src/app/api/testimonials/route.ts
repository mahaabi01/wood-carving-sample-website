import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET all testimonials (public: only published; admin: all)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const testimonials = await prisma.testimonial.findMany({
      where: all ? {} : { published: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { message: "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
}

// POST create a testimonial
export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      location,
      role,
      avatarUrl,
      rating,
      review,
      projectType,
      imageUrl,
      featured,
      published,
    } = body;

    if (!name || !review) {
      return NextResponse.json(
        { message: "Name and review are required" },
        { status: 400 },
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        location: location || null,
        role: role || null,
        avatarUrl: avatarUrl || null,
        rating: rating ?? 5,
        review,
        projectType: projectType || null,
        imageUrl: imageUrl || null,
        featured: featured ?? false,
        published: published ?? false,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { message: "Failed to create testimonial" },
      { status: 500 },
    );
  }
}
