import { prisma } from "../db";
import type { CoffeeShop, CreateCoffeeShopInput, Rating } from "../types";

export async function listCoffeeShops(): Promise<CoffeeShop[]> {
  const rows = await prisma.coffeeShop.findMany({
    orderBy: { createdAt: "desc" },
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    mapsUrl: row.mapsUrl,
    coffeeRating: row.coffeeRating as Rating,
    wifiRating: row.wifiRating as Rating,
    workRating: row.workRating as Rating,
    notes: row.notes ?? undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }));
}

export async function createCoffeeShop(
  input: CreateCoffeeShopInput,
): Promise<CoffeeShop> {
  const row = await prisma.coffeeShop.create({
    data: {
      name: input.name,
      mapsUrl: input.mapsUrl,
      coffeeRating: input.coffeeRating,
      wifiRating: input.wifiRating,
      workRating: input.workRating,
      notes: input.notes ?? null,
    },
  });

  return {
    id: row.id,
    name: row.name,
    mapsUrl: row.mapsUrl,
    coffeeRating: row.coffeeRating as Rating,
    wifiRating: row.wifiRating as Rating,
    workRating: row.workRating as Rating,
    notes: row.notes ?? undefined,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
