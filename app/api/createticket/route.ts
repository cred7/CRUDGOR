import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    //  {data.tname,data.tprice,data.tavailable,}

    console.log(data);
    if (!data.title || !data.competition) {
      return NextResponse.json(
        { error: "Title and competition are required" },
        { status: 400 }
      );
    }

    const datas = {
      title: data.title,
      date: data.date,
      competition: data.competition,
      venue: data.venue,
      thumbnail: data.thumbnail,
      // soldOut: data.soldOut,
      description: data.description,
      tiers: [
        {
          name: data.tname,
          price: data.tprice,
          available: data.tprice,
        },
        {
          name: data.vname,
          price: data.vprice,
          available: data.vprice,
        },
      ],
    };

    // const prisma = new PrismaClient();
    const event = await prisma.event.create({
      data: {
        title: datas.title,
        date: datas.date,
        competition: datas.competition,
        venue: datas.venue,
        thumbnail: datas.thumbnail,
        // soldOut: datas.soldOut,
        description: datas.description,
        tiers: {
          create: datas.tiers.map((tier) => ({
            name: tier.name,
            price: tier.price,
            available: tier.available,
          })),
        },
      },
      include: { tiers: true },
    });
    //
    console.log({ message: "ticket created successfully", event });
    return NextResponse.json({
      message: "ticket created successfully",
      event,
    });
  } catch (error) {
    console.error("News POST error:", error);
    return NextResponse.json(
      { error: "Failed to create news item" },
      { status: 500 }
    );
  }
}
