import Navbar from "../../components/Navbar";

const listings = [
  { id: 1, icon: "🧮", title: "Kalkulator Casio FX-991EX", price: "Rp150.000", major: "STEI-R", condition: "Sangat Baik", category: "Kalkulator", bg: "#eff6ff", description: "Kalkulator scientific Casio FX-991EX kondisi sangat baik. Semua tombol berfungsi normal, layar jernih tanpa goresan. Cocok untuk Kalkulus, Fisika, dan Statistika. Dilengkapi cover pelindung original.", seller: { name: "Zaki Annaufal", major: "Teknik Elektro", rating: 4.9, totalSales: 12 } },
  { id: 2, icon: "📚", title: "Buku Kalkulus Stewart Ed.8", price: "Rp120.000", major: "STEI-R", condition: "Baik", category: "Buku", bg: "#fffbeb", description: "Buku Kalkulus James Stewart edisi 8. Kondisi baik, ada beberapa highlight pensil di bagian awal. Sangat membantu untuk TPB.", seller: { name: "Fadhel Alkautsar", major: "Teknik Elektro", rating: 4.7, totalSales: 8 } },
  { id: 3, icon: "📐", title: "Drawing Pen Set 6 Ukuran", price: "Rp80.000", major: "SAPPK", condition: "Baik", category: "Alat Gambar", bg: "#faf5ff", description: "Set drawing pen lengkap isi 6 ukuran (0.1–0.8). Tinta masih penuh semua. Cocok untuk studio arsitektur dan gambar teknik.", seller: { name: "Andi Pratama", major: "Arsitektur", rating: 4.8, totalSales: 5 } },
  { id: 4, icon: "🧪", title: "Lab Kit Kimia Lengkap", price: "Rp250.000", major: "FMIPA", condition: "Sangat Baik", category: "Lab Kit", bg: "#f0fdf4", description: "Lab kit kimia lengkap: beaker glass, erlenmeyer, pipet, spatula, dll. Dipakai satu semester, kondisi sangat baik dan steril.", seller: { name: "Siti Rahayu", major: "Kimia", rating: 5.0, totalSales: 3 } },
  { id: 5, icon: "💻", title: "Laptop ThinkPad X270", price: "Rp4.500.000", major: "STEI", condition: "Baik", category: "Elektronik", bg: "#f1f5f9", description: "ThinkPad X270, Core i5 gen 7, RAM 8GB, SSD 256GB. Baterai tahan 4 jam. Sudah install Windows 11 dan tools programming.", seller: { name: "Budi Santoso", major: "Informatika", rating: 4.6, totalSales: 20 } },
  { id: 6, icon: "📖", title: "Modul Fisika Dasar 1 & 2", price: "Rp50.000", major: "FTI", condition: "Bekas", category: "Buku", bg: "#fff7ed", description: "Modul Fisika Dasar 1 dan 2 lengkap. Termasuk kumpulan soal UTS dan UAS tahun lalu. Sangat berguna untuk persiapan ujian.", seller: { name: "Dewi Lestari", major: "Teknik Industri", rating: 4.5, totalSales: 15 } },
];

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = listings.find((l) => l.id === Number(id));

  if (!item) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "120px 24px" }}>
          <div style={{ fontSize: 64 }}>🔍</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "16px 0 8px" }}>Barang tidak ditemukan</h2>
          <p style={{ color: "#64748b", marginBottom: 24 }}>Listing ini mungkin sudah dihapus atau terjual.</p>
          <a href="/marketplace" style={{ backgroundColor: "#2563eb", color: "#fff", padding: "12px 24px", borderRadius: 12, textDecoration: "none", fontWeight: 600 }}>Kembali ke Marketplace</a>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
      <Navbar />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 24px" }}>
        <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 20px" }}>
          <a href="/" style={{ color: "#64748b", textDecoration: "none" }}>Beranda</a>{" › "}
          <a href="/marketplace" style={{ color: "#64748b", textDecoration: "none" }}>Marketplace</a>{" › "}
          <span style={{ color: "#1e293b" }}>{item.title}</span>
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div style={{ borderRadius: 20, backgroundColor: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 120, minHeight: 400 }}>{item.icon}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <span style={{ borderRadius: 999, backgroundColor: "#eff6ff", padding: "4px 12px", fontSize: 12, color: "#2563eb" }}>{item.major}</span>
                <span style={{ borderRadius: 999, backgroundColor: "#f0fdf4", padding: "4px 12px", fontSize: 12, color: "#16a34a" }}>{item.condition}</span>
                <span style={{ borderRadius: 999, backgroundColor: "#f1f5f9", padding: "4px 12px", fontSize: 12, color: "#475569" }}>{item.category}</span>
              </div>
              <h1 style={{ fontSize: 32, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>{item.title}</h1>
              <p style={{ fontSize: 36, fontWeight: 700, color: "#ef4444", margin: 0 }}>{item.price}</p>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#475569", margin: "0 0 8px" }}>Deskripsi Barang</h2>
              <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0 }}>{item.description}</p>
            </div>
            <div style={{ backgroundColor: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 20 }}>
              <h2 style={{ fontSize: 15, fontWeight: 600, color: "#475569", margin: "0 0 12px" }}>Informasi Penjual</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#2563eb", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{item.seller.name.charAt(0)}</div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 15, margin: 0 }}>{item.seller.name}</p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>{item.seller.major} · ITB</p>
                  <p style={{ fontSize: 13, color: "#64748b", margin: "2px 0 0" }}>⭐ {item.seller.rating} · {item.seller.totalSales} barang terjual</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={"/chat?seller=" + encodeURIComponent(item.seller.name) + "&item=" + encodeURIComponent(item.title) + "&price=" + encodeURIComponent(item.price)} style={{ display: "block", textAlign: "center", backgroundColor: "#2563eb", color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>💬 Chat Penjual</a>
              <button style={{ width: "100%", padding: "14px", borderRadius: 12, border: "2px solid #2563eb", backgroundColor: "transparent", color: "#2563eb", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>🤍 Tambah ke Wishlist</button>
              <a href="/marketplace" style={{ display: "block", textAlign: "center", backgroundColor: "#f1f5f9", color: "#475569", padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>← Kembali ke Marketplace</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}