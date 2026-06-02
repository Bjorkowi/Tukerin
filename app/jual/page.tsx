"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function JualPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [foto, setFoto] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", price: "", category: "Buku", condition: "Baik", major: "STEI-R", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = localStorage.getItem("tukerin_session");
    if (!session) { window.location.href = "/login"; return; }
    setUser(JSON.parse(session));
  }, []);

  function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSubmit() {
    if (!form.title || !form.price) { alert("Judul dan harga wajib diisi!"); return; }
    const existing = JSON.parse(localStorage.getItem("tukerin_listings") || "[]");
    const newItem = { id: Date.now(), ...form, foto, seller: user?.name, createdAt: new Date().toLocaleDateString("id-ID"), status: "Aktif" };
    localStorage.setItem("tukerin_listings", JSON.stringify([newItem, ...existing]));
    setSubmitted(true);
  }

  if (!user) return null;

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 8px" }}>Barang Berhasil Diupload!</h2>
          <p style={{ color: "#64748b", marginBottom: 32 }}>Listing kamu sudah aktif di marketplace.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href="/marketplace" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700 }}>Lihat Marketplace</a>
            <a href="/dashboard" style={{ backgroundColor: "#f1f5f9", color: "#475569", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 700 }}>Dashboard Saya</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ backgroundColor: "#2563eb", padding: "28px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 700, margin: 0 }}>Jual Barang</h2>
          <p style={{ color: "#bfdbfe", fontSize: 14, margin: "4px 0 0" }}>Upload barang bekasmu dan temukan pembeli dari civitas ITB</p>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Upload Foto */}
          <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px", color: "#475569" }}>Foto Barang</h3>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFoto} style={{ display: "none" }} />
            {foto ? (
              <div style={{ position: "relative" }}>
                <img src={foto} alt="preview" style={{ width: "100%", maxHeight: 300, objectFit: "cover", borderRadius: 12 }} />
                <button onClick={() => setFoto(null)} style={{ position: "absolute", top: 8, right: 8, backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16, fontWeight: 700 }}>✕</button>
                <button onClick={() => fileRef.current?.click()} style={{ position: "absolute", bottom: 8, right: 8, backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>Ganti Foto</button>
              </div>
            ) : (
              <button onClick={() => fileRef.current?.click()} style={{ width: "100%", height: 180, border: "2px dashed #cbd5e1", borderRadius: 12, backgroundColor: "#f8fafc", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <span style={{ fontSize: 40 }}>📷</span>
                <span style={{ fontSize: 14, color: "#64748b", fontWeight: 500 }}>Klik untuk upload foto</span>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>JPG, PNG, max 5MB</span>
              </button>
            )}
          </div>

          {/* Info Barang */}
          <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px", color: "#475569" }}>Informasi Barang</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Judul Barang *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Contoh: Kalkulator Casio FX-991EX" style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Harga (Rp) *</label>
                <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Contoh: 150000" type="number" style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Kategori</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", backgroundColor: "#fff" }}>
                    {["Buku", "Kalkulator", "Elektronik", "Alat Gambar", "Lab Kit", "Lainnya"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Kondisi</label>
                  <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", backgroundColor: "#fff" }}>
                    {["Sangat Baik", "Baik", "Bekas"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Jurusan</label>
                <select value={form.major} onChange={(e) => setForm({ ...form, major: e.target.value })} style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", backgroundColor: "#fff" }}>
                  {["STEI-R", "STEI", "SAPPK", "FMIPA", "FTI", "FITB", "FSRD", "SBM", "Lainnya"].map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Deskripsi</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Jelaskan kondisi barang, kelengkapan, alasan dijual, dll..." rows={4} style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
              </div>
            </div>
          </div>

          {/* Preview */}
          {form.title && (
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24 }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 16px", color: "#475569" }}>Preview Listing</h3>
              <div style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden", maxWidth: 220 }}>
                <div style={{ height: 120, backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {foto ? <img src={foto} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: 40 }}>📦</span>}
                </div>
                <div style={{ padding: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0 }}>{form.title}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#ef4444", margin: "6px 0 6px" }}>Rp{Number(form.price || 0).toLocaleString("id-ID")}</p>
                  <div style={{ display: "flex", gap: 4 }}>
                    <span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "2px 8px", fontSize: 11, color: "#2563eb" }}>{form.major}</span>
                    <span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "2px 8px", fontSize: 11, color: "#16a34a" }}>{form.condition}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button onClick={handleSubmit} style={{ width: "100%", padding: "16px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
            🚀 Upload Barang Sekarang
          </button>
        </div>
      </div>
    </main>
  );
}