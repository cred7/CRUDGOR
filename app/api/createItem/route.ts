import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);
    const item = await prisma.itemshop.create({
      data: {
        name: data.name,
        price: data.price,
        imageUrl: data.imageUrl,
        isNew: data.isNew,
        inStock: data.inStock,
        description: data.description,
      },
    });

    return NextResponse.json({
      message: "Item created successfully",
      item,
    });
  } catch (error) {
    console.log("error from the creation of the item", error);
    return NextResponse.json(
      { error: "Failed to create news item" },
      { status: 500 }
    );
  }
}
