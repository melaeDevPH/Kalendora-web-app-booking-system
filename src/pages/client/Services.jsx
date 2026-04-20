import { useState } from "react";

// 🔥 Simple button component
const Btn = ({ children, onClick, style }) => (
  <button
    onClick={onClick}
    style={{
      padding: "8px 16px",
      borderRadius: 10,
      border: "none",
      background: "#6366F1",
      color: "#fff",
      fontWeight: "600",
      fontSize: 13,
      cursor: "pointer",
      transition: "all 0.2s",
      ...style,
    }}
    onMouseEnter={(e) => (e.target.style.background = "#4F46E5")}
    onMouseLeave={(e) => (e.target.style.background = "#6366F1")}
  >
    {children}
  </button>
);

const ServicesPage = ({ services, onBook }) => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(services.map((s) => s.category))];
  const filtered = services.filter(
    (s) =>
      (cat === "All" || s.category === cat) &&
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: "800",
            color: "#0F172A",
          }}
        >
          🗓️ Available Services
        </h1>
        <p style={{ margin: 0, color: "#64748B", fontSize: 15 }}>
          Choose a service and book your appointment
        </p>
      </div>

      {/* Search & Filter */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 28,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          placeholder="Search services…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 200px",
            minWidth: 160,
            border: "1.5px solid #E2E8F0",
            borderRadius: 10,
            padding: "11px 14px",
            fontSize: 14,
            outline: "none",
            background: "#fff",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => (e.style.borderColor = "#6366F1")}
          onBlur={(e) => (e.style.borderColor = "#E2E8F0")}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: "9px 16px",
                borderRadius: 10,
                border: "1.5px solid",
                fontSize: 13,
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.15s",
                background: cat === c ? "#6366F1" : "#fff",
                color: cat === c ? "#fff" : "#64748B",
                borderColor: cat === c ? "#6366F1" : "#E2E8F0",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {filtered.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "48px 24px",
            background: "#fff",
            borderRadius: 16,
            border: "1.5px solid #F1F5F9",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <p style={{ fontWeight: "700", color: "#0F172A", margin: "0 0 6px" }}>
            No services found
          </p>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>
            Try adjusting your filters
          </p>
        </div>
      )}

      {/* Services Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 18,
        }}
      >
        {filtered.map((s) => (
          <div
            key={s.id}
            style={{
              background: "#fff",
              borderRadius: 16,
              border: "1.5px solid #F1F5F9",
              padding: "20px 18px",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#C7D2FE";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(99, 102, 241, 0.12)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#F1F5F9";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {/* Service Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "#EEF2FF",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                {s.icon}
              </div>
              <span
                style={{
                  background: "#F0FDF4",
                  color: "#166534",
                  fontSize: 11,
                  fontWeight: "700",
                  padding: "5px 10px",
                  borderRadius: 20,
                  letterSpacing: "0.02em",
                }}
              >
                {s.category}
              </span>
            </div>

            {/* Service Details */}
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: "800", color: "#0F172A" }}>
              {s.name}
            </h3>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: 13,
                color: "#64748B",
                lineHeight: 1.5,
                minHeight: 40,
              }}
            >
              {s.description}
            </p>

            {/* Price & Duration */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 12,
                borderTop: "1px solid #F1F5F9",
              }}
            >
              <div>
                <span style={{ fontSize: 18, fontWeight: "800", color: "#0F172A" }}>
                  ${s.price}
                </span>
                <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: 6 }}>
                  · {s.duration}m
                </span>
              </div>
              <Btn onClick={() => onBook(s)}>Book</Btn>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div {
            box-sizing: border-box;
          }
        }
        @media (max-width: 640px) {
          [style*="gridTemplateColumns: repeat"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;