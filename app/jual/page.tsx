"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Cropper from "react-easy-crop";

function getCroppedImg(imageSrc: string, croppedAreaPixels: { x: number; y: number; width: number; height: number }): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject("no context"); return; }
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      ctx.drawImage(image, croppedAreaPixels.x, croppedAreaPixels.y, croppedAreaPixels.width, croppedAreaPixels.height, 0, 0, croppedAreaPixels.width, croppedAreaPixels.height);
      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    image.onerror = reject;
    image.src = imageSrc;
  });
}

export default function JualPage() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [rawFoto, setRawFoto] = useState<string | null>(null);
  const [foto, setFoto] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [form, setForm] = useState({ title: "", price: "", category: "Buku", condition: "Baik", major: "STEI-R", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
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
    reader.onload = () => {
      setRawFoto(reader.result as string);
      setFoto(null);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  }

  const onCropComplete = useCallback((_: unknown, croppedPixels: { x: number; y: number; width: number; height: number }) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function handleCropDone() {
    if (!rawFoto || !croppedAreaPixels) return;
    try {
      const cropped = await getCroppedImg(rawFoto, croppedAreaPixels);
      setFoto(cropped);
      setShowCropper(false);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    } catch (err) {
      console.error("Crop error:", err);
    }
  }

  function getBorder(field: string) {
    if (!touched[field]) return "1px solid #e2e8f0";
    const val = form[field as keyof typeof form];
    return val.length > 0 ? "1.5px solid #16a34a" : "1.5px solid #ef4444";
  }

  function handleSubmit() {
    setTouched({ title: true, price: true, description: true });
    if (!form.title || !form.price) return;
    setLoading(true);
    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem("tukerin_listings") || "[]");
      const newItem = { id: Date.now(), ...form, foto, seller: user?.name, createdAt: new Date().toLocaleDateString("id-ID"), status: "Aktif" };
      localStorage.setItem("tukerin_listings", JSON.stringify([newItem, ...existing]));
      setSubmitted(true);
    }, 1000);
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

  const categoryIcon: Record<string, string> = {
    "Kalkulator": "🧮", "Buku": "📚", "Alat Gambar": "📐", "Lab Kit": "🧪", "Elektronik": "💻", "Lainnya": "📦"
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />

      {showCropper && rawFoto && (
        <div style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.9)", zIndex: 1000, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 24px", backgroundColor: "#1e293b", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 16, margin: 0 }}>✂️ Crop Foto</p>
            <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>Geser dan zoom untuk menyesuaikan area crop</p>
          </div>
          <div style={{ flex: 1, position: "relative" }}>
            <Cropper image={rawFoto} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
          </div>
          <div style={{ backgroundColor: "#1e293b", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ color: "#94a3b8", fontSize: 12, margin: "0 0 6px" }}>Zoom: {zoom.toFixed(1)}x</p>
              <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={{ width: "100%", accentColor: "#2563eb" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setShowCropper(false)} style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #475569", background: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: 14 }}>Batal</button>
              <button onClick={handleCropDone} style={{ padding: "10px 28px", borderRadius: 10, border: "none", backgroundColor: "#2563eb", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 700, boxShadow: "0 4px 12px rgba(37,99,235,0.4)" }}>✓ Gunakan Foto Ini</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: "#2563eb", padding: "24px clamp(16px, 4vw, 24px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 800, margin: "0 0 4px" }}>Jual Barang</h2>
          <p style={{ color: "#bfdbfe", fontSize: 14, margin: 0 }}>Upload barang bekasmu dan temukan pembeli dari civitas ITB</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(16px, 3vw, 32px) clamp(16px, 4vw, 24px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr clamp(220px, 28%, 280px)", gap: 24, alignItems: "start" }}>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 14px", color: "#1e293b" }}>📷 Foto Barang</h3>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFoto} style={{ display: "none" }} />
              {foto ? (
                <div style={{ position: "relative" }}>
                  <img src={foto} alt="preview" style={{ width: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 12 }} />
                  <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6 }}>
                    <button onClick={() => { if (rawFoto) { setShowCropper(true); } }} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>✂️ Crop Ulang</button>
                    <button onClick={() => { setFoto(null); setRawFoto(null); if (fileRef.current) fileRef.current.value = ""; }} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12 }}>✕ Hapus</button>
                  </div>
                  <div style={{ marginTop: 8, backgroundColor: "#f0fdf4", borderRadius: 8, padding: "8px 12px" }}>
                    <p style={{ fontSize: 12, color: "#16a34a", margin: 0 }}>✓ Foto berhasil di-crop dan siap diupload</p>
                  </div>
                </div>
              ) : (
                <button onClick={() => fileRef.current?.click()} style={{ width: "100%", height: 180, border: "2px dashed #cbd5e1", borderRadius: 12, backgroundColor: "#f8fafc", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <span style={{ fontSize: 40 }}>📷</span>
                  <span style={{ fontSize: 14, color: "#64748b", fontWeight: 600 }}>Klik untuk upload foto</span>
                  <span style={{ fontSize: 12, color: "#94a3b8" }}>JPG, PNG · Bisa di-crop setelah upload</span>
                </button>
              )}
            </div>

            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 16px", color: "#1e293b" }}>📝 Informasi Barang</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Judul Barang *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} onBlur={() => setTouched({ ...touched, title: true })} placeholder="Contoh: Kalkulator Casio FX-991EX" style={{ width: "100%", border: getBorder("title"), borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#334155", display: "block", marginBottom: 6 }}>Harga (Rp) *</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#64748b", fontWeight: 600 }}>Rp</span>
                    <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} onBlur={() => setTouched({ ...touched, price: true })} placeholder="150000" type="number" style={{ width: "100%", border: getBorder("price"), borderRadius: 10, padding: "11px 14px 11px 36px", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
                  </div>
                  {form.price && <p style={{ fontSize: 12, color: "#2563eb", margin: "4px 0 0" }}>= Rp{Number(form.price).toLocaleString("id-ID")}</p>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Jelaskan kondisi barang, kelengkapan, alasan dijual..." rows={4} style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 10, padding: "11px 14px", fontSize: 14, boxSizing: "border-box", outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{ width: "100%", padding: "16px", background: loading ? "#93c5fd" : "linear-gradient(135deg, #2563eb, #1d4ed8)", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 4px 16px rgba(37,99,235,0.3)" }}>
              {loading ? "Mengupload..." : "🚀 Upload Barang Sekarang"}
            </button>
          </div>

          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#475569", margin: "0 0 12px", textAlign: "center" }}>👁️ Preview Listing</p>
              <div style={{ borderRadius: 12, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                <div style={{ height: 140, backgroundColor: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                  {foto ? (
                    <img src={foto} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="preview" />
                  ) : (
                    <span style={{ fontSize: 48 }}>{categoryIcon[form.category] || "📦"}</span>
                  )}
                </div>
                <div style={{ padding: 12 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", margin: 0, lineHeight: 1.3 }}>{form.title || "Judul barang..."}</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#ef4444", margin: "6px 0 8px" }}>
                    {form.price ? "Rp" + Number(form.price).toLocaleString("id-ID") : "Rp0"}
                  </p>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                    <span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "2px 8px", fontSize: 11, color: "#2563eb" }}>{form.major}</span>
                    <span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "2px 8px", fontSize: 11, color: "#16a34a" }}>{form.condition}</span>
                  </div>
                  <div style={{ width: "100%", padding: "8px", backgroundColor: "#2563eb", color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 600, textAlign: "center" }}>Lihat Detail</div>
                </div>
              </div>
              <p style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", margin: "10px 0 0" }}>Begini tampilanmu di marketplace</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}