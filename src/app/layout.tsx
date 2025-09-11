import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import "./globals.css";
import { QueryClientContext } from "@/providers/queryClient";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Trenntine Pizzaria | Delivery Online",
  description: "Peça sua pizza favorita na Trenntine Pizzaria 🍕✨ Delivery rápido, massa artesanal e as melhores promoções. A pizzaria digital mais gostosa da internet!",

  keywords: [
    "pizzaria online",
    "pizza delivery",
    "pizza artesanal",
    "pizzaria digital",
    "Trenntine Pizzaria",
    "promoções de pizza",
  ],

  authors: [{ name: "Trenntine Pizzaria" }],
  creator: "Trenntine Pizzaria",

    robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Providers>
          <QueryClientContext>{children}</QueryClientContext>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
