import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import TikTokBrowserGuard from "../components/TikTokBrowserGuard";


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-luxury",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-modern",
});

export const metadata: Metadata = {
  title: "Dunia Arkoub | Luxury Vehicle Consultant",
  description:
    "Personalized guidance for purchasing, leasing, factory orders, trade-ins, and luxury ownership with Dunia Arkoub.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${inter.variable} antialiased`}
      >
      
          {children}
        
      </body>
    </html>
  );
}