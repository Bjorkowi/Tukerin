"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      const session = localStorage.getItem("tukerin_session");
      setIsLoggedIn(!!session);
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    window.addEventListener("focus", checkLogin);
    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("focus", checkLogin);
    };
  }, []);

  if (!isMobile) return null;

  const navItems = [
    { href: "/", icon: "🏠", label: "Beranda" },
    { href: "/marketplace", icon: "🛍️", label: "Market" },
    { href: "/jual", icon: "+", label: "Jual", special: true },
    { href: "/chat", icon: "💬", label: "Chat" },
    { href: isLoggedIn ? "/profile" : "/login", icon: "👤", label: isLoggedIn ? "Profil" : "Masuk" },
  ];

  return (
    <>
      <div style={{ height: 72 }} />
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTop: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "8px 0 16px", zIndex: 200, boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          if (item.special) {
            return (
              <a key={item.href} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, textDecoration: "none", position: "relative", top: -20 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#fff", boxShadow: "0 4px 16px rgba(37,99,235,0.5)" }}>+</div>
                <span style={{ fontSize: 11, color: "#2563eb", fontWeight: 700 }}>{item.label}</span>
              </a>
            );
          }
          return (
            <a key={item.href} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, textDecoration: "none", minWidth: 60, paddingTop: 4 }}>
              <span style={{ fontSize: 24, lineHeight: 1, opacity: isActive ? 1 : 0.5 }}>{item.icon}</span>
              <span style={{ fontSize: 11, color: isActive ? "#2563eb" : "#94a3b8", fontWeight: isActive ? 700 : 400, whiteSpace: "nowrap" }}>{item.label}</span>
              {isActive && <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: "#2563eb" }} />}
            </a>
          );
        })}
      </nav>
    </>
  );
}