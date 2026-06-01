import Navbar from "../components/Navbar";

export default function MarketplacePage() {
  const listings = [
    { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", major: "STEI-R", condition: "Sangat Baik", bg: "#eff6ff" },
    { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", major: "STEI-R", condition: "Baik", bg: "#fffbeb" },
    { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", major: "SAPPK", condition: "Baik", bg: "#faf5ff" },
    { id: 4, icon: "🧪", title: "Lab Kit Kimia Lengkap", price: "Rp250.000", major: "FMIPA", condition: "Sangat Baik", bg: "#f0fdf4" },
    { id: 5, icon: "💻", title: "Laptop ThinkPad X270", price: "Rp4.500.000", major: "STEI", condition: "Baik", bg: "#f1f5f9" },
    { id: 6, icon: "📖", title: "Modul Fisika Dasar 1 & 2", price: "Rp50.000", major: "FTI", condition: "Bekas", bg: "#fff7ed" },
  ];
  const categories = ["Semua", "Buku", "Kalkulator", "Elektronik", "Alat Gambar", "Lab Kit", "Lainnya"];
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ backgroundColor: "#2563eb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 32, fontWeight: 700, margin: "0 0 16px" }}>Marketplace</h2>
          <div style={{ display: "flex", gap: 12 }}>
            <input placeholder="Cari barang, kategori, atau jurusan..." style={{ flex: 1, borderRadius: 12, padding: "14px 20px", fontSize: 14, border: "2px solid #facc15", outline: "none", backgroundColor: "#fff", color: "#1e293b" }} />
            <button style={{ flexShrink: 0, borderRadius: 12, padding: "14px 28px", fontSize: 14, fontWeight: 700, backgroundColor: "#facc15", color: "#1e3a5f", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>Cari Sekarang</button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {categories.map((cat, i) => (<button key={cat} style={{ borderRadius: 999, padding: "8px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", border: i === 0 ? "none" : "1px solid #e2e8f0", backgroundColor: i === 0 ? "#2563eb" : "#fff", color: i === 0 ? "#fff" : "#334155" }}>{cat}</button>))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Menampilkan <strong>6</strong> barang</p>
          <select style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#334155", backgroundColor: "#fff" }}>
            <option>Terbaru</option>
            <option>Termurah</option>
            <option>Termahal</option>
          </select>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {listings.map((item) => (<a href={"/listing/" + item.id} key={item.id} style={{ borderRadius: 16, backgroundColor: "#fff", border: "1px solid #e2e8f0", overflow: "hidden", textDecoration: "none", display: "block" }}><div style={{ height: 160, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>{item.icon}</div><div style={{ padding: 16 }}><p style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.4 }}>{item.title}</p><p style={{ fontSize: 18, fontWeight: 700, color: "#ef4444", margin: "8px 0 8px" }}>{item.price}</p><div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}><span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "3px 10px", fontSize: 12, color: "#2563eb" }}>{item.major}</span><span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "3px 10px", fontSize: 12, color: "#16a34a" }}>{item.condition}</span></div><div style={{ width: "100%", padding: "10px", backgroundColor: "#2563eb", color: "#fff", borderRadius: 10, fontSize: 13, fontWeight: 600, textAlign: "center" }}>Lihat Detail</div></div></a>))}
        </div>
      </div>
    </main>
  );
}