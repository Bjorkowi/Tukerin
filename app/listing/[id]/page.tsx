"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const listings = [
  { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", major: "STEI-R", condition: "Sangat Baik", category: "Kalkulator", bg: "#eff6ff", uploadDate: "1 Jun 2026", views: 24, description: "Kalkulator scientific Casio FX-991EX kondisi sangat baik. Semua tombol berfungsi normal, layar jernih tanpa goresan.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.9, totalSales: 12 } },
  { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", major: "STEI-R", condition: "Baik", category: "Buku", bg: "#fffbeb", uploadDate: "31 Mei 2026", views: 18, description: "Buku Kalkulus James Stewart edisi 8. Kondisi baik, ada beberapa highlight pensil di bagian awal.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.7, totalSales: 8 } },
  { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff", uploadDate: "30 Mei 2026", views: 11, description: "Set drawing pen lengkap isi 6 ukuran (0.1–0.8). Tinta masih penuh semua.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.8, totalSales: 5 } },
  { id: 4, icon: "🧪", title: "Lab Kit Kimia Lengkap", price: "Rp250.000", major: "FMIPA", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4", uploadDate: "29 Mei 2026", views: 32, description: "Lab kit kimia lengkap: beaker glass, erlenmeyer, pipet, spatula, dll. Dipakai satu semester saja.", seller: { name: "Demo User 2", major: "Informatika", rating: 5.0, totalSales: 3 } },
  { id: 5, icon: "💻", title: "Laptop ThinkPad X270", price: "Rp4.500.000", major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "28 Mei 2026", views: 87, description: "ThinkPad X270, Core i5 gen 7, RAM 8GB, SSD 256GB. Baterai tahan 4 jam. Sudah install Windows 11.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.6, totalSales: 20 } },
  { id: 6, icon: "📖", title: "Modul Fisika Dasar 1 & 2", price: "Rp50.000", major: "FTI", condition: "Bekas", category: "Buku", bg: "#fff7ed", uploadDate: "27 Mei 2026", views: 9, description: "Modul Fisika Dasar 1 dan 2 lengkap. Termasuk kumpulan soal UTS dan UAS tahun lalu.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.5, totalSales: 15 } },
  { id: 7, icon: "📏", title: "Penggaris Teknik 60cm", price: "Rp35.000", major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff", uploadDate: "26 Mei 2026", views: 6, description: "Penggaris teknik 60cm kondisi baik, tidak ada goresan berarti.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.7, totalSales: 6 } },
  { id: 8, icon: "🔬", title: "Mikroskop Portable", price: "Rp180.000", major: "FMIPA", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4", uploadDate: "25 Mei 2026", views: 14, description: "Mikroskop portable perbesaran 40x-1000x. Kondisi sangat baik, lengkap dengan kotak penyimpanan.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.9, totalSales: 4 } },
  { id: 9, icon: "📱", title: "iPad Mini Bekas", price: "Rp3.200.000", major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "24 Mei 2026", views: 56, description: "iPad Mini generasi 5, 64GB WiFi. Kondisi baik, layar mulus.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.8, totalSales: 7 } },
  { id: 10, icon: "📗", title: "Buku Fisika Halliday", price: "Rp95.000", major: "FMIPA", condition: "Baik", category: "Buku", bg: "#fffbeb", uploadDate: "23 Mei 2026", views: 21, description: "Buku Fisika Halliday edisi 10 jilid 1. Kondisi baik, ada highlight di beberapa halaman.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.6, totalSales: 9 } },
  { id: 11, icon: "🖊️", title: "Rapido Set Lengkap", price: "Rp120.000", major: "SAPPK", condition: "Sangat Baik", category: "Alat Gambar", bg: "#faf5ff", uploadDate: "22 Mei 2026", views: 8, description: "Rapido set lengkap 6 ukuran. Tinta masih penuh, kondisi sangat baik.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.9, totalSales: 3 } },
  { id: 12, icon: "🧮", title: "Kalkulator HP Prime", price: "Rp280.000", major: "STEI-R", condition: "Baik", category: "Kalkulator", bg: "#eff6ff", uploadDate: "21 Mei 2026", views: 19, description: "Kalkulator HP Prime grafis touchscreen. Kondisi baik, baterai masih bagus.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.7, totalSales: 5 } },
  { id: 13, icon: "📓", title: "Buku Kimia Organik Fessenden", price: "Rp85.000", major: "FMIPA", condition: "Baik", category: "Buku", bg: "#fffbeb", uploadDate: "20 Mei 2026", views: 12, description: "Buku Kimia Organik Fessenden jilid 1 & 2. Kondisi baik, lengkap.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.5, totalSales: 6 } },
  { id: 14, icon: "🖥️", title: "Monitor LED 22 inch", price: "Rp850.000", major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "19 Mei 2026", views: 43, description: "Monitor LED 22 inch resolusi Full HD. Kondisi baik, tidak ada dead pixel.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.8, totalSales: 2 } },
  { id: 15, icon: "⌨️", title: "Keyboard Mechanical Bekas", price: "Rp320.000", major: "STEI", condition: "Sangat Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "18 Mei 2026", views: 37, description: "Keyboard mechanical switch blue. Kondisi sangat baik, semua tombol berfungsi normal.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.9, totalSales: 4 } },
  { id: 16, icon: "📐", title: "Busur Derajat Teknik", price: "Rp25.000", major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff", uploadDate: "17 Mei 2026", views: 5, description: "Busur derajat teknik ukuran besar. Kondisi baik, transparan dan mudah dibaca.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.6, totalSales: 8 } },
  { id: 17, icon: "📚", title: "Buku Struktur Data Algoritma", price: "Rp75.000", major: "STEI", condition: "Baik", category: "Buku", bg: "#fffbeb", uploadDate: "16 Mei 2026", views: 15, description: "Buku Struktur Data dan Algoritma edisi terbaru. Kondisi baik.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.7, totalSales: 7 } },
  { id: 18, icon: "🧪", title: "Pipet Tetes Set 10pcs", price: "Rp45.000", major: "FMIPA", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4", uploadDate: "15 Mei 2026", views: 7, description: "Set pipet tetes 10 buah berbagai ukuran. Kondisi sangat baik dan steril.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.8, totalSales: 5 } },
  { id: 19, icon: "🔭", title: "Teleskop Mini Portable", price: "Rp220.000", major: "FMIPA", condition: "Baik", category: "Lab Kit", bg: "#f0fdf4", uploadDate: "14 Mei 2026", views: 11, description: "Teleskop mini portable perbesaran 60x. Kondisi baik.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.5, totalSales: 2 } },
  { id: 20, icon: "💾", title: "SSD External 500GB", price: "Rp580.000", major: "STEI", condition: "Sangat Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "13 Mei 2026", views: 29, description: "SSD External 500GB USB 3.1. Kecepatan baca/tulis tinggi, kondisi sangat baik.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.9, totalSales: 3 } },
  { id: 21, icon: "📘", title: "Buku Mekanika Fluida", price: "Rp90.000", major: "FTI", condition: "Baik", category: "Buku", bg: "#fffbeb", uploadDate: "12 Mei 2026", views: 8, description: "Buku Mekanika Fluida Munson edisi 7. Kondisi baik, ada beberapa highlight.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.6, totalSales: 4 } },
  { id: 22, icon: "🧮", title: "Kalkulator Sharp EL-W531", price: "Rp130.000", major: "FMIPA", condition: "Baik", category: "Kalkulator", bg: "#eff6ff", uploadDate: "11 Mei 2026", views: 13, description: "Kalkulator Sharp EL-W531 scientific. Kondisi baik, semua fungsi normal.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.7, totalSales: 6 } },
  { id: 23, icon: "🖊️", title: "Drawing Tablet Wacom Bekas", price: "Rp750.000", major: "SAPPK", condition: "Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "10 Mei 2026", views: 34, description: "Wacom Intuos Small. Kondisi baik, pen masih responsif.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.8, totalSales: 2 } },
  { id: 24, icon: "📐", title: "Set Square Teknik Lengkap", price: "Rp55.000", major: "SAPPK", condition: "Sangat Baik", category: "Alat Gambar", bg: "#faf5ff", uploadDate: "9 Mei 2026", views: 6, description: "Set square teknik lengkap 30-60 dan 45 derajat. Kondisi sangat baik.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.9, totalSales: 4 } },
  { id: 25, icon: "📗", title: "Buku Termodinamika Cengel", price: "Rp110.000", major: "FTI", condition: "Baik", category: "Buku", bg: "#fffbeb", uploadDate: "8 Mei 2026", views: 10, description: "Buku Termodinamika Cengel edisi 8. Kondisi baik, sangat lengkap.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.6, totalSales: 3 } },
  { id: 26, icon: "🔌", title: "Breadboard + Kabel Jumper", price: "Rp65.000", major: "STEI-R", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4", uploadDate: "7 Mei 2026", views: 16, description: "Breadboard 830 titik + 120 kabel jumper berbagai ukuran. Kondisi sangat baik.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.8, totalSales: 7 } },
  { id: 27, icon: "📱", title: "Samsung Galaxy A52 Bekas", price: "Rp2.800.000", major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "6 Mei 2026", views: 48, description: "Samsung Galaxy A52 128GB. Kondisi baik, layar amoled mulus.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.7, totalSales: 1 } },
  { id: 28, icon: "📚", title: "Buku Matematika Teknik", price: "Rp70.000", major: "FTI", condition: "Bekas", category: "Buku", bg: "#fffbeb", uploadDate: "5 Mei 2026", views: 7, description: "Buku Matematika Teknik Kreyszig edisi 10. Ada coretan tapi masih terbaca jelas.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.5, totalSales: 5 } },
  { id: 29, icon: "🧪", title: "Gelas Kimia Pyrex 500ml", price: "Rp55.000", major: "FMIPA", condition: "Baik", category: "Lab Kit", bg: "#f0fdf4", uploadDate: "4 Mei 2026", views: 9, description: "Gelas kimia Pyrex 500ml kondisi baik, tidak ada retak atau goresan.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.8, totalSales: 3 } },
  { id: 30, icon: "💻", title: "MacBook Air M1 2020", price: "Rp9.500.000", major: "STEI", condition: "Sangat Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "3 Mei 2026", views: 112, description: "MacBook Air M1 2020 8GB 256GB. Kondisi sangat baik, baterai masih 95% kapasitas.", seller: { name: "Demo User 2", major: "Informatika", rating: 5.0, totalSales: 1 } },
  { id: 31, icon: "🖊️", title: "Staedtler Mars Technico", price: "Rp40.000", major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff", uploadDate: "2 Mei 2026", views: 4, description: "Pensil mekanik Staedtler Mars Technico 2mm. Kondisi baik, lengkap dengan lead pointer.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.7, totalSales: 8 } },
  { id: 32, icon: "📘", title: "Buku Rangkaian Listrik Edminister", price: "Rp80.000", major: "STEI-R", condition: "Baik", category: "Buku", bg: "#fffbeb", uploadDate: "1 Mei 2026", views: 11, description: "Buku Rangkaian Listrik Edminister Schaum's Outline. Kondisi baik, banyak contoh soal.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.6, totalSales: 4 } },
  { id: 33, icon: "🧮", title: "Kalkulator Casio FX-570ES", price: "Rp95.000", major: "FMIPA", condition: "Sangat Baik", category: "Kalkulator", bg: "#eff6ff", uploadDate: "30 Apr 2026", views: 22, description: "Kalkulator Casio FX-570ES Plus kondisi sangat baik. Natural display, semua fungsi normal.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.9, totalSales: 6 } },
  { id: 34, icon: "🔬", title: "Kaca Pembesar 10x", price: "Rp30.000", major: "FMIPA", condition: "Baik", category: "Lab Kit", bg: "#f0fdf4", uploadDate: "29 Apr 2026", views: 5, description: "Kaca pembesar 10x diameter 90mm. Kondisi baik, lensa jernih tanpa goresan.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.5, totalSales: 5 } },
  { id: 35, icon: "⌨️", title: "Mouse Logitech M331 Bekas", price: "Rp145.000", major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9", uploadDate: "28 Apr 2026", views: 18, description: "Mouse Logitech M331 Silent wireless. Kondisi baik, scroll dan klik masih responsif.", seller: { name: "Demo User 1", major: "Teknik Elektro", rating: 4.7, totalSales: 3 } },
  { id: 36, icon: "📐", title: "Meja Gambar A3 Portable", price: "Rp180.000", major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff", uploadDate: "27 Apr 2026", views: 13, description: "Meja gambar portable ukuran A3 dengan sudut kemiringan adjustable.", seller: { name: "Demo User 2", major: "Informatika", rating: 4.8, totalSales: 2 } },
];

export default function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [item, setItem] = useState<typeof listings[0] | undefined>(undefined);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    const session = localStorage.getItem("tukerin_session");
    setIsLoggedIn(!!session);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    params.then(({ id }) => {
      setItem(listings.find((l) => l.id === Number(id)));
    });
  }, [params]);

  if (!item) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "120px 24px" }}>
          <div style={{ fontSize: 64 }}>🔍</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "16px 0 8px" }}>Barang tidak ditemukan</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>Listing ini mungkin sudah dihapus atau terjual.</p>
          <a href="/marketplace" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 600 }}>Kembali ke Marketplace</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "16px" : "24px" }}>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>
          <a href="/" style={{ color: "#64748b", textDecoration: "none" }}>Beranda</a>{" › "}
          <a href="/marketplace" style={{ color: "#64748b", textDecoration: "none" }}>Marketplace</a>{" › "}
          <span style={{ color: "#1e293b" }}>{item.title}</span>
        </p>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 32 }}>
          <div style={{ borderRadius: 20, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: isMobile ? 80 : 120, minHeight: isMobile ? 240 : 400, flex: isMobile ? "none" : 1 }}>{item.icon}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: isMobile ? "none" : 1 }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "4px 12px", fontSize: 12, color: "#2563eb" }}>{item.major}</span>
                <span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "4px 12px", fontSize: 12, color: "#16a34a" }}>{item.condition}</span>
                <span style={{ borderRadius: 999, backgroundColor: "#f1f5f9", padding: "4px 12px", fontSize: 12, color: "#475569" }}>{item.category}</span>
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: "#64748b" }}>📅 Diupload: {item.uploadDate}</span>
                <span style={{ fontSize: 12, color: "#64748b" }}>👁️ {item.views} views</span>
              </div>
              <h1 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{item.title}</h1>
              <p style={{ fontSize: isMobile ? 28 : 36, fontWeight: 700, color: "#ef4444", margin: 0 }}>{item.price}</p>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#475569", margin: "0 0 8px" }}>Deskripsi Barang</h2>
              <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0 }}>{item.description}</p>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#475569", margin: "0 0 12px" }}>Informasi Penjual</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <img src={"https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(item.seller.name) + "&backgroundColor=b6e3f4"} style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#e0f2fe", flexShrink: 0 }} alt={item.seller.name} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{item.seller.name}</p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>{item.seller.major} · ITB</p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>⭐ {item.seller.rating} · {item.seller.totalSales} barang terjual</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {isLoggedIn ? (
                <a href={"/chat?seller=" + encodeURIComponent(item.seller.name) + "&item=" + encodeURIComponent(item.title) + "&price=" + encodeURIComponent(item.price)} style={{ display: "block", textAlign: "center", backgroundColor: "#2563eb", color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>💬 Chat Penjual</a>
              ) : (
                <a href="/login" style={{ display: "block", textAlign: "center", backgroundColor: "#2563eb", color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>🔑 Login untuk Chat Penjual</a>
              )}
              <button style={{ width: "100%", padding: "14px", borderRadius: 12, border: "2px solid #2563eb", backgroundColor: "transparent", color: "#2563eb", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>🤍 Tambah ke Wishlist</button>
              <a href="/marketplace" style={{ display: "block", textAlign: "center", backgroundColor: "#f1f5f9", color: "#475569", padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>← Kembali ke Marketplace</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}