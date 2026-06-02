export default function SkeletonCard() {
  return (
    <div style={{ borderRadius: 16, backgroundColor: "#fff", border: "1px solid #e2e8f0", overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 140 }} />
      <div style={{ padding: 14 }}>
        <div className="skeleton" style={{ height: 14, width: "80%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 18, width: "50%", marginBottom: 8 }} />
        <div style={{ display: "flex", gap: 6 }}>
          <div className="skeleton" style={{ height: 20, width: 60, borderRadius: 999 }} />
          <div className="skeleton" style={{ height: 20, width: 60, borderRadius: 999 }} />
        </div>
      </div>
    </div>
  );
}