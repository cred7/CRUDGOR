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
