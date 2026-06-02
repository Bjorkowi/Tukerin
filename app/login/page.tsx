"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dummyUsers = [
    { email: "user1@mahasiswa.itb.ac.id", password: "demo123", name: "Demo User 1", major: "Teknik Elektro", nim: "181XXXXX" },
    { email: "user2@mahasiswa.itb.ac.id", password: "demo123", name: "Demo User 2", major: "Informatika", nim: "135XXXXX" },
  ];

  function handleLogin() {
    if (!email || !password) { setError("Email dan password wajib diisi!"); return; }
    setLoading(true);
    setTimeout(() => {
      const savedUsers = JSON.parse(localStorage.getItem("tukerin_users") || "[]");
      const allUsers = [...dummyUsers, ...savedUsers];
      const user = allUsers.find((u) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem("tukerin_session", JSON.stringify(user));
        window.location.href = "/marketplace";
      } else {
        setError("Email atau password salah.");
        setLoading(false);
      }
    }, 800);
  }

  return (
    <main style={{ minHeight: "100vh", display: "flex" }}>
      {/* Kiri — Branding */}
      <div style={{ flex: 1, background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }} className="login-left">
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ color: "#fff", fontWeight: 900, fontSize: 32 }}>TUKER</span>
          <span style={{ color: "#fde047", fontWeight: 900, fontSize: 32 }}>IN</span>
        </a>
        <div>
          <h2 style={{ color: "#fff", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, lineHeight: 1.2, margin: "0 0 16px" }}>
            Marketplace Barang Bekas<br />
            <span style={{ color: "#fde047" }}>Khusus Civitas ITB</span>
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: 16, lineHeight: 1.6, margin: "0 0 40px" }}>
            Jual, beli, dan tukar kebutuhan akademik dengan sesama mahasiswa ITB terverifikasi.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
            {[{ num: "12K+", label: "Listing Aktif" }, { num: "3.5K+", label: "Mahasiswa" }, { num: "2.1K+", label: "Terjual" }, { num: "4.9★", label: "Rating" }].map((s) => (
              <div key={s.label} style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px" }}>
                <p style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>{s.num}</p>
                <p style={{ fontSize: 13, color: "#93c5fd", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16, padding: 20 }}>
            <p style={{ color: "#fff", fontSize: 14, lineHeight: 1.6, margin: "0 0 12px", fontStyle: "italic" }}>
              "TUKERIN sangat membantu saya menemukan buku kuliah dengan harga terjangkau dari kakak tingkat!"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=mahasiswa&backgroundColor=b6e3f4" style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#e0f2fe" }} alt="user" />
              <div>
                <p style={{ color: "#fff", fontWeight: 600, fontSize: 13, margin: 0 }}>Mahasiswa ITB</p>
                <p style={{ color: "#93c5fd", fontSize: 12, margin: 0 }}>Teknik Elektro 2023</p>
              </div>
            </div>
          </div>
        </div>
        <p style={{ color: "#93c5fd", fontSize: 12, margin: 0 }}>© 2026 TUKERIN · Institut Teknologi Bandung</p>
      </div>

      {/* Kanan — Form */}
      <div style={{ width: "100%", maxWidth: 480, backgroundColor: "#fff", padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px", color: "#1e293b" }}>Selamat Datang! 👋</h1>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Masuk ke akun TUKERIN kamu</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Email ITB</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>📧</span>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} placeholder="nama@mahasiswa.itb.ac.id" style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "12px 14px 12px 42px", fontSize: 14, boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#2563eb"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔑</span>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Masukkan password" onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={{ width: "100%", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "12px 14px 12px 42px", fontSize: 14, boxSizing: "border-box", outline: "none" }} onFocus={(e) => e.target.style.borderColor = "#2563eb"} onBlur={(e) => e.target.style.borderColor = "#e2e8f0"} />
            </div>
          </div>

          {error && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚠️</span>
              <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>{error}</p>
            </div>
          )}

          <div style={{ backgroundColor: "#eff6ff", borderRadius: 12, padding: "12px 16px", border: "1px solid #bfdbfe" }}>
            <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 13, color: "#2563eb" }}>🎯 Demo credentials:</p>
            <p style={{ margin: 0, fontSize: 12, color: "#3b82f6" }}>📧 user1@mahasiswa.itb.ac.id · 🔑 demo123</p>
          </div>

          <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "opacity 0.2s", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
            {loading ? "Memverifikasi..." : "Masuk ke TUKERIN →"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, backgroundColor: "#e2e8f0" }} />
            <span style={{ fontSize: 13, color: "#94a3b8" }}>atau</span>
            <div style={{ flex: 1, height: 1, backgroundColor: "#e2e8f0" }} />
          </div>

          <a href="/register" style={{ display: "block", textAlign: "center", padding: "13px", border: "1.5px solid #e2e8f0", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "#334155", textDecoration: "none" }}>
            Daftar Akun Baru
          </a>

          <a href="/" style={{ display: "block", textAlign: "center", fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </main>
  );
}