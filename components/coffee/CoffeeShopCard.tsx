import type { CoffeeShop } from "@/lib/types";

type CoffeeShopCardProps = {
  shop: CoffeeShop;
};

const CoffeeShopCard: React.FC<CoffeeShopCardProps> = ({ shop }) => {
  return (
    <li className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-medium">{shop.name}</h2>
        <span className="text-sm text-zinc-500">
          ☕ {shop.coffeeRating} · 📶 {shop.wifiRating} · 💻 {shop.workRating}
        </span>
      </div>
      <a
        href={shop.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block text-sm text-blue-600 hover:underline"
      >
        View on Google Maps
      </a>
      {shop.notes && <p className="mt-2 text-sm text-zinc-600">{shop.notes}</p>}
    </li>
  );
};

export default CoffeeShopCard;
