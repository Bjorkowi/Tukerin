"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const allSellers = [
  { id: 1, name: "Zaki Annaufal", major: "Teknik Elektro", item: "Kalkulator Casio FX-991EX", itemPrice: "Rp150.000", messages: [{ from: "them", text: "Halo, kalkulator masih available?", time: "10:00" }, { from: "me", text: "Masih bro! Kondisi bagus banget.", time: "10:01" }, { from: "them", text: "Bisa nego ga? Rp130.000 gimana?", time: "10:05" }, { from: "me", text: "Rp140.000 deh, final ya hehe", time: "10:07" }, { from: "them", text: "Deal! Kapan bisa COD?", time: "10:20" }, { from: "me", text: "Oke siap, ketemu di Gerbang Barat ya!", time: "10:32" }], lastMessage: "Oke siap, ketemu di Gerbang Barat ya!", time: "10:32", unread: 0 },
  { id: 2, name: "Fadhel Alkautsar", major: "Teknik Elektro", item: "Buku Kalkulus Stewart", itemPrice: "Rp120.000", messages: [{ from: "them", text: "Halo kak, buku kalkulus masih ada?", time: "09:00" }, { from: "me", text: "Ada! Kondisi baik.", time: "09:05" }, { from: "them", text: "Buku masih ada highlight dikit ya?", time: "09:15" }], lastMessage: "Buku masih ada highlight dikit ya?", time: "09:15", unread: 2 },
  { id: 3, name: "Andi Pratama", major: "Arsitektur", item: "Drawing Pen Set", itemPrice: "Rp80.000", messages: [{ from: "them", text: "Drawing pen masih lengkap semua ukurannya?", time: "Kemarin" }, { from: "me", text: "Lengkap! 6 ukuran semua ada.", time: "Kemarin" }, { from: "them", text: "Oke nanti saya kabarin lagi ya", time: "Kemarin" }], lastMessage: "Oke nanti saya kabarin lagi ya", time: "Kemarin", unread: 0 },
  { id: 4, name: "Siti Rahayu", major: "Kimia", item: "Lab Kit Kimia Lengkap", itemPrice: "Rp250.000", messages: [], lastMessage: "", time: "", unread: 0 },
  { id: 5, name: "Budi Santoso", major: "Informatika", item: "Laptop ThinkPad X270", itemPrice: "Rp4.500.000", messages: [], lastMessage: "", time: "", unread: 0 },
  { id: 6, name: "Dewi Lestari", major: "Teknik Industri", item: "Modul Fisika Dasar 1 & 2", itemPrice: "Rp50.000", messages: [], lastMessage: "", time: "", unread: 0 },
];

export default function ChatPage() {
  const [activeId, setActiveId] = useState<number>(1);
  const [input, setInput] = useState("");
  const [chats, setChats] = useState(allSellers);
  const [isMobile, setIsMobile] = useState(false);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sellerName = params.get("seller");
    if (sellerName) {
      const found = allSellers.find((s) => s.name === decodeURIComponent(sellerName));
      if (found) { setActiveId(found.id); setShowChat(true); }
    }
  }, []);

  const active = chats.find((c) => c.id === activeId)!;

  function sendMessage() {
    if (!input.trim()) return;
    setChats((prev) => prev.map((c) => c.id === activeId ? { ...c, lastMessage: input, time: "Baru saja", messages: [...c.messages, { from: "me", text: input, time: "Baru saja" }] } : c));
    setInput("");
  }

  const sidebarJSX = (
    <div style={{ borderRight: isMobile ? "none" : "1px solid #e2e8f0", overflowY: "auto", height: "100%" }}>
      {chats.map((c) => (
        <button key={c.id} onClick={() => { setActiveId(c.id); if (isMobile) setShowChat(true); }} style={{ width: "100%", padding: 16, textAlign: "left", border: "none", borderBottom: "1px solid #f1f5f9", backgroundColor: activeId === c.id ? "#eff6ff" : "#fff", borderLeft: activeId === c.id ? "3px solid #2563eb" : "3px solid transparent", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>{c.name.charAt(0)}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontWeight: 600, fontSize: 14, margin: 0, color: "#1e293b" }}>{c.name}</p>
                <span style={{ fontSize: 11, color: "#94a3b8" }}>{c.time}</span>
              </div>
              <p style={{ fontSize: 12, color: "#2563eb", margin: "2px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.item}</p>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.lastMessage || "Mulai percakapan..."}</p>
            </div>
            {c.unread > 0 && <span style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#2563eb", color: "#fff", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.unread}</span>}
          </div>
        </button>
      ))}
    </div>
  );

  const chatAreaJSX = (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16, borderBottom: "1px solid #e2e8f0" }}>
        {isMobile && (
          <button onClick={() => setShowChat(false)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, padding: "0 8px 0 0", color: "#2563eb" }}>←</button>
        )}
        <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>{active?.name.charAt(0)}</div>
        <div>
          <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{active?.name}</p>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{active?.major} · ITB</p>
        </div>
        <div style={{ marginLeft: "auto", backgroundColor: "#eff6ff", borderRadius: 12, padding: "8px 16px", textAlign: "right" }}>
          <p style={{ fontSize: 11, color: "#64748b", margin: 0 }}>Barang</p>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#2563eb", margin: 0 }}>{active?.item}</p>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", margin: 0 }}>{active?.itemPrice}</p>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {active?.messages.length === 0 ? (
          <div style={{ textAlign: "center", margin: "auto", color: "#94a3b8" }}>
            <p style={{ fontSize: 32, marginBottom: 8 }}>💬</p>
            <p style={{ fontSize: 14 }}>Belum ada pesan. Mulai tanya ke penjual!</p>
          </div>
        ) : (
          active?.messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.from === "me" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: 280, borderRadius: msg.from === "me" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 14px", backgroundColor: msg.from === "me" ? "#2563eb" : "#f1f5f9" }}>
                <p style={{ fontSize: 14, color: msg.from === "me" ? "#fff" : "#1e293b", margin: 0 }}>{msg.text}</p>
                <p style={{ fontSize: 11, color: msg.from === "me" ? "#bfdbfe" : "#94a3b8", margin: "4px 0 0", textAlign: "right" }}>{msg.time}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ padding: 16, borderTop: "1px solid #e2e8f0", display: "flex", gap: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ketik pesan..."
          style={{ flex: 1, borderRadius: 12, border: "1px solid #e2e8f0", padding: "12px 16px", fontSize: 14, outline: "none" }}
        />
        <button onClick={sendMessage} style={{ borderRadius: 12, backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Kirim</button>
      </div>
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "16px" : "24px" }}>
        <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, margin: "0 0 16px" }}>Pesan</h1>
        {isMobile ? (
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0", backgroundColor: "#fff", height: "80vh" }}>
            {!showChat ? sidebarJSX : chatAreaJSX}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", height: "70vh", borderRadius: 20, overflow: "hidden", border: "1px solid #e2e8f0", backgroundColor: "#fff" }}>
            {sidebarJSX}
            {chatAreaJSX}
          </div>
        )}
      </div>
    </main>
  );
}