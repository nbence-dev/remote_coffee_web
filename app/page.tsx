import { listCoffeeShops } from "@/lib/repositories/coffeeShopsRepository";
import CoffeeShopList from "@/components/coffee/CoffeeShopList";

export default async function Home() {
  const shops = await listCoffeeShops();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900">
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-semibold">
          Remote-Friendly Coffee Spots
        </h1>
        <CoffeeShopList shops={shops} />
      </section>
    </main>
  );
}
