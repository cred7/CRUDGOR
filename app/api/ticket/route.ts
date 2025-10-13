// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Received ticket data:", data);

    if (!data.eventId || !data.tier || !data.quantity) {
      return NextResponse.json(
        { error: "Title, date, and venue are required" },
        { status: 400 }
      );
    }

    const { eventId, tier, quantity } = await data;

    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { tiers: true },
    });

    if (!event) {
      console.log("not found");
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }
    console.log(eventId, tier, quantity, "this are abstracted data");
    const home = event.tiers.find((t) => t.name === tier);
    // const come = home.name;
    console.log(home);
    console.log("tier found", tier);
    // Find tier
    const eventtier = event.tiers.find((t) => t.name === tier);
    console.log(eventtier, "this is the tier");
    if (!eventtier) {
      console.log("not found 1");
      return NextResponse.json({ error: "Tier not found" }, { status: 404 });
    }

    // Check availability
    if (eventtier.available < quantity) {
      const quantity = eventtier.available;
      console.log("last to be bought found are equal");
      const update = await prisma.tier.update({
        where: { id: eventtier.id },
        data: { available: eventtier.available - quantity },
      });
      return NextResponse.json(
        {
          success: true,
          message:
            "Yuor ticket has been recieved and created successfully, wait for yuor Email",
          update,
        },
        { status: 201 }
      );
    } else {
      const update = await prisma.tier.update({
        where: { id: eventtier.id },
        data: { available: eventtier.available - quantity },
      });
      return NextResponse.json(
        {
          success: true,
          message:
            "Yuor ticket has been recieved and created successfully, wait for yuor Email",
          update,
        },
        { status: 201 }
      );
    }

    // Update tier
  } catch (error) {
    console.error("Ticket POST error:", error);
    return NextResponse.json(
      { error: "Failed to create ticket event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const events = await prisma.event.findMany({ include: { tiers: true } });
    // console.log(
    //   "Fetched ticket events from DB:",
    //   events.map((e) => e.tiers)
    // );
    return NextResponse.json(events);
  } catch (error) {
    console.error("Ticket GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket events" },
      { status: 500 }
    );
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

    await prisma.event.delete({ where: { id: id } });

    return NextResponse.json(
      { message: "Player deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Player DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete player" },
      { status: 500 }
    );
  }
}
