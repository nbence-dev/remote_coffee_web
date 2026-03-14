export type Rating = 1 | 2 | 3 | 4 | 5;

export type CoffeeShop = {
  id: string;
  name: string;
  mapsUrl: string;
  coffeeRating: Rating;
  wifiRating: Rating;
  workRating: Rating;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCoffeeShopInput = {
  name: string;
  mapsUrl: string;
  coffeeRating: Rating;
  wifiRating: Rating;
  workRating: Rating;
  notes?: string;
};
