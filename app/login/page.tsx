"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dummyUsers = [
    { email: "zaki@mahasiswa.itb.ac.id", password: "123456", name: "Zaki Annaufal", major: "Teknik Elektro", nim: "18125027" },
    { email: "fadhel@mahasiswa.itb.ac.id", password: "123456", name: "Fadhel Alkautsar", major: "Teknik Elektro", nim: "18125019" },
  ];

  function handleLogin() {
    const user = dummyUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("tukerin_session", JSON.stringify(user));
      window.location.href = "/marketplace";
    } else {
      setError("Email atau password salah. Gunakan email @mahasiswa.itb.ac.id");
    }
  }

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
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@mahasiswa.itb.ac.id" style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: "12px 16px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" onKeyDown={(e) => e.key === "Enter" && handleLogin()} style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 10, padding: "12px 16px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
            </div>

            {error && <p style={{ fontSize: 13, color: "#ef4444", margin: 0, backgroundColor: "#fef2f2", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}

            <div style={{ backgroundColor: "#eff6ff", borderRadius: 10, padding: "12px 16px", fontSize: 13, color: "#2563eb" }}>
              <p style={{ margin: "0 0 4px", fontWeight: 600 }}>Demo credentials:</p>
              <p style={{ margin: 0 }}>📧 zaki@mahasiswa.itb.ac.id</p>
              <p style={{ margin: 0 }}>🔑 123456</p>
            </div>

            <button onClick={handleLogin} style={{ display: "block", textAlign: "center", backgroundColor: "#2563eb", color: "#fff", padding: "13px", borderRadius: 10, fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer", marginTop: 8 }}>Masuk</button>

            <p style={{ textAlign: "center", fontSize: 13, color: "#64748b", margin: 0 }}>Belum punya akun?{" "}<span style={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>Daftar sekarang</span></p>
          </div>
        </div>
      </div>
    </main>
  );
}