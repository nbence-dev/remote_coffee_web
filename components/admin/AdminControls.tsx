"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AddShopModal } from "./AddCoffeeShopModal";
import type { CreateCoffeeShopInput } from "@/lib/types";

const AdminControls: React.FC = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSubmit = async (payload: CreateCoffeeShopInput) => {
    setError(null);

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
      setIsModalOpen(false);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setError(null);
    setIsLoggingOut(true);

    try {
      const res = await fetch("/api/admin/login", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Logout failed");
        return;
      }
      router.replace("/");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {error && (
        <div className="fixed bottom-24 right-6 z-50 rounded-md bg-red-600 px-3 py-2 text-sm text-white shadow-lg">
          {error}
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-full bg-[#4a2c1a] px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-[#4a2c1a]/80 cursor-pointer disabled:cursor-not-allowed disabled:bg-[#4a2c1a]/60"
        >
          {isSubmitting ? "Saving..." : "Add coffee shop"}
        </button>
        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="rounded-full bg-zinc-800 px-4 py-2 text-xs font-medium text-white shadow-lg hover:bg-zinc-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

      <AddShopModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AdminControls;
