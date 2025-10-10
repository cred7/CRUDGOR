// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.date || !data.venue) {
      return NextResponse.json(
        { error: "Title, date, and venue are required" },
        { status: 400 }
      );
    }
    // const prisma = await new PrismaClient();
    const ticket = await prisma.ticket.create({
      data,
    });

    return NextResponse.json({
      message: "Ticket event created successfully",
      ticket,
      ha: "hahahahahahahahahahaha",
    });
  } catch (error) {
    console.error("Ticket POST error:", error);
    return NextResponse.json(
      { error: "Failed to create ticket event" },
      { status: 500 }
    );
  }
}
