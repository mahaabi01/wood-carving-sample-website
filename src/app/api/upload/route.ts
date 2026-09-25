import { NextResponse } from "next/server";
import { getAdminFromCookies } from "@/lib/auth";
import { uploadToCloudinary, deleteFromCloudinary } from "@/services/cloudinaryConfig";

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB — stays under Vercel's request body limit
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// POST upload an image to Cloudinary (admin only)
export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { message: "Only JPEG, PNG, WebP, and GIF images are allowed" },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Image must be smaller than 4MB" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToCloudinary(buffer, "omwood");

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { message: "Failed to upload image" },
      { status: 500 },
    );
  }
}

// DELETE remove an image from Cloudinary (admin only) — used when an admin
// replaces an existing image, so orphaned files don't pile up.
export async function DELETE(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { publicId } = await req.json();
    if (!publicId || typeof publicId !== "string") {
      return NextResponse.json({ message: "publicId is required" }, { status: 400 });
    }

    await deleteFromCloudinary(publicId);
    return NextResponse.json({ message: "Image deleted" });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { message: "Failed to delete image" },
      { status: 500 },
    );
  }
}
