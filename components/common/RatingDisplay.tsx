import { Coffee, Wifi, Armchair } from "lucide-react";

interface RatingDisplayProps {
  type: "coffee" | "wifi" | "work";
  rating: number;
}

export function RatingDisplay({ type, rating }: RatingDisplayProps) {
  const icons = {
    coffee: Coffee,
    wifi: Wifi,
    work: Armchair,
  };

  const labels = {
    coffee: "Coffee",
    wifi: "WiFi",
    work: "Work Environment",
  };

  const Icon = icons[type];

  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-[#d4a574]" />
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            className={`w-4 h-4 rounded-full ${
              star <= rating ? "bg-[#d4a574]" : "bg-[#e8dfd6]"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-[#6b5444] ml-1">{labels[type]}</span>
    </div>
  );
}
