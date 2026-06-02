"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const session = localStorage.getItem("tukerin_session");
    if (session) {
      const data = JSON.parse(session);
      setIsLoggedIn(true);
      setUserName(data.name);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("tukerin_session");
    setIsLoggedIn(false);
    setUserName("");
    setShowDropdown(false);
    setShowMenu(false);
    window.location.href = "/";
  }

  return (
    <>
      <nav style={{ backgroundColor: "#fff", borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, whiteSpace: "nowrap", margin: 0 }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <span style={{ color: "#2563eb" }}>TUKER</span>
              <span style={{ color: "#ef4444" }}>IN</span>
            </a>
          </h1>

          {!isMobile && (
            <div style={{ flex: 1, maxWidth: 500 }}>
              <input placeholder="Cari barang bekas..." style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, backgroundColor: "#ffffff", boxSizing: "border-box" }} />
            </div>
          )}

          {isMobile ? (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              {isLoggedIn && (
                <div style={{ width: 32, height: 32, borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>
                  {userName.charAt(0)}
                </div>
              )}
              <button onClick={() => setShowMenu(!showMenu)} style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: "6px 10px", background: "#fff", cursor: "pointer", fontSize: 18 }}>
                {showMenu ? "✕" : "☰"}
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, marginLeft: "auto", alignItems: "center" }}>
              <a href="/jual" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Jual Barang</a>
              <a href="/marketplace" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Marketplace</a>
              {isLoggedIn ? (
                <>
                  <a href="/chat" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Chat</a>
                  <a href="/dashboard" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Dashboard</a>
                  <div style={{ position: "relative" }}>
                    <button onClick={() => setShowDropdown(!showDropdown)} style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #cbd5e1", borderRadius: 8, padding: "6px 12px", fontSize: 14, background: "transparent", cursor: "pointer" }}>
                      <div style={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{userName.charAt(0)}</div>
                      <span>{userName.split(" ")[0]}</span>
                      <span style={{ fontSize: 10 }}>▾</span>
                    </button>
                    {showDropdown && (
                      <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 8, minWidth: 160, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100 }}>
                        <a href="/profile" onClick={() => setShowDropdown(false)} style={{ display: "block", padding: "10px 14px", fontSize: 14, color: "#1e293b", textDecoration: "none", borderRadius: 8 }}>👤 Profil Saya</a>
                        <a href="/dashboard" onClick={() => setShowDropdown(false)} style={{ display: "block", padding: "10px 14px", fontSize: 14, color: "#1e293b", textDecoration: "none", borderRadius: 8 }}>📊 Dashboard</a>
                        <a href="/chat" onClick={() => setShowDropdown(false)} style={{ display: "block", padding: "10px 14px", fontSize: 14, color: "#1e293b", textDecoration: "none", borderRadius: 8 }}>💬 Chat</a>
                        <div style={{ borderTop: "1px solid #f1f5f9", margin: "4px 0" }} />
                        <button onClick={handleLogout} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", fontSize: 14, color: "#ef4444", background: "none", border: "none", cursor: "pointer", borderRadius: 8 }}>🚪 Keluar</button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <a href="/login" style={{ border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "transparent", textDecoration: "none", color: "#0f172a" }}>Masuk</a>
                  <a href="/login" style={{ borderRadius: 8, padding: "8px 16px", fontSize: 14, background: "#2563eb", color: "#fff", textDecoration: "none", border: "none" }}>Daftar</a>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile search bar */}
        {isMobile && (
          <div style={{ padding: "0 20px 12px" }}>
            <input placeholder="Cari barang bekas..." style={{ width: "100%", border: "1px solid #cbd5e1", borderRadius: 8, padding: "8px 16px", fontSize: 14, backgroundColor: "#f8fafc", boxSizing: "border-box" }} />
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && showMenu && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", zIndex: 100 }} onClick={() => setShowMenu(false)}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 280, height: "100%", backgroundColor: "#fff", padding: 24, display: "flex", flexDirection: "column", gap: 8 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 18, fontWeight: 700 }}><span style={{ color: "#2563eb" }}>TUKER</span><span style={{ color: "#ef4444" }}>IN</span></span>
              <button onClick={() => setShowMenu(false)} style={{ border: "none", background: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
            </div>

            {isLoggedIn && (
              <div style={{ backgroundColor: "#eff6ff", borderRadius: 12, padding: "12px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16 }}>{userName.charAt(0)}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 14, margin: 0, color: "#1e293b" }}>{userName}</p>
                  <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>Mahasiswa ITB</p>
                </div>
              </div>
            )}

            {[
              { href: "/", label: "🏠 Beranda" },
              { href: "/marketplace", label: "🛍️ Marketplace" },
              { href: "/jual", label: "📦 Jual Barang" },
              ...(isLoggedIn ? [
                { href: "/chat", label: "💬 Chat" },
                { href: "/dashboard", label: "📊 Dashboard" },
                { href: "/profile", label: "👤 Profil Saya" },
              ] : []),
            ].map((item) => (
              <a key={item.href} href={item.href} onClick={() => setShowMenu(false)} style={{ display: "block", padding: "12px 16px", fontSize: 15, color: "#1e293b", textDecoration: "none", borderRadius: 10, backgroundColor: "#f8fafc" }}>
                {item.label}
              </a>
            ))}

            <div style={{ marginTop: "auto" }}>
              {isLoggedIn ? (
                <button onClick={handleLogout} style={{ width: "100%", padding: "12px", backgroundColor: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>🚪 Keluar</button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href="/login" style={{ display: "block", textAlign: "center", padding: "12px", border: "1px solid #cbd5e1", borderRadius: 10, fontSize: 15, color: "#1e293b", textDecoration: "none" }}>Masuk</a>
                  <a href="/login" style={{ display: "block", textAlign: "center", padding: "12px", backgroundColor: "#2563eb", borderRadius: 10, fontSize: 15, color: "#fff", textDecoration: "none", fontWeight: 700 }}>Daftar</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}