import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    console.log(
      data.title,
      data.date,
      data.competition,
      data.venue,
      data.thumbnail,
      data.description,
      data.soldOut
    );
    //  {data.tname,data.tprice,data.tavailable,}
    if (!data.title || !data.competition) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Here you would normally save to the database, e.g.:
    // const prisma = new PrismaClient();
    // const news = await prisma.event.create({ data });
    // console.log("Created news item:", news);

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
