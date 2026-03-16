import { MapPin, ExternalLink } from "lucide-react";
import type { CoffeeShop } from "@/lib/types";
import { RatingDisplay } from "../common/RatingDisplay";

type CoffeeShopCardProps = {
  shop: CoffeeShop;
};

const CoffeeShopCard: React.FC<CoffeeShopCardProps> = ({ shop }) => {
  return (
    <li className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-[#e8dfd6] list-none">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl text-[#4a2c1a]">{shop.name}</h3>
      </div>

      <div className="space-y-3 mb-4">
        <RatingDisplay type="coffee" rating={shop.coffeeRating} />
        <RatingDisplay type="wifi" rating={shop.wifiRating} />
        <RatingDisplay type="work" rating={shop.workRating} />
      </div>

      {shop.notes && (
        <p className="mb-4 text-sm text-[#6b5444]">{shop.notes}</p>
      )}

      <div className="flex items-start gap-2 mb-4 text-[#6b5444]">
        <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
        <p className="text-sm break-all">{shop.mapsUrl}</p>
      </div>

      <a
        href={shop.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-[#4a2c1a] text-[#faf8f5] rounded-lg hover:bg-[#5c361f] transition-colors"
      >
        <span>Open in Google Maps</span>
        <ExternalLink className="w-4 h-4" />
      </a>
    </li>
  );
};

export default CoffeeShopCard;
