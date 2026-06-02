import type { Metadata } from "next";
import "./globals.css";
import BottomNav from "./Bar bawah/BottomNav";

export const metadata: Metadata = {
  title: "TUKERIN - Marketplace Barang Bekas ITB",
  description: "Jual, beli, dan tukar barang bekas akademik khusus civitas ITB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}