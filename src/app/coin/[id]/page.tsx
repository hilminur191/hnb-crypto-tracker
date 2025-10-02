import Image from "next/image";
import CoinChart from "@/components/CoinChart";

type CoinDetail = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    total_supply: number;
  };
  market_cap_rank: number;
};

async function getCoinDetail(id: string): Promise<CoinDetail | null> {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed fetching coin:", id, res.status, res.statusText);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching coin:", error);
    return null;
  }
}

// ✅ tidak ada any, params aman
export default async function CoinPage({
  params,
}: {
  params: Record<string, string>;
}) {
  const id = params.id;
  const coin = await getCoinDetail(id);

  if (!coin) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 text-center bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
        <h2 className="text-xl font-bold text-blue-600">
          Failed to load coin details
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Please try again later ...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow rounded-xl">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{coin.name}</h1>
          <p className="uppercase text-gray-500">{coin.symbol}</p>
        </div>
      </div>

      {/* Info */}
      <p className="text-xl font-semibold mb-2">
        💵 Price: ${coin.market_data.current_price.usd.toLocaleString()}
      </p>
      <p className="text-gray-500 mb-2">Rank: #{coin.market_cap_rank}</p>
      <p className="text-gray-500 mb-2">
        Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
      </p>
      <p className="text-gray-500 mb-2">
        Volume: ${coin.market_data.total_volume.usd.toLocaleString()}
      </p>
      <p className="text-gray-500">
        Total Supply: {coin.market_data.total_supply?.toLocaleString() ?? "N/A"}
      </p>

      {/* Chart */}
      <CoinChart id={id} />
    </div>
  );
}
