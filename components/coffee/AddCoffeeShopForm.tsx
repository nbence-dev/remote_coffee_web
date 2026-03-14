"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AddCoffeeShopForm: React.FC = () => {
  const router = useRouter();

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      mapsUrl: formData.get("mapsUrl") as string,
      coffeeRating: Number(formData.get("coffeeRating")),
      wifiRating: Number(formData.get("wifiRating")),
      workRating: Number(formData.get("workRating")),
      notes: (formData.get("notes") as string) || undefined,
    };

    await fetch("/api/coffee-shops", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    router.refresh();
    event.currentTarget.reset();
  }
  return (
    <div>
      <form onSubmit={onSubmit} method="post">
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="mapsUrl">MapsURL</label>
        <input type="url" name="mapsUrl" id="mapsUrl" />
        <label htmlFor="coffeeRating">Coffee Rating</label>
        <select name="coffeeRating" id="coffeeRating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="wifiRating">WiFi Rating</label>
        <select name="wifiRating" id="wifiRating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="workRating">Work Rating</label>
        <select name="workRating" id="workRating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label htmlFor="notes">Notes</label>
        <textarea name="notes" id="notes" cols={30} rows={10}></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCoffeeShopForm;
