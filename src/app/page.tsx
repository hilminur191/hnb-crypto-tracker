import HomePage from "./HomePage";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
};

async function getCoins(): Promise<Coin[]> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch data");

  return res.json();
}

export default async function Page() {
  const coins = await getCoins();
  return <HomePage coins={coins} />;
}
