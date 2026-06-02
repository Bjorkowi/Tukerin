"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SkeletonCard from "../components/SkeletonCard";

const allListings = [
  { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: 150000, major: "STEI-R", condition: "Sangat Baik", category: "Kalkulator", bg: "#eff6ff" },
  { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: 120000, major: "STEI-R", condition: "Baik", category: "Buku", bg: "#fffbeb" },
  { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: 80000, major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff" },
  { id: 4, icon: "🧪", title: "Lab Kit Kimia Lengkap", price: 250000, major: "FMIPA", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4" },
  { id: 5, icon: "💻", title: "Laptop ThinkPad X270", price: 4500000, major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 6, icon: "📖", title: "Modul Fisika Dasar 1 & 2", price: 50000, major: "FTI", condition: "Bekas", category: "Buku", bg: "#fff7ed" },
  { id: 7, icon: "📏", title: "Penggaris Teknik 60cm", price: 35000, major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff" },
  { id: 8, icon: "🔬", title: "Mikroskop Portable", price: 180000, major: "FMIPA", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4" },
  { id: 9, icon: "📱", title: "iPad Mini Bekas", price: 3200000, major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 10, icon: "📗", title: "Buku Fisika Halliday", price: 95000, major: "FMIPA", condition: "Baik", category: "Buku", bg: "#fffbeb" },
  { id: 11, icon: "🖊️", title: "Rapido Set Lengkap", price: 120000, major: "SAPPK", condition: "Sangat Baik", category: "Alat Gambar", bg: "#faf5ff" },
  { id: 12, icon: "🧮", title: "Kalkulator HP Prime", price: 280000, major: "STEI-R", condition: "Baik", category: "Kalkulator", bg: "#eff6ff" },
  { id: 13, icon: "📓", title: "Buku Kimia Organik Fessenden", price: 85000, major: "FMIPA", condition: "Baik", category: "Buku", bg: "#fffbeb" },
  { id: 14, icon: "🖥️", title: "Monitor LED 22 inch", price: 850000, major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 15, icon: "⌨️", title: "Keyboard Mechanical Bekas", price: 320000, major: "STEI", condition: "Sangat Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 16, icon: "📐", title: "Busur Derajat Teknik", price: 25000, major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff" },
  { id: 17, icon: "📚", title: "Buku Struktur Data Algoritma", price: 75000, major: "STEI", condition: "Baik", category: "Buku", bg: "#fffbeb" },
  { id: 18, icon: "🧪", title: "Pipet Tetes Set 10pcs", price: 45000, major: "FMIPA", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4" },
  { id: 19, icon: "🔭", title: "Teleskop Mini Portable", price: 220000, major: "FMIPA", condition: "Baik", category: "Lab Kit", bg: "#f0fdf4" },
  { id: 20, icon: "💾", title: "SSD External 500GB", price: 580000, major: "STEI", condition: "Sangat Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 21, icon: "📘", title: "Buku Mekanika Fluida", price: 90000, major: "FTI", condition: "Baik", category: "Buku", bg: "#fffbeb" },
  { id: 22, icon: "🧮", title: "Kalkulator Sharp EL-W531", price: 130000, major: "FMIPA", condition: "Baik", category: "Kalkulator", bg: "#eff6ff" },
  { id: 23, icon: "🖊️", title: "Drawing Tablet Wacom Bekas", price: 750000, major: "SAPPK", condition: "Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 24, icon: "📐", title: "Set Square Teknik Lengkap", price: 55000, major: "SAPPK", condition: "Sangat Baik", category: "Alat Gambar", bg: "#faf5ff" },
  { id: 25, icon: "📗", title: "Buku Termodinamika Cengel", price: 110000, major: "FTI", condition: "Baik", category: "Buku", bg: "#fffbeb" },
  { id: 26, icon: "🔌", title: "Breadboard + Kabel Jumper", price: 65000, major: "STEI-R", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4" },
  { id: 27, icon: "📱", title: "Samsung Galaxy A52 Bekas", price: 2800000, major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 28, icon: "📚", title: "Buku Matematika Teknik", price: 70000, major: "FTI", condition: "Bekas", category: "Buku", bg: "#fffbeb" },
  { id: 29, icon: "🧪", title: "Gelas Kimia Pyrex 500ml", price: 55000, major: "FMIPA", condition: "Baik", category: "Lab Kit", bg: "#f0fdf4" },
  { id: 30, icon: "💻", title: "MacBook Air M1 2020", price: 9500000, major: "STEI", condition: "Sangat Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 31, icon: "🖊️", title: "Staedtler Mars Technico", price: 40000, major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff" },
  { id: 32, icon: "📘", title: "Buku Rangkaian Listrik Edminister", price: 80000, major: "STEI-R", condition: "Baik", category: "Buku", bg: "#fffbeb" },
  { id: 33, icon: "🧮", title: "Kalkulator Casio FX-570ES", price: 95000, major: "FMIPA", condition: "Sangat Baik", category: "Kalkulator", bg: "#eff6ff" },
  { id: 34, icon: "🔬", title: "Kaca Pembesar 10x", price: 30000, major: "FMIPA", condition: "Baik", category: "Lab Kit", bg: "#f0fdf4" },
  { id: 35, icon: "⌨️", title: "Mouse Logitech M331 Bekas", price: 145000, major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9" },
  { id: 36, icon: "📐", title: "Meja Gambar A3 Portable", price: 180000, major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff" },
];

const categories = ["Semua", "Buku", "Kalkulator", "Elektronik", "Alat Gambar", "Lab Kit"];
const majors = ["Semua Jurusan", "STEI-R", "STEI", "SAPPK", "FMIPA", "FTI"];
const conditions = ["Semua Kondisi", "Sangat Baik", "Baik", "Bekas"];

function formatPrice(p: number) {
  return "Rp" + p.toLocaleString("id-ID");
}

export default function MarketplacePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activeMajor, setActiveMajor] = useState("Semua Jurusan");
  const [activeCondition, setActiveCondition] = useState("Semua Kondisi");
  const [sortBy, setSortBy] = useState("Terbaru");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) {
      const decoded = decodeURIComponent(q);
      const matchCategory = categories.find((c) => c.toLowerCase() === decoded.toLowerCase());
      if (matchCategory && matchCategory !== "Semua") {
        setActiveCategory(matchCategory);
      } else {
        setSearch(decoded);
      }
    }
  }, []);

  const filtered = allListings
    .filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.major.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory = activeCategory === "Semua" || item.category === activeCategory;
      const matchMajor = activeMajor === "Semua Jurusan" || item.major === activeMajor;
      const matchCondition = activeCondition === "Semua Kondisi" || item.condition === activeCondition;
      const matchMin = minPrice === "" || item.price >= Number(minPrice);
      const matchMax = maxPrice === "" || item.price <= Number(maxPrice);
      return matchSearch && matchCategory && matchMajor && matchCondition && matchMin && matchMax;
    })
    .sort((a, b) => {
      if (sortBy === "Termurah") return a.price - b.price;
      if (sortBy === "Termahal") return b.price - a.price;
      return b.id - a.id;
    });

  function resetFilter() {
    setSearch(""); setActiveCategory("Semua"); setActiveMajor("Semua Jurusan");
    setActiveCondition("Semua Kondisi"); setMinPrice(""); setMaxPrice(""); setSortBy("Terbaru");
    window.history.replaceState({}, "", "/marketplace");
  }

  const hasActiveFilter = activeCategory !== "Semua" || activeMajor !== "Semua Jurusan" || activeCondition !== "Semua Kondisi" || minPrice !== "" || maxPrice !== "" || search !== "";

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)", padding: "clamp(32px, 5vw, 48px) clamp(16px, 4vw, 24px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, margin: "0 0 16px" }}>Marketplace</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 15 }}>🔍</span>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari barang..." style={{ width: "100%", borderRadius: 12, padding: "13px 16px 13px 40px", fontSize: 14, border: "2px solid #facc15", outline: "none", backgroundColor: "#fff", color: "#1e293b", boxSizing: "border-box" }} />
              {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#94a3b8" }}>✕</button>}
            </div>
            <button onClick={() => setShowFilter(!showFilter)} style={{ flexShrink: 0, borderRadius: 12, padding: "13px 16px", fontSize: 13, fontWeight: 700, backgroundColor: showFilter ? "#facc15" : "rgba(255,255,255,0.2)", color: showFilter ? "#1e3a5f" : "#fff", border: "2px solid #facc15", cursor: "pointer", whiteSpace: "nowrap" }}>
              ⚙️ {hasActiveFilter ? "●" : "Filter"}
            </button>
          </div>
          {showFilter && (
            <div style={{ marginTop: 12, backgroundColor: "#fff", borderRadius: 16, padding: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 6 }}>KONDISI</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {conditions.map((c) => (<button key={c} onClick={() => setActiveCondition(c)} style={{ textAlign: "left", padding: "7px 10px", borderRadius: 8, border: "1px solid", borderColor: activeCondition === c ? "#2563eb" : "#e2e8f0", backgroundColor: activeCondition === c ? "#eff6ff" : "#fff", color: activeCondition === c ? "#2563eb" : "#334155", fontSize: 12, cursor: "pointer", fontWeight: activeCondition === c ? 600 : 400 }}>{c}</button>))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 6 }}>JURUSAN</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {majors.map((m) => (<button key={m} onClick={() => setActiveMajor(m)} style={{ textAlign: "left", padding: "7px 10px", borderRadius: 8, border: "1px solid", borderColor: activeMajor === m ? "#2563eb" : "#e2e8f0", backgroundColor: activeMajor === m ? "#eff6ff" : "#fff", color: activeMajor === m ? "#2563eb" : "#334155", fontSize: 12, cursor: "pointer", fontWeight: activeMajor === m ? 600 : 400 }}>{m}</button>))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: "#475569", display: "block", marginBottom: 6 }}>RENTANG HARGA</label>
                <input value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min" type="number" style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 10px", fontSize: 12, marginBottom: 6, boxSizing: "border-box", outline: "none" }} />
                <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max" type="number" style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 10px", fontSize: 12, boxSizing: "border-box", outline: "none" }} />
                {hasActiveFilter && <button onClick={resetFilter} style={{ marginTop: 8, width: "100%", padding: "7px", borderRadius: 8, border: "1px solid #fecaca", backgroundColor: "#fff", color: "#ef4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Reset</button>}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px clamp(16px, 4vw, 24px)" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {categories.map((cat) => (<button key={cat} onClick={() => setActiveCategory(cat)} style={{ borderRadius: 999, padding: "7px 16px", fontSize: 13, fontWeight: 500, cursor: "pointer", border: "1px solid", borderColor: activeCategory === cat ? "#2563eb" : "#e2e8f0", backgroundColor: activeCategory === cat ? "#2563eb" : "#fff", color: activeCategory === cat ? "#fff" : "#334155", whiteSpace: "nowrap", flexShrink: 0 }}>{cat}</button>))}
        </div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "clamp(8px, 2vw, 16px)" }}>
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <p style={{ fontSize: 48, marginBottom: 12 }}>🔍</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>Tidak ditemukan</h3>
            <p style={{ color: "#64748b", marginBottom: 16 }}>Coba kata kunci lain atau reset filter</p>
            <button onClick={resetFilter} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Reset Filter</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                <strong style={{ color: "#1e293b" }}>{filtered.length}</strong> barang{search && <span> untuk "<strong>{search}</strong>"</span>}
              </p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 10px", fontSize: 12, color: "#334155", backgroundColor: "#fff", outline: "none" }}>
                <option>Terbaru</option>
                <option>Termurah</option>
                <option>Termahal</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "clamp(8px, 2vw, 16px)" }}>
              {filtered.map((item) => (
                <a href={"/listing/" + item.id} key={item.id} style={{ borderRadius: 16, backgroundColor: "#fff", border: "1px solid #e2e8f0", overflow: "hidden", textDecoration: "none", display: "block", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ height: "clamp(90px, 15vw, 140px)", backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(32px, 6vw, 48px)" }}>{item.icon}</div>
                  <div style={{ padding: "clamp(10px, 2vw, 14px)" }}>
                    <p style={{ fontSize: "clamp(11px, 1.5vw, 13px)", fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.3 }}>{item.title}</p>
                    <p style={{ fontSize: "clamp(13px, 2vw, 16px)", fontWeight: 700, color: "#ef4444", margin: "6px 0 8px" }}>{formatPrice(item.price)}</p>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                      <span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "2px 6px", fontSize: "clamp(9px, 1.2vw, 11px)", color: "#2563eb" }}>{item.major}</span>
                      <span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "2px 6px", fontSize: "clamp(9px, 1.2vw, 11px)", color: "#16a34a" }}>{item.condition}</span>
                    </div>
                    <div style={{ width: "100%", padding: "7px", backgroundColor: "#2563eb", color: "#fff", borderRadius: 8, fontSize: "clamp(10px, 1.5vw, 12px)", fontWeight: 600, textAlign: "center" }}>Lihat Detail</div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}