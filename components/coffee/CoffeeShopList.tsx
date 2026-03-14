import type { CoffeeShop } from "@/lib/types";
import CoffeeShopCard from "./CoffeeShopCard";

type CoffeeShopListProps = {
  shops: CoffeeShop[];
};

const CoffeeShopList: React.FC<CoffeeShopListProps> = ({ shops }) => {
  if (shops.length === 0) {
    return (
      <p className="text-zinc-600">
        No coffee shops yet. Add one as admin later.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {shops.map((shop) => (
        <CoffeeShopCard key={shop.id} shop={shop} />
      ))}
    </ul>
  );
};

export default CoffeeShopList;
