import { useState } from "react";

// Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    pending: { bg: "#FFFBEB", color: "#92400E", label: "Pending" },
    approved: { bg: "#DCFCE7", color: "#166534", label: "Approved" },
    cancelled: { bg: "#FEE2E2", color: "#991B1B", label: "Cancelled" },
  };
  const s = styles[status] || styles.pending;
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: "700",
        background: s.bg,
        color: s.color,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
};

// Button Component
const Btn = ({ children, onClick, variant = "default", style }) => {
  const styles = {
    default: { background: "#6366F1", color: "#fff" },
    ghost: { background: "#F1F5F9", color: "#475569", border: "1px solid #E2E8F0" },
    danger: { background: "#FEE2E2", color: "#991B1B" },
  };
  const s = styles[variant] || styles.default;
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: "600",
        fontSize: 12,
        padding: "7px 14px",
        transition: "all 0.2s",
        ...s,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (variant === "default") e.target.style.background = "#4F46E5";
        else if (variant === "danger") e.target.style.background = "#FECACA";
      }}
      onMouseLeave={(e) => {
        if (variant === "default") e.target.style.background = "#6366F1";
        else if (variant === "danger") e.target.style.background = "#FEE2E2";
      }}
    >
      {children}
    </button>
  );
};

const MyBookings = ({ bookings, user, onCancel, onReschedule }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const mine = bookings.filter((b) => b.clientEmail === user.email);
  const filtered = mine.filter(
    (b) =>
      (filter === "all" || b.status === filter) &&
      b.serviceName.toLowerCase().includes(search.toLowerCase())
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
          📋 My Appointments
        </h1>
        <p style={{ margin: 0, color: "#64748B", fontSize: 15 }}>
          View and manage your bookings
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          placeholder="Search bookings…"
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
          {["all", "pending", "approved", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: "9px 16px",
                borderRadius: 10,
                border: "1.5px solid",
                fontSize: 13,
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.15s",
                background: filter === s ? "#6366F1" : "#fff",
                color: filter === s ? "#fff" : "#64748B",
                borderColor: filter === s ? "#6366F1" : "#E2E8F0",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "64px 24px",
            background: "#fff",
            borderRadius: 16,
            border: "1.5px solid #F1F5F9",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <p
            style={{
              fontWeight: "700",
              color: "#0F172A",
              margin: "0 0 6px",
              fontSize: 16,
            }}
          >
            No bookings found
          </p>
          <p
            style={{
              color: "#94A3B8",
              fontSize: 14,
              margin: 0,
            }}
          >
            Try a different filter or book a new service.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 12,
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {filtered.map((b) => (
            <div
              key={b.id}
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1.5px solid #F1F5F9",
                padding: "18px 20px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C7D2FE";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(99, 102, 241, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#F1F5F9";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Booking Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div>
                  <h3
                    style={{
                      margin: "0 0 4px",
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#0F172A",
                    }}
                  >
                    {b.serviceName}
                  </h3>
                  <StatusBadge status={b.status} />
                </div>
              </div>

              {/* Booking Details */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  marginBottom: 14,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "#64748B",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  📅 <strong>{b.date}</strong> at <strong>{b.time}</strong>
                </p>
                {b.notes && (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12,
                      color: "#94A3B8",
                      fontStyle: "italic",
                    }}
                  >
                    💬 {b.notes}
                  </p>
                )}
              </div>

              {/* Actions */}
              {b.status !== "cancelled" && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    paddingTop: 12,
                    borderTop: "1px solid #F1F5F9",
                  }}
                >
                  <Btn variant="ghost" onClick={() => onReschedule(b)}>
                    📅 Reschedule
                  </Btn>
                  <Btn variant="danger" onClick={() => onCancel(b.id)}>
                    ❌ Cancel
                  </Btn>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MyBookings;