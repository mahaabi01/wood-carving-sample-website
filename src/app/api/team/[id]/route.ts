import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET single team member
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const member = await prisma.teamMember.findUnique({ where: { id } });

    if (!member) {
      return NextResponse.json(
        { message: "Team member not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error fetching team member:", error);
    return NextResponse.json(
      { message: "Failed to fetch team member" },
      { status: 500 },
    );
  }
}

// PUT update team member
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
    if (body.name !== undefined) data.name = body.name;
    if (body.role !== undefined) data.role = body.role;
    if (body.experience !== undefined) data.experience = body.experience;
    if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
    if (body.bio !== undefined) data.bio = body.bio || null;
    if (body.sortOrder !== undefined) data.sortOrder = body.sortOrder;

    const member = await prisma.teamMember.update({
      where: { id },
      data,
    });

    revalidatePath("/team");

    return NextResponse.json(member);
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      { message: "Failed to update team member" },
      { status: 500 },
    );
  }
}

// DELETE team member
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
    await prisma.teamMember.delete({ where: { id } });

    revalidatePath("/team");

    return NextResponse.json({ message: "Team member deleted" });
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { message: "Failed to delete team member" },
      { status: 500 },
    );
  }
}
