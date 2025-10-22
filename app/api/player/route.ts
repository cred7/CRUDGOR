import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Create a new player
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.name || !data.position) {
      return NextResponse.json(
        { error: "Missing required fields (name, position)" },
        { status: 400 }
      );
    }
    //  save to the database

    const player = await prisma.player.create({ data });
    console.log("Received player data:", data);
    return NextResponse.json({
      message: "Player created successfully",

      status: 201,
      player,
    });
  } catch (error) {
    console.error("Player POST error:", error);
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
}

// Simple in-memory cache
let cachedPlayers: any[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_TTL = 60 * 1000; // 1 minute in milliseconds
// Get all players
export async function GET() {
  try {
    const now = Date.now();
    // Check if cache is valid
    if (cachedPlayers && cacheTimestamp && now - cacheTimestamp < CACHE_TTL) {
      // console.log("Returning players from cache");
      return NextResponse.json(cachedPlayers, { status: 200 });
    }
    const players = await prisma.player.findMany();
    console.log("Fetched players from DB:");

    // Update cache
    cachedPlayers = players;
    cacheTimestamp = now;

    if (players === null || players.length === 0) {
      return NextResponse.json(
        { message: "No players found" },
        { status: 200 }
      );
    }
    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    console.error("Player GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}

// 🟡 Update a player
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...updateData } = data;

    if (!id) {
      return NextResponse.json(
        { error: "Missing player ID for update" },
        { status: 400 }
      );
    }

    const updatedPlayer = await prisma.player.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Player updated successfully", updatedPlayer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Player PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update player" },
      { status: 500 }
    );
  }
}

// 🔴 Delete a player
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing player ID for deletion" },
        { status: 400 }
      );
    }

    await prisma.player.delete({ where: { id: Number(id) } });

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
