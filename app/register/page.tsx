"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", nim: "", major: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const majors = ["Teknik Elektro", "Informatika", "Teknik Mesin", "Arsitektur", "Kimia", "Fisika", "Matematika", "Teknik Industri", "Teknik Sipil", "Teknik Kimia", "Biologi", "Farmasi", "Manajemen", "Lainnya"];

  function isValidEmail(email: string) {
    return email.endsWith("@mahasiswa.itb.ac.id") || email.endsWith("@itb.ac.id");
  }

  function getFieldStatus(field: string) {
    if (!touched[field]) return "default";
    switch (field) {
      case "name": return form.name.length >= 3 ? "valid" : "invalid";
      case "email": return isValidEmail(form.email) ? "valid" : "invalid";
      case "nim": return form.nim.length >= 8 ? "valid" : "invalid";
      case "major": return form.major ? "valid" : "invalid";
      case "password": return form.password.length >= 6 ? "valid" : "invalid";
      case "confirm": return form.confirm === form.password && form.confirm.length > 0 ? "valid" : "invalid";
      default: return "default";
    }
  }

  function getBorderColor(field: string) {
    const status = getFieldStatus(field);
    if (status === "valid") return "#16a34a";
    if (status === "invalid") return "#ef4444";
    return "#e2e8f0";
  }

  function handleRegister() {
    setTouched({ name: true, email: true, nim: true, major: true, password: true, confirm: true });
    if (!form.name || !form.email || !form.nim || !form.major || !form.password || !form.confirm) { setError("Semua field wajib diisi!"); return; }
    if (!isValidEmail(form.email)) { setError("Email harus @mahasiswa.itb.ac.id atau @itb.ac.id"); return; }
    if (form.nim.length < 8) { setError("NIM harus minimal 8 karakter"); return; }
    if (form.password.length < 6) { setError("Password minimal 6 karakter"); return; }
    if (form.password !== form.confirm) { setError("Password tidak cocok"); return; }
    setLoading(true);
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("tukerin_users") || "[]");
      if (existing.find((u: { email: string }) => u.email === form.email)) { setError("Email sudah terdaftar"); setLoading(false); return; }
      const newUser = { name: form.name, email: form.email, nim: form.nim, major: form.major, password: form.password };
      localStorage.setItem("tukerin_users", JSON.stringify([...existing, newUser]));
      localStorage.setItem("tukerin_session", JSON.stringify(newUser));
      setSuccess(true);
    }, 1000);
  }

  if (success) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "40px 24px", maxWidth: 400 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, margin: "0 auto 20px" }}>🎉</div>
          <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px", color: "#1e293b" }}>Akun Berhasil Dibuat!</h2>
          <p style={{ color: "#64748b", marginBottom: 8, fontSize: 15 }}>Selamat datang di TUKERIN, <strong>{form.name.split(" ")[0]}</strong>!</p>
          <p style={{ color: "#94a3b8", marginBottom: 32, fontSize: 13 }}>Kamu sudah otomatis masuk ke akun baru kamu.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/marketplace" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Mulai Belanja →</a>
            <a href="/profile" style={{ backgroundColor: "#f1f5f9", color: "#475569", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700, fontSize: 14 }}>Lihat Profil</a>
          </div>
        </div>
      </main>
    );
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
            Bergabung dengan<br />
            <span style={{ color: "#fde047" }}>Komunitas ITB</span>
          </h2>
          <p style={{ color: "#bfdbfe", fontSize: 16, lineHeight: 1.6, margin: "0 0 32px" }}>
            Daftar sekarang dan mulai jual beli barang bekas akademik dengan sesama civitas ITB.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {["✓ Verifikasi email kampus ITB", "✓ COD aman di lingkungan kampus", "✓ Rating & ulasan terpercaya", "✓ Gratis selamanya"].map((item) => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "#4ade80", fontWeight: 700, fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ color: "#93c5fd", fontSize: 12, margin: 0 }}>© 2026 TUKERIN · Institut Teknologi Bandung</p>
      </div>

      {/* Kanan — Form */}
      <div style={{ width: "100%", maxWidth: 520, backgroundColor: "#fff", padding: "clamp(32px, 5vw, 56px) clamp(24px, 4vw, 48px)", display: "flex", flexDirection: "column", justifyContent: "center", overflowY: "auto" }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 8px", color: "#1e293b" }}>Buat Akun Baru 🚀</h1>
          <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Khusus civitas akademika ITB</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Nama Lengkap *</label>
            <input value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setError(""); }} onBlur={() => setTouched({ ...touched, name: true })} placeholder="Nama lengkap kamu" style={{ width: "100%", border: "1.5px solid " + getBorderColor("name"), borderRadius: 12, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", transition: "border-color 0.2s" }} />
            {touched.name && form.name.length > 0 && form.name.length < 3 && <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0" }}>Nama minimal 3 karakter</p>}
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Email ITB *</label>
            <input value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(""); }} onBlur={() => setTouched({ ...touched, email: true })} placeholder="nama@mahasiswa.itb.ac.id" type="email" style={{ width: "100%", border: "1.5px solid " + getBorderColor("email"), borderRadius: 12, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            {touched.email && form.email.length > 0 && !isValidEmail(form.email) && <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0" }}>Harus @mahasiswa.itb.ac.id atau @itb.ac.id</p>}
            {touched.email && isValidEmail(form.email) && <p style={{ fontSize: 11, color: "#16a34a", margin: "4px 0 0" }}>✓ Email valid</p>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>NIM *</label>
              <input value={form.nim} onChange={(e) => { setForm({ ...form, nim: e.target.value }); setError(""); }} onBlur={() => setTouched({ ...touched, nim: true })} placeholder="Nomor Induk" style={{ width: "100%", border: "1.5px solid " + getBorderColor("nim"), borderRadius: 12, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Jurusan *</label>
              <select value={form.major} onChange={(e) => { setForm({ ...form, major: e.target.value }); setTouched({ ...touched, major: true }); setError(""); }} style={{ width: "100%", border: "1.5px solid " + getBorderColor("major"), borderRadius: 12, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", backgroundColor: "#fff" }}>
                <option value="">Pilih jurusan</option>
                {majors.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Password *</label>
            <input value={form.password} onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(""); }} onBlur={() => setTouched({ ...touched, password: true })} placeholder="Minimal 6 karakter" type="password" style={{ width: "100%", border: "1.5px solid " + getBorderColor("password"), borderRadius: 12, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            {touched.password && form.password.length > 0 && form.password.length < 6 && <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0" }}>Password minimal 6 karakter</p>}
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Konfirmasi Password *</label>
            <input value={form.confirm} onChange={(e) => { setForm({ ...form, confirm: e.target.value }); setError(""); }} onBlur={() => setTouched({ ...touched, confirm: true })} placeholder="Ulangi password" type="password" onKeyDown={(e) => e.key === "Enter" && handleRegister()} style={{ width: "100%", border: "1.5px solid " + getBorderColor("confirm"), borderRadius: 12, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            {touched.confirm && form.confirm.length > 0 && form.confirm !== form.password && <p style={{ fontSize: 11, color: "#ef4444", margin: "4px 0 0" }}>Password tidak cocok</p>}
            {touched.confirm && form.confirm === form.password && form.confirm.length > 0 && <p style={{ fontSize: 11, color: "#16a34a", margin: "4px 0 0" }}>✓ Password cocok</p>}
          </div>

          {error && (
            <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px" }}>
              <p style={{ fontSize: 13, color: "#ef4444", margin: 0 }}>⚠️ {error}</p>
            </div>
          )}

          <button onClick={handleRegister} disabled={loading} style={{ width: "100%", padding: "14px", background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
            {loading ? "Membuat akun..." : "Daftar Sekarang →"}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", margin: 0 }}>
            Sudah punya akun?{" "}
            <a href="/login" style={{ color: "#2563eb", fontWeight: 600, textDecoration: "none" }}>Masuk di sini</a>
          </p>

          <a href="/" style={{ display: "block", textAlign: "center", fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
            ← Kembali ke Beranda
          </a>
        </div>
      </div>
    </main>
  );
}