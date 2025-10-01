import Image from "next/image";
import Link from "next/link";

type CryptoCardProps = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
  marketCap: number;
};

export default function CryptoCard({
  id,
  name,
  symbol,
  image,
  price,
  change24h,
  marketCap,
}: CryptoCardProps) {
  return (
    <Link href={`/coin/${id}`} className="w-full">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col items-center transition transform hover:-translate-y-1 hover:shadow-xl">
        <Image
          src={image}
          alt={name}
          width={60}
          height={60}
          className="mb-2 rounded-full"
        />
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-sm text-gray-500 uppercase">{symbol}</p>

        <p className="mt-3 text-xl font-semibold">${price.toLocaleString()}</p>
        <p
          className={`text-sm font-medium ${
            change24h >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {change24h.toFixed(2)}%
        </p>

        <p className="text-xs text-gray-500 mt-2 text-center">
          Market Cap <br /> ${marketCap.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
