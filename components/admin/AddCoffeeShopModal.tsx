"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";
import type { CreateCoffeeShopInput, Rating } from "@/lib/types";

interface AddShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (shop: CreateCoffeeShopInput) => void;
}

export function AddShopModal({ isOpen, onClose, onSubmit }: AddShopModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    mapsUrl: "",
    coffeeRating: 3 as Rating,
    wifiRating: 3 as Rating,
    workRating: 3 as Rating,
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, mapsUrl, coffeeRating, wifiRating, workRating, notes } =
      formData;

    const payload: CreateCoffeeShopInput = {
      name,
      mapsUrl,
      coffeeRating,
      wifiRating,
      workRating,
      notes: notes.trim() ? notes : undefined,
    };

    onSubmit(payload);

    setFormData({
      name: "",
      mapsUrl: "",
      coffeeRating: 3 as Rating,
      wifiRating: 3 as Rating,
      workRating: 3 as Rating,
      notes: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-[#e8dfd6] px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 className="text-2xl text-[#4a2c1a]">Add Coffee Shop</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f3ede6] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#6b5444]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-[#4a2c1a] mb-2">
              Coffee Shop Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-[#f3ede6] border border-[#e8dfd6] focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1b0e]"
            />
          </div>

          <div>
            <label htmlFor="mapsUrl" className="block text-[#4a2c1a] mb-2">
              Google Maps Link *
            </label>
            <input
              id="mapsUrl"
              type="url"
              required
              value={formData.mapsUrl}
              onChange={(e) =>
                setFormData({ ...formData, mapsUrl: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg bg-[#f3ede6] border border-[#e8dfd6] focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1b0e]"
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="coffeeRating"
                className="block text-[#4a2c1a] mb-2"
              >
                Coffee Rating
              </label>
              <select
                id="coffeeRating"
                value={formData.coffeeRating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coffeeRating: Number(e.target.value) as Rating,
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#f3ede6] border border-[#e8dfd6] focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1b0e]"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} / 5
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="wifiRating" className="block text-[#4a2c1a] mb-2">
                WiFi Rating
              </label>
              <select
                id="wifiRating"
                value={formData.wifiRating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    wifiRating: Number(e.target.value) as Rating,
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#f3ede6] border border-[#e8dfd6] focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1b0e]"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} / 5
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="workRating" className="block text-[#4a2c1a] mb-2">
                Work Environment
              </label>
              <select
                id="workRating"
                value={formData.workRating}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    workRating: Number(e.target.value) as Rating,
                  })
                }
                className="w-full px-4 py-3 rounded-lg bg-[#f3ede6] border border-[#e8dfd6] focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1b0e]"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} / 5
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-[#4a2c1a] mb-2">
              Notes / Description
            </label>
            <textarea
              id="description"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-[#f3ede6] border border-[#e8dfd6] focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1b0e] resize-none"
              placeholder="Additional notes about this coffee shop..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#4a2c1a] text-[#faf8f5] rounded-lg hover:bg-[#5c361f] transition-colors"
            >
              Submit Coffee Shop
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#e8dfd6] text-[#4a2c1a] rounded-lg hover:bg-[#d4c9bc] transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
