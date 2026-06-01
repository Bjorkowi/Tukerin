import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const myListings = [
    { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", condition: "Sangat Baik", status: "Aktif", bg: "#eff6ff" },
    { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", condition: "Baik", status: "Terjual", bg: "#fffbeb" },
    { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", condition: "Baik", status: "Aktif", bg: "#faf5ff" },
  ];
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ backgroundColor: "#2563eb", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "#2563eb", flexShrink: 0 }}>Z</div>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>Zaki Annaufal</h1>
            <p style={{ color: "#bfdbfe", fontSize: 14, margin: "0 0 4px" }}>Teknik Elektro · ITB · 18125027</p>
            <p style={{ color: "#bfdbfe", fontSize: 13, margin: 0 }}>zaki@mahasiswa.itb.ac.id</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 32 }}>
            {[{ num: "3", label: "Listing Aktif" }, { num: "8", label: "Terjual" }, { num: "4.9★", label: "Rating" }].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#fff", margin: 0 }}>{s.num}</p>
                <p style={{ fontSize: 12, color: "#bfdbfe", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px", color: "#475569" }}>Informasi Akun</h2>
              {[{ label: "Nama", value: "Zaki Annaufal" }, { label: "NIM", value: "18125027" }, { label: "Jurusan", value: "Teknik Elektro" }, { label: "Fakultas", value: "STEI" }, { label: "Email", value: "zaki@mahasiswa.itb.ac.id" }].map((info) => (
                <div key={info.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: 13, color: "#64748b" }}>{info.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1e293b" }}>{info.value}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px", color: "#475569" }}>Reputasi</h2>
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <p style={{ fontSize: 48, fontWeight: 700, color: "#2563eb", margin: 0 }}>4.9</p>
                <p style={{ fontSize: 20, color: "#facc15", margin: "4px 0" }}>★★★★★</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>dari 12 ulasan</p>
              </div>
            </div>
            <a href="/dashboard" style={{ display: "block", textAlign: "center", backgroundColor: "#2563eb", color: "#fff", padding: "13px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>Dashboard Penjual</a>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Listing Saya</h2>
              <button style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>+ Jual Barang</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {myListings.map((item) => (
                <div key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#1e293b", margin: "0 0 4px" }}>{item.title}</p>
                    <p style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", margin: "0 0 6px" }}>{item.price}</p>
                    <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 999, backgroundColor: item.status === "Aktif" ? "#f0fdf4" : "#f1f5f9", color: item.status === "Aktif" ? "#16a34a" : "#64748b" }}>{item.status}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", background: "#fff" }}>Edit</button>
                    <button style={{ border: "1px solid #fecaca", borderRadius: 8, padding: "6px 14px", fontSize: 13, cursor: "pointer", background: "#fff", color: "#ef4444" }}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}