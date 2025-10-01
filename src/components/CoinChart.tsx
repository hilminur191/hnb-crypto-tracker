"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartProps = {
  id: string;
};

export default function CoinChart({ id }: ChartProps) {
  const [days, setDays] = useState(7);
  const [data, setData] = useState<{ date: string; price: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<
    Record<number, { date: string; price: number }[]>
  >({});

  useEffect(() => {
    // kalau data sudah ada di cache → langsung pakai
    if (cache[days]) {
      setData(cache[days]);
      return;
    }

    const controller = new AbortController();

    async function fetchChart() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch chart");

        const chart = await res.json();
        const formatted = chart.prices.map(
          ([timestamp, price]: [number, number]) => {
            const date = new Date(timestamp).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
            return { date, price };
          }
        );

        // simpan ke cache
        setCache((prev) => ({ ...prev, [days]: formatted }));
        setData(formatted);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching chart:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchChart();

    return () => controller.abort(); // batalkan request lama kalau days berubah
  }, [id, days, cache]);

  return (
    <div className="mt-8">
      {/* Toggle Buttons */}
      <div className="flex space-x-2 mb-4">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              days === d
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
          >
            {d} Days
          </button>
        ))}
      </div>

      {/* Chart */}
      {loading ? (
        // Skeleton loading state
        <div className="animate-pulse h-72 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
