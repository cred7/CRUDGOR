import { signToken } from "@/lib/jwt";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(email, password);

  const user = {
    id: 1,
    email: "test@example.com",
    passwordHash: await bcrypt.hash("password", 10),
  };

  if (email !== user.email)
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid)
    return NextResponse.json(
      { message: "Invalid credentials pas" },
      { status: 401 }
    );

  const token = signToken({ id: user.id, email: user.email });

  // Option 1: set token in HTTP-only cookie
  const res = NextResponse.json({ success: true });
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 10,
  });
  return res;
}
