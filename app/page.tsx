import { listCoffeeShops } from "@/lib/repositories/coffeeShopsRepository";
import CoffeeShopList from "@/components/coffee/CoffeeShopList";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import AdminControls from "@/components/admin/AdminControls";

export default async function Home() {
  const shops = await listCoffeeShops();
  const cookieStore = await cookies();
  const isAdmin = Boolean(cookieStore.get(ADMIN_SESSION_COOKIE));

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <section className="mx-auto max-w-4xl px-4 py-12">
        <Hero />

        <CoffeeShopList shops={shops} />

        {isAdmin ? <AdminControls /> : null}
      </section>
      <Footer />
    </main>
  );
}
