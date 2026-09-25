import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET single product by id or slug
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    let product = await prisma.product.findUnique({
      where: { id },
      include: { category: true, images: { orderBy: { isPrimary: "desc" } } },
    });

    if (!product) {
      product = await prisma.product.findUnique({
        where: { slug: id },
        include: {
          category: true,
          images: { orderBy: { isPrimary: "desc" } },
        },
      });
    }

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// PUT update product
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
    if (body.name !== undefined) {
      data.name = body.name;
      data.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (body.description !== undefined)
      data.description = body.description || null;
    if (body.story !== undefined) data.story = body.story || null;
    if (body.price !== undefined) data.price = body.price;
    if (body.categoryId !== undefined)
      data.categoryId = body.categoryId || null;
    if (body.featured !== undefined) data.featured = body.featured;
    if (body.inStock !== undefined) data.inStock = body.inStock;
    if (body.material !== undefined) data.material = body.material || null;
    if (body.dimensions !== undefined)
      data.dimensions = body.dimensions || null;
    if (body.weight !== undefined) data.weight = body.weight || null;
    if (body.craftTime !== undefined) data.craftTime = body.craftTime || null;
    if (body.artisan !== undefined) data.artisan = body.artisan || null;

    if (body.imageUrl !== undefined) {
      await prisma.productImage.deleteMany({ where: { productId: id } });
      if (body.imageUrl) {
        data.images = { create: [{ url: body.imageUrl, isPrimary: true }] };
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data,
      include: { category: true, images: true },
    });

    revalidatePath("/");
    revalidatePath("/shop");

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE product
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
    await prisma.product.delete({ where: { id } });

    revalidatePath("/");
    revalidatePath("/shop");

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 },
    );
  }
}
