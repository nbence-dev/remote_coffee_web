import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = cookies();
  const isAdmin = Boolean((await cookieStore).get(ADMIN_SESSION_COOKIE));
  return NextResponse.json({ isAdmin });
}
