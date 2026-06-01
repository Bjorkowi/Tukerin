export default function Navbar() {
  return (
    <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, whiteSpace: "nowrap", margin: 0 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{ color: "#2563eb" }}>TUKER</span>
            <span style={{ color: "#ef4444" }}>IN</span>
          </a>
        </h1>
        <div style={{ flex: 1, maxWidth: 500 }}>
          <input placeholder="Cari barang bekas..." style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, backgroundColor: "#ffffff", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 8, marginLeft: "auto" }}>
          <a href="/marketplace" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Marketplace</a>
          <a href="/chat" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Chat</a>
          <a href="/dashboard" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Dashboard</a>
          <a href="/profile" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", backgroundColor: "#2563eb", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>Z</span>
            Profil
          </a>
        </div>
      </div>
    </nav>
  );
}