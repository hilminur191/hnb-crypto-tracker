import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Crypto Price Tracker",
  description: "Track cryptocurrency prices in real-time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bbg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <header className="border-b border-gray-200 dark:border-gray-700">
          <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
            <h1 className="text-xl font-bold">Crypto Tracker</h1>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:text-blue-500">
                  Home
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
