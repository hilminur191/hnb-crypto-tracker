"use client";

import { useState } from "react";
import CryptoCard from "@/components/CryptoCard";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

export default function HomePage({ coins }: { coins: Coin[] }) {
  const [search, setSearch] = useState("");

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search crypto..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Coins Grid */}
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <CryptoCard
              key={coin.id}
              id={coin.id} // ✅ pastikan ID yang dikirim sesuai CoinGecko
              name={coin.name}
              symbol={coin.symbol}
              image={coin.image}
              price={coin.current_price}
              change24h={coin.price_change_percentage_24h}
              marketCap={coin.market_cap}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No results found.</p>
        )}
      </main>
    </div>
  );
}
