"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AddCoffeeShopForm: React.FC = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setError(null);

    const name = (formData.get("name") as string)?.trim();
    const mapsUrl = (formData.get("mapsUrl") as string)?.trim();

    if (!name || !mapsUrl) {
      setError("Name and Maps URL are required.");
      return;
    }

    const payload = {
      name,
      mapsUrl,
      coffeeRating: Number(formData.get("coffeeRating")),
      wifiRating: Number(formData.get("wifiRating")),
      workRating: Number(formData.get("workRating")),
      notes: (formData.get("notes") as string) || undefined,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/coffee-shops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Something went wrong while saving.");
        return;
      }

      router.refresh();
      form.reset();
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-lg font-medium">Add a coffee shop</h2>
      <form onSubmit={onSubmit} className="space-y-4" method="post">
        <div className="space-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="mapsUrl"
            className="block text-sm font-medium text-zinc-700"
          >
            Google Maps URL
          </label>
          <input
            type="url"
            name="mapsUrl"
            id="mapsUrl"
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1">
            <label
              htmlFor="coffeeRating"
              className="block text-sm font-medium text-zinc-700"
            >
              Coffee
            </label>
            <select
              name="coffeeRating"
              id="coffeeRating"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue="4"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="wifiRating"
              className="block text-sm font-medium text-zinc-700"
            >
              WiFi
            </label>
            <select
              name="wifiRating"
              id="wifiRating"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue="4"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="workRating"
              className="block text-sm font-medium text-zinc-700"
            >
              Work
            </label>
            <select
              name="workRating"
              id="workRating"
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue="4"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-zinc-700"
          >
            Notes (optional)
          </label>
          <textarea
            name="notes"
            id="notes"
            rows={3}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {isSubmitting ? "Saving..." : "Add coffee shop"}
        </button>
      </form>
    </div>
  );
};

export default AddCoffeeShopForm;
