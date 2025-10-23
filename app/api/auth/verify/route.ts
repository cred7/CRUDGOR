import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value;
  const valid = token && verifyToken(token);

  return NextResponse.json({ authenticated: !!valid });
}
