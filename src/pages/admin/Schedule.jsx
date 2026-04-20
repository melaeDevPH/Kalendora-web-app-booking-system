import { useState } from "react";

// helpers + constants
const today = new Date();

const fmt = (date) => date.toISOString().split("T")[0];

const ALL_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const AdminSchedule = ({ availableSlots, setAvailableSlots }) => {
  const [selDate, setSelDate] = useState(fmt(today));

  const currentSlots =
    availableSlots[selDate] !== undefined ? availableSlots[selDate] : ALL_SLOTS;

  const allEnabled = currentSlots.length === ALL_SLOTS.length;

  const toggle = (slot) => {
    const cur =
      availableSlots[selDate] !== undefined
        ? availableSlots[selDate]
        : ALL_SLOTS;

    const updated = cur.includes(slot)
      ? cur.filter((s) => s !== slot)
      : [...cur, slot].sort();

    setAvailableSlots((p) => ({ ...p, [selDate]: updated }));
  };

  const toggleAll = () => {
    setAvailableSlots((p) => ({
      ...p,
      [selDate]: allEnabled ? [] : [...ALL_SLOTS],
    }));
  };

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
          ⏰ Schedule Management
        </h1>
        <p style={{ margin: 0, color: "#64748B", fontSize: 15 }}>
          Configure your available time slots
        </p>
      </div>

      <div
        style={{
          maxWidth: "100%",
          background: "#fff",
          borderRadius: 16,
          border: "1.5px solid #F1F5F9",
          padding: "28px 24px",
        }}
      >
        {/* DATE SELECTOR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h3
              style={{
                margin: "0 0 6px",
                fontSize: "clamp(16px, 4vw, 20px)",
                fontWeight: "800",
                color: "#0F172A",
              }}
            >
              Select Date
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                color: "#94A3B8",
              }}
            >
              Manage slots for a specific date
            </p>
          </div>

          <input
            type="date"
            value={selDate}
            onChange={(e) => setSelDate(e.target.value)}
            style={{
              border: "1.5px solid #E2E8F0",
              borderRadius: 10,
              padding: "11px 14px",
              fontSize: 14,
              outline: "none",
              background: "#fff",
              minWidth: 160,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.style.borderColor = "#6366F1")}
            onBlur={(e) => (e.style.borderColor = "#E2E8F0")}
          />
        </div>

        {/* SUMMARY */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            padding: "16px 18px",
            background: "#F8FAFC",
            borderRadius: 12,
            border: "1px solid #E2E8F0",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#64748B",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <strong style={{ color: "#6366F1", fontSize: 16 }}>
              {currentSlots.length}
            </strong>
            <span>of {ALL_SLOTS.length} slots available</span>
          </span>

          <button
            onClick={toggleAll}
            style={{
              background: "none",
              border: "none",
              color: "#6366F1",
              fontWeight: "700",
              fontSize: 13,
              cursor: "pointer",
              transition: "color 0.2s",
              textDecoration: "underline",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#4F46E5")}
            onMouseLeave={(e) => (e.target.style.color = "#6366F1")}
          >
            {allEnabled ? "Disable All" : "Enable All"}
          </button>
        </div>

        {/* SLOTS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: 12,
          }}
        >
          {ALL_SLOTS.map((slot) => {
            const active = currentSlots.includes(slot);

            return (
              <button
                key={slot}
                onClick={() => toggle(slot)}
                style={{
                  padding: "16px 12px",
                  borderRadius: 12,
                  border: "2px solid",
                  fontSize: 13,
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: active ? "#6366F1" : "#F8FAFC",
                  color: active ? "#fff" : "#94A3B8",
                  borderColor: active ? "#6366F1" : "#E2E8F0",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                }}
                onMouseEnter={(e) => {
                  if (active) {
                    e.currentTarget.style.background = "#4F46E5";
                    e.currentTarget.style.borderColor = "#4F46E5";
                  } else {
                    e.currentTarget.style.background = "#EEF2FF";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = active ? "#6366F1" : "#F8FAFC";
                  e.currentTarget.style.borderColor = active
                    ? "#6366F1"
                    : "#E2E8F0";
                }}
              >
                <span>{slot}</span>
                <span
                  style={{
                    fontSize: 9,
                    opacity: 0.7,
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                  }}
                >
                  {active ? "🟢 OPEN" : "🔴 CLOSED"}
                </span>
              </button>
            );
          })}
        </div>

        {/* STATS */}
        <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid #F1F5F9" }}>
          <p style={{ margin: "0 0 10px", fontSize: 12, color: "#94A3B8", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Today's Schedule
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
            <div style={{ padding: "12px", background: "#F0FDF4", borderRadius: 10 }}>
              <div style={{ fontSize: 24, fontWeight: "900", color: "#166534" }}>
                {currentSlots.length}
              </div>
              <div style={{ fontSize: 11, color: "#166534", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                Open Slots
              </div>
            </div>
            <div style={{ padding: "12px", background: "#F8FAFC", borderRadius: 10 }}>
              <div style={{ fontSize: 24, fontWeight: "900", color: "#64748B" }}>
                {ALL_SLOTS.length - currentSlots.length}
              </div>
              <div style={{ fontSize: 11, color: "#64748B", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.3px" }}>
                Closed Slots
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          input[type="date"] {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminSchedule;