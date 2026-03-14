-- CreateTable
CREATE TABLE "CoffeeShop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mapsUrl" TEXT NOT NULL,
    "coffeeRating" INTEGER NOT NULL,
    "wifiRating" INTEGER NOT NULL,
    "workRating" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeeShop_pkey" PRIMARY KEY ("id")
);
