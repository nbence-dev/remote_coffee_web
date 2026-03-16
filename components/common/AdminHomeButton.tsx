"use client";

import { useRouter } from "next/navigation";

export function GoToHome() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-4 inline-flex items-center rounded-lg bg-[#4a2c1a] px-4 py-2 text-sm font-medium text-[#faf8f5] shadow-sm hover:bg-[#5c361f] transition-colors"
    >
      Back to home
    </button>
  );
}
