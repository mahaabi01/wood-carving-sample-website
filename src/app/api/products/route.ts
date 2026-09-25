import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET all products (public: only in-stock; admin: all via ?all=true)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const all = searchParams.get("all") === "true";

    const products = await prisma.product.findMany({
      where: all ? {} : { inStock: true },
      include: {
        category: true,
        images: { orderBy: { isPrimary: "desc" } },
      },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST create a product
export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      description,
      story,
      price,
      categoryId,
      imageUrl,
      featured,
      inStock,
      material,
      dimensions,
      weight,
      craftTime,
      artisan,
    } = body;

    if (!name || price === undefined || price === null) {
      return NextResponse.json(
        { message: "Name and price are required" },
        { status: 400 },
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { message: "A product with this name already exists" },
        { status: 409 },
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || null,
        story: story || null,
        price,
        categoryId: categoryId || null,
        featured: featured ?? false,
        inStock: inStock ?? true,
        material: material || null,
        dimensions: dimensions || null,
        weight: weight || null,
        craftTime: craftTime || null,
        artisan: artisan || null,
        images: imageUrl
          ? { create: [{ url: imageUrl, isPrimary: true }] }
          : undefined,
      },
      include: { category: true, images: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}
