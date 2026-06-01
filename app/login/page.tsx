export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ textDecoration: "none" }}><span style={{ color: "#2563eb", fontWeight: 700, fontSize: 22 }}>TUKER</span><span style={{ color: "#ef4444", fontWeight: 700, fontSize: 22 }}>IN</span></a>
          <a href="/" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, textDecoration: "none", color: "#0f172a" }}>← Kembali ke Beranda</a>
        </div>
      </nav>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 57px)" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: 20, border: "1px solid #e2e8f0", padding: 40, width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}><span style={{ color: "#2563eb" }}>TUKER</span><span style={{ color: "#ef4444" }}>IN</span></div>
            <h1 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>Masuk ke Akun</h1>
            <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Gunakan email kampus ITB kamu</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Email ITB</label>
              <input type="email" placeholder="nama@mahasiswa.itb.ac.id" style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: "12px 16px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" placeholder="Masukkan password" style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: "12px 16px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            </div>
            <a href="/marketplace" style={{ display: "block", textAlign: "center", backgroundColor: "#2563eb", color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", marginTop: 8 }}>Masuk</a>
            <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", margin: 0 }}>Belum punya akun?{" "}<span style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>Daftar sekarang</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}