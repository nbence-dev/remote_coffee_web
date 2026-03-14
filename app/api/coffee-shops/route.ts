import {
  createCoffeeShop,
  listCoffeeShops,
} from "@/lib/repositories/coffeeShopsRepository";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { Rating } from "@/lib/types";

export async function GET() {
  const shops = await listCoffeeShops();
  return NextResponse.json(shops, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

    if (!adminSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const coffeeRating = Number(data.coffeeRating);
    const wifiRating = Number(data.wifiRating);
    const workRating = Number(data.workRating);

    const isValidRating = (value: number): value is Rating =>
      [1, 2, 3, 4, 5].includes(value);

    if (
      typeof data.name !== "string" ||
      typeof data.mapsUrl !== "string" ||
      !isValidRating(coffeeRating) ||
      !isValidRating(wifiRating) ||
      !isValidRating(workRating)
    ) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const created = await createCoffeeShop({
      name: data.name,
      mapsUrl: data.mapsUrl,
      coffeeRating,
      wifiRating,
      workRating,
      notes: data.notes,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
