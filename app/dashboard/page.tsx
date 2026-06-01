import Navbar from "../components/Navbar";

export default function DashboardPage() {
  const activeListings = [
    { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", views: 24, chats: 3, bg: "#eff6ff" },
    { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", views: 11, chats: 1, bg: "#faf5ff" },
  ];
  const soldListings = [
    { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", buyer: "Fadhel A.", bg: "#fffbeb" },
  ];
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ backgroundColor: "#2563eb", padding: "32px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: "0 0 24px" }}>Dashboard Penjual</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[{ num: "2", label: "Barang Aktif", icon: "📦" }, { num: "1", label: "Terjual", icon: "✅" }, { num: "35", label: "Total Views", icon: "👁️" }, { num: "Rp120rb", label: "Total Pendapatan", icon: "💰" }].map((s) => (
              <div key={s.label} style={{ backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 16, padding: 20 }}>
                <p style={{ fontSize: 24, margin: "0 0 8px" }}>{s.icon}</p>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{s.num}</p>
                <p style={{ fontSize: 13, color: "#bfdbfe", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Barang Aktif</h3>
          <button style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Jual Barang Baru</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {activeListings.map((item) => (
            <div key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", margin: "0 0 4px" }}>{item.title}</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", margin: "0 0 6px" }}>{item.price}</p>
                <div style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 12, color: "#64748b" }}>👁 {item.views} views</span>
                  <span style={{ fontSize: 12, color: "#64748b" }}>💬 {item.chats} chat</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", background: "#fff" }}>Edit</button>
                <button style={{ border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", background: "#16a34a", color: "#fff" }}>Tandai Terjual</button>
              </div>
            </div>
          ))}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 16px" }}>Riwayat Terjual</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {soldListings.map((item) => (
            <div key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, display: "flex", alignItems: "center", gap: 16, opacity: 0.8 }}>
              <div style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", margin: "0 0 4px" }}>{item.title}</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", margin: "0 0 4px" }}>{item.price}</p>
                <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>Dibeli oleh {item.buyer}</p>
              </div>
              <span style={{ fontSize: 12, padding: "4px 12px", borderRadius: 999, backgroundColor: "#f1f5f9", color: "#64748b" }}>Terjual</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}