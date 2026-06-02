"use client";
import { useRef } from "react";
import Navbar from "./components/Navbar";

export default function Home() {
  const searchRef = useRef<HTMLInputElement>(null);

  const categories = [
    { icon: "📚", label: "Buku", color: "#fffbeb" },
    { icon: "🧮", label: "Kalkulator", color: "#eff6ff" },
    { icon: "💻", label: "Elektronik", color: "#f1f5f9" },
    { icon: "📐", label: "Alat Gambar", color: "#faf5ff" },
    { icon: "🧪", label: "Lab Kit", color: "#f0fdf4" },
    { icon: "🎓", label: "Lainnya", color: "#fff7ed" },
  ];

  const listings = [
    { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", major: "STEI-R", condition: "Sangat Baik", bg: "#eff6ff" },
    { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", major: "STEI-R", condition: "Baik", bg: "#fffbeb" },
    { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", major: "SAPPK", condition: "Baik", bg: "#faf5ff" },
    { id: 4, icon: "🧪", title: "Lab Kit Kimia Lengkap", price: "Rp250.000", major: "FMIPA", condition: "Sangat Baik", bg: "#f0fdf4" },
    { id: 5, icon: "💻", title: "Laptop ThinkPad X270", price: "Rp4.500.000", major: "STEI", condition: "Baik", bg: "#f1f5f9" },
    { id: 6, icon: "📖", title: "Modul Fisika Dasar 1 & 2", price: "Rp50.000", major: "FTI", condition: "Bekas", bg: "#fff7ed" },
    { id: 7, icon: "📏", title: "Penggaris Teknik 60cm", price: "Rp35.000", major: "SAPPK", condition: "Baik", bg: "#faf5ff" },
    { id: 8, icon: "🔬", title: "Mikroskop Portable", price: "Rp180.000", major: "FMIPA", condition: "Sangat Baik", bg: "#f0fdf4" },
    { id: 9, icon: "📱", title: "iPad Mini Bekas", price: "Rp3.200.000", major: "STEI", condition: "Baik", bg: "#f1f5f9" },
    { id: 10, icon: "📗", title: "Buku Fisika Halliday", price: "Rp95.000", major: "FMIPA", condition: "Baik", bg: "#fffbeb" },
    { id: 11, icon: "🖊️", title: "Rapido Set Lengkap", price: "Rp120.000", major: "SAPPK", condition: "Sangat Baik", bg: "#faf5ff" },
    { id: 12, icon: "🧮", title: "Kalkulator HP Prime", price: "Rp280.000", major: "STEI-R", condition: "Baik", bg: "#eff6ff" },
  ];

  const stats = [
    { num: "12K+", label: "Listing Aktif" },
    { num: "3.5K+", label: "Mahasiswa" },
    { num: "2.1K+", label: "Terjual" },
    { num: "4.9★", label: "Rating" },
  ];

  function handleSearch() {
    const val = searchRef.current?.value || "";
    window.location.href = "/marketplace?q=" + encodeURIComponent(val);
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)", padding: "clamp(40px, 7vw, 96px) clamp(16px, 4vw, 40px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 999, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ color: "#fff", fontSize: 13 }}>✓ Marketplace Khusus Civitas ITB</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 64px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 20, maxWidth: 700 }}>
            Jual, Beli & Tukar{" "}
            <span style={{ color: "#fde047" }}>Barang Bekas Akademik</span>
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: "clamp(14px, 2vw, 18px)", lineHeight: 1.6, marginBottom: 32, maxWidth: 560 }}>
            Temukan buku, kalkulator, lab kit dari mahasiswa ITB terverifikasi.
          </p>

          {/* Search */}
          <div style={{ display: "flex", gap: 10, maxWidth: 600, marginBottom: 40 }}>
            <input
              ref={searchRef}
              placeholder="Cari barang..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{ flex: 1, borderRadius: 14, padding: "14px 18px", fontSize: 14, border: "2px solid #facc15", outline: "none", backgroundColor: "#fff", color: "#1e293b", minWidth: 0 }}
            />
            <button
              onClick={handleSearch}
              style={{ flexShrink: 0, borderRadius: 14, padding: "14px 20px", fontSize: 14, fontWeight: 700, backgroundColor: "#facc15", color: "#1e3a5f", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Cari
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "clamp(20px, 4vw, 56px)", flexWrap: "wrap" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <p style={{ fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 800, color: "#fff", margin: 0 }}>{s.num}</p>
                <p style={{ fontSize: 13, color: "#93c5fd", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(28px, 5vw, 56px) clamp(16px, 4vw, 24px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 700, margin: 0 }}>Kategori</h3>
          <a href="/marketplace" style={{ fontSize: 13, color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>Lihat semua →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
          {categories.map((cat) => (
            <a href={"/marketplace?q=" + cat.label} key={cat.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, borderRadius: 18, backgroundColor: cat.color, border: "1px solid #e2e8f0", padding: "20px 8px", textDecoration: "none" }}>
              <span style={{ fontSize: "clamp(24px, 4vw, 36px)" }}>{cat.icon}</span>
              <span style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: 600, color: "#334155", textAlign: "center" }}>{cat.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px) clamp(20px, 3vw, 32px)" }}>
        <div style={{ borderRadius: 20, background: "linear-gradient(135deg, #ef4444 0%, #7c3aed 100%)", padding: "clamp(20px, 4vw, 36px) clamp(20px, 5vw, 48px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(16px, 2.5vw, 24px)", margin: "0 0 6px" }}>🎓 COD aman di kampus ITB</p>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(12px, 1.5vw, 15px)", margin: 0 }}>Semua penjual terverifikasi email @itb.ac.id</p>
          </div>
          <a href="/jual" style={{ flexShrink: 0, display: "inline-block", borderRadius: 12, backgroundColor: "#fff", padding: "12px 24px", fontSize: 14, fontWeight: 700, color: "#7c3aed", textDecoration: "none" }}>Mulai Jual →</a>
        </div>
      </section>

      {/* Listing Terbaru */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px, 4vw, 24px) clamp(40px, 7vw, 80px)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: 700, margin: 0 }}>Listing Terbaru</h3>
          <a href="/marketplace" style={{ fontSize: 13, color: "#2563eb", textDecoration: "none", fontWeight: 500 }}>Lihat semua →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "clamp(8px, 2vw, 16px)" }}>
          {listings.map((item) => (
            <a href={"/listing/" + item.id} key={item.id} style={{ borderRadius: 16, backgroundColor: "#fff", border: "1px solid #e2e8f0", overflow: "hidden", textDecoration: "none", display: "block", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div style={{ height: "clamp(90px, 14vw, 140px)", backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(32px, 6vw, 48px)" }}>
                {item.icon}
              </div>
              <div style={{ padding: "clamp(10px, 2vw, 14px)" }}>
                <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.3 }}>{item.title}</p>
                <p style={{ fontSize: "clamp(13px, 2vw, 15px)", fontWeight: 700, color: "#ef4444", margin: "6px 0" }}>{item.price}</p>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  <span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "2px 6px", fontSize: "clamp(9px, 1.2vw, 11px)", color: "#2563eb" }}>{item.major}</span>
                  <span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "2px 6px", fontSize: "clamp(9px, 1.2vw, 11px)", color: "#16a34a" }}>{item.condition}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}