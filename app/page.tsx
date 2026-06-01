import Navbar from "./components/Navbar";

export default function Home() {
  const categories = [
    { icon: "📚", label: "Buku" },
    { icon: "🧮", label: "Kalkulator" },
    { icon: "💻", label: "Elektronik" },
    { icon: "📐", label: "Alat Gambar" },
    { icon: "🧪", label: "Lab Kit" },
    { icon: "🎓", label: "Lainnya" },
  ];
  const listings = [
    { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", major: "STEI-R", condition: "Sangat Baik", bg: "#eff6ff" },
    { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", major: "STEI-R", condition: "Baik", bg: "#fffbeb" },
    { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", major: "SAPPK", condition: "Baik", bg: "#faf5ff" },
    { id: 4, icon: "🧪", title: "Lab Kit Kimia Lengkap", price: "Rp250.000", major: "FMIPA", condition: "Sangat Baik", bg: "#f0fdf4" },
    { id: 5, icon: "💻", title: "Laptop ThinkPad X270", price: "Rp4.500.000", major: "STEI", condition: "Baik", bg: "#f1f5f9" },
    { id: 6, icon: "📖", title: "Modul Fisika Dasar 1 & 2", price: "Rp50.000", major: "FTI", condition: "Bekas", bg: "#fff7ed" },
  ];
  const stats = [
    { num: "12K+", label: "Listing Aktif" },
    { num: "3.5K+", label: "Mahasiswa" },
    { num: "2.1K+", label: "Terjual" },
    { num: "4.9★", label: "Rating Rata-rata" },
  ];
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <section style={{ backgroundColor: "#2563eb" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 24px" }}>
          <h2 style={{ fontSize: 48, fontWeight: 700, color: "#fff", lineHeight: 1.2, maxWidth: 600, marginBottom: 16 }}>Jual, Beli dan Tukar <span style={{ color: "#fde047" }}>Barang Bekas Akademik</span></h2>
          <p style={{ color: "#bfdbfe", fontSize: 18, maxWidth: 480, lineHeight: 1.6, marginBottom: 32 }}>Temukan buku, kalkulator, lab kit dari mahasiswa ITB terverifikasi.</p>
          <div style={{ display: "flex", gap: 12, maxWidth: 600, marginBottom: 40 }}>
            <input placeholder="Cari barang..." style={{ flex: 1, borderRadius: 12, padding: "14px 20px", fontSize: 14, border: "2px solid #facc15", outline: "none", backgroundColor: "#fff", color: "#1e293b" }} />
            <a href="/marketplace" style={{ flexShrink: 0, borderRadius: 12, padding: "14px 28px", fontSize: 14, fontWeight: 700, backgroundColor: "#facc15", color: "#1e3a5f", textDecoration: "none", whiteSpace: "nowrap" }}>Cari Sekarang</a>
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            {stats.map((s) => (<div key={s.label}><p style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>{s.num}</p><p style={{ fontSize: 13, color: "#bfdbfe", margin: 0 }}>{s.label}</p></div>))}
          </div>
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px" }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 20px" }}>Kategori</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12 }}>
          {categories.map((cat) => (<a href="/marketplace" key={cat.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, borderRadius: 16, backgroundColor: "#fff", border: "1px solid #e2e8f0", padding: "20px 8px", textDecoration: "none" }}><span style={{ fontSize: 28 }}>{cat.icon}</span><span style={{ fontSize: 13, fontWeight: 500, color: "#334155" }}>{cat.label}</span></a>))}
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 24px" }}>
        <div style={{ borderRadius: 16, background: "linear-gradient(to right, #ef4444, #2563eb)", padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div><p style={{ color: "#fff", fontWeight: 700, fontSize: 18, margin: 0 }}>COD aman di kampus ITB</p><p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, margin: "4px 0 0" }}>Semua penjual terverifikasi @itb.ac.id</p></div>
          <button style={{ flexShrink: 0, borderRadius: 12, backgroundColor: "#fff", padding: "12px 24px", fontSize: 14, fontWeight: 700, color: "#2563eb", border: "none", cursor: "pointer" }}>Mulai Jual</button>
        </div>
      </section>
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 56px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Listing Terbaru</h3>
          <a href="/marketplace" style={{ fontSize: 14, color: "#2563eb", textDecoration: "none" }}>Lihat semua</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 16 }}>
          {listings.map((item) => (<a href={"/listing/" + item.id} key={item.id} style={{ borderRadius: 16, backgroundColor: "#fff", border: "1px solid #e2e8f0", overflow: "hidden", textDecoration: "none", display: "block" }}><div style={{ height: 120, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>{item.icon}</div><div style={{ padding: 16 }}><p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0 }}>{item.title}</p><p style={{ fontSize: 15, fontWeight: 700, color: "#ef4444", margin: "8px 0 6px" }}>{item.price}</p><div style={{ display: "flex", gap: 4 }}><span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "2px 8px", fontSize: 11, color: "#2563eb" }}>{item.major}</span><span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "2px 8px", fontSize: 11, color: "#16a34a" }}>{item.condition}</span></div></div></a>))}
        </div>
      </section>
    </main>
  );
}