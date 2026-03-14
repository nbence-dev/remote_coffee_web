export function Hero() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="font-semibold text-4xl md:text-5xl mb-6 text-[#4a2c1a]">
          Find Coffee Shops Perfect for Remote Work
        </h1>
        <p className="text-lg text-[#6b5444] max-w-2xl mx-auto mb-8">
          Discover cafés with great coffee, strong WiFi, and a comfortable
          environment for getting work done.
        </p>
        {/* <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search by location or name..."
            className="w-full px-4 py-3 rounded-lg bg-white border border-[#e8dfd6] focus:outline-none focus:ring-2 focus:ring-[#d4a574] text-[#2d1b0e] placeholder:text-[#6b5444]"
          />
        </div> */}
      </div>
    </section>
  );
}
