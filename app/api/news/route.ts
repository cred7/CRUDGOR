import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Here you would normally save to the database, e.g.:
    // const prisma = new PrismaClient();
    const news = await prisma.news.create({ data });
    console.log("Created news item:", news);

    return NextResponse.json({
      message: "News created successfully",
      // news,
    });
  } catch (error) {
    console.error("News POST error:", error);
    return NextResponse.json(
      { error: "Failed to create news item" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const home = await prisma.news.findMany();

    return NextResponse.json(home);
  } catch (err) {
    return NextResponse.json({ error: "failed" }, { status: 400 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing player ID for deletion" },
        { status: 400 }
      );
    }

    await prisma.news.delete({ where: { id: Number(id) } });

    return NextResponse.json(
      { message: "Player deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("news DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete player" },
      { status: 500 }
    );
  }
}
