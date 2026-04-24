import { useState } from "react";

/* ── Helpers ──────────────────────────────────────────────────── */

const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

const fmt = (d) => {
  if (!d) return "";
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toISOString().split("T")[0];
};

const ALL_SLOTS = [
  "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00", "19:00",
];

/* ── Shared mini-components (self-contained so no broken imports) */

const overlayStyle = {
  position: "fixed", inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 9999, padding: 16,
};

const modalBoxStyle = {
  background: "#fff",
  borderRadius: 20,
  padding: "28px 24px",
  width: "100%",
  maxWidth: 480,
  boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  maxHeight: "90vh",
  overflowY: "auto",
};

const Modal = ({ title, onClose, children }) => (
  <div style={overlayStyle} onClick={onClose}>
    <div style={modalBoxStyle} onClick={(e) => e.stopPropagation()}>
      {/* Modal header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#1E1248", letterSpacing: "-0.4px" }}>
          {title}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: "#F3F0FF", border: "none", borderRadius: 8,
            width: 32, height: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#6440F0", fontSize: 14,
          }}
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  </div>
);

const Input = ({ label, type = "text", value, onChange, min }) => (
  <div style={{ marginBottom: 16 }}>
    {label && (
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      style={{
        width: "100%", boxSizing: "border-box",
        border: "1.5px solid #E2E8F0", borderRadius: 10,
        padding: "10px 14px", fontSize: 13,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        color: "#1E1248", outline: "none",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) => { e.target.style.borderColor = "#6366F1"; }}
      onBlur={(e)  => { e.target.style.borderColor = "#E2E8F0"; }}
    />
  </div>
);

const Btn = ({ children, onClick, variant = "primary", disabled }) => {
  const base = {
    padding: "10px 20px", borderRadius: 10, fontSize: 13,
    fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer",
    border: "none", fontFamily: "'DM Sans', system-ui, sans-serif",
    transition: "opacity 0.15s", opacity: disabled ? 0.45 : 1,
  };
  const variants = {
    primary:   { background: "#6366F1", color: "#fff" },
    secondary: { background: "#F3F0FF", color: "#6440F0" },
  };
  return (
    <button style={{ ...base, ...variants[variant] }} onClick={disabled ? undefined : onClick}>
      {children}
    </button>
  );
};

/* ── Main component ───────────────────────────────────────────── */

const ClientRescheduleModal = ({ booking, bookings, onSave, onClose }) => {
  const [date, setDate] = useState(booking?.date || "");
  const [time, setTime] = useState(booking?.time || "");

  // Times already booked on the selected date (excluding this booking and cancelled ones)
  const booked = (bookings || [])
    .filter(b => b.date === date && b.id !== booking?.id && b.status !== "cancelled")
    .map(b => b.time);

  if (!booking) return null;

  return (
    <Modal title="Reschedule Appointment" onClose={onClose}>
      {/* Current booking info */}
      <div style={{ background: "#EEF2FF", borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#4338CA" }}>
          {booking.serviceName}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6366F1" }}>
          Current: {booking.date} at {booking.time}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6366F1" }}>
          Client: {booking.clientName}
        </p>
      </div>

      {/* Date picker */}
      <Input
        label="New Date"
        type="date"
        min={fmt(today)}
        value={date}
        onChange={(e) => { setDate(e.target.value); setTime(""); }}
      />

      {/* Time slot grid */}
      {date && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>
            Select New Time
          </label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {ALL_SLOTS.map(slot => {
              const isBooked   = booked.includes(slot);
              const isSelected = time === slot;
              return (
                <button
                  key={slot}
                  disabled={isBooked}
                  onClick={() => setTime(slot)}
                  style={{
                    padding: "10px 0", fontSize: 13, fontWeight: 600,
                    borderRadius: 10, border: "1.5px solid",
                    cursor: isBooked ? "not-allowed" : "pointer",
                    background: isBooked ? "#F8FAFC" : isSelected ? "#6366F1" : "#fff",
                    color:      isBooked ? "#CBD5E1"  : isSelected ? "#fff"    : "#475569",
                    borderColor: isBooked ? "#F1F5F9" : isSelected ? "#6366F1" : "#E2E8F0",
                    transition: "all 0.15s",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!date || !time} onClick={() => onSave(booking.id, date, time)}>
          Confirm Reschedule
        </Btn>
      </div>
    </Modal>
  );
};

export default ClientRescheduleModal;