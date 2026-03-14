type Rating = 1 | 2 | 3 | 4 | 5;

type CoffeeShop = {
  id: string;
  name: string;
  mapsUrl: string;
  coffeeRating: number;
  wifiRating: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};
