import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = Boolean(cookieStore.get(ADMIN_SESSION_COOKIE));
  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      {isAdmin ? (
        <div className="text-center max-w-md">
          <h1 className="font-semibold text-3xl md:text-4xl mb-3 text-[#4a2c1a]">
            You&apos;re already logged in
          </h1>
          <p className="text-sm md:text-base text-[#6b5444]">
            Head back to the home page to add or manage remote‑friendly coffee
            spots.
          </p>
        </div>
      ) : (
        <AdminLoginForm />
      )}
    </main>
  );
}
