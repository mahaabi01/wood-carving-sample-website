import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getAdminFromCookies } from "@/lib/auth";

// GET all team members
export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(team);
  } catch (error) {
    console.error("Error fetching team members:", error);
    return NextResponse.json(
      { message: "Failed to fetch team members" },
      { status: 500 },
    );
  }
}

// POST create a team member
export async function POST(req: Request) {
  const admin = await getAdminFromCookies();
  if (!admin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, role, experience, imageUrl, bio, sortOrder } = body;

    if (!name || !role || !experience || !imageUrl) {
      return NextResponse.json(
        { message: "Name, role, experience, and image are required" },
        { status: 400 },
      );
    }

    const member = await prisma.teamMember.create({
      data: {
        name,
        role,
        experience,
        imageUrl,
        bio: bio || null,
        sortOrder: sortOrder ?? 0,
      },
    });

    revalidatePath("/team");

    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { message: "Failed to create team member" },
      { status: 500 },
    );
  }
}
