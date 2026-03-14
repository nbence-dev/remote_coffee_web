"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AdminLoginForm: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "Login failed.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <section className="mx-auto flex min-h-screen max-w-md items-center px-4 py-12">
        <div className="w-full rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="mb-4 text-xl font-semibold">Admin Login</h1>
          <p className="mb-6 text-sm text-zinc-600">
            Enter the admin password to manage coffee shop entries.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminLoginForm;
