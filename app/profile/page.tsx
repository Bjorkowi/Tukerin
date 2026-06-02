"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<{ name: string; major: string; nim: string; email: string } | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const session = localStorage.getItem("tukerin_session");
    if (!session) { window.location.href = "/login"; return; }
    setUser(JSON.parse(session));
  }, []);

  function handleLogout() {
    localStorage.removeItem("tukerin_session");
    window.location.href = "/";
  }

  const myListings = [
    { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", condition: "Sangat Baik", status: "Aktif", bg: "#eff6ff" },
    { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", condition: "Baik", status: "Terjual", bg: "#fffbeb" },
    { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", condition: "Baik", status: "Aktif", bg: "#faf5ff" },
  ];

  if (!user) return null;

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ backgroundColor: "#2563eb", padding: isMobile ? "24px 16px" : "40px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: isMobile ? 16 : 24 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", backgroundColor: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#2563eb", flexShrink: 0 }}>{user.name.charAt(0)}</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{user.name}</h1>
              <p style={{ color: "#bfdbfe", fontSize: 13, margin: "0 0 2px" }}>{user.major} · ITB · {user.nim}</p>
              <p style={{ color: "#bfdbfe", fontSize: 13, margin: 0 }}>{user.email}</p>
            </div>
            <div style={{ display: "flex", gap: isMobile ? 24 : 32 }}>
              {[{ num: "3", label: "Listing Aktif" }, { num: "8", label: "Terjual" }, { num: "4.9★", label: "Rating" }].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{s.num}</p>
                  <p style={{ fontSize: 12, color: "#bfdbfe", margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "16px" : "32px 24px" }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: isMobile ? "100%" : 300, flexShrink: 0 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px", color: "#475569" }}>Informasi Akun</h2>
              {[{ label: "Nama", value: user.name }, { label: "NIM", value: user.nim }, { label: "Jurusan", value: user.major }, { label: "Email", value: user.email }].map((info) => (
                <div key={info.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f1f5f9", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "#64748b", flexShrink: 0 }}>{info.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1e293b", textAlign: "right", wordBreak: "break-all" }}>{info.value}</span>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px", color: "#475569" }}>Reputasi</h2>
              <div style={{ textAlign: "center", padding: "8px 0" }}>
                <p style={{ fontSize: 48, fontWeight: 700, color: "#2563eb", margin: 0 }}>4.9</p>
                <p style={{ fontSize: 20, color: "#facc15", margin: "4px 0" }}>★★★★★</p>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>dari 12 ulasan</p>
              </div>
            </div>
            <a href="/dashboard" style={{ display: "block", textAlign: "center", backgroundColor: "#2563eb", color: "#fff", padding: "13px", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📊 Dashboard Penjual</a>
            <button onClick={handleLogout} style={{ width: "100%", textAlign: "center", backgroundColor: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", padding: "13px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🚪 Keluar</button>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Listing Saya</h2>
              <a href="/jual" style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>+ Jual Barang</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {myListings.map((item) => (
                <div key={item.id} style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", margin: "0 0 4px" }}>{item.title}</p>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#ef4444", margin: "0 0 6px" }}>{item.price}</p>
                    <span style={{ fontSize: 12, padding: "3px 10px", borderRadius: 999, backgroundColor: item.status === "Aktif" ? "#f0fdf4" : "#f1f5f9", color: item.status === "Aktif" ? "#16a34a" : "#64748b" }}>{item.status}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 6, flexShrink: 0 }}>
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