import { useState } from "react";

// Helpers
const today = new Date();
const delay = (ms = 900) => new Promise((r) => setTimeout(r, ms));

const fmt = (date) => date.toISOString().split("T")[0];
const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

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

// 🔥 Simple button component
const Btn = ({ children, onClick, disabled, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "12px 20px",
      borderRadius: 10,
      border: "none",
      background: disabled ? "#CBD5E1" : "#6366F1",
      color: "#fff",
      fontWeight: "600",
      fontSize: 14,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s",
      ...style,
    }}
    onMouseEnter={(e) => {
      if (!disabled) e.target.style.background = "#4F46E5";
    }}
    onMouseLeave={(e) => {
      if (!disabled) e.target.style.background = "#6366F1";
    }}
  >
    {children}
  </button>
);

const BookingForm = ({ service, bookings, availableSlots, onConfirm, onCancel }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const minDate = fmt(today);
  const maxDate = fmt(addDays(today, 30));
  const bookedSlots = bookings
    .filter(
      (b) =>
        b.date === date &&
        b.serviceId === service?.id &&
        b.status !== "cancelled"
    )
    .map((b) => b.time);
  const daySlots = availableSlots[date] || ALL_SLOTS;

  const handleSubmit = async () => {
    if (!date || !time) return;
    setLoading(true);
    await delay(900);
    onConfirm({
      serviceId: service.id,
      serviceName: service.name,
      date,
      time,
      notes,
    });
    setLoading(false);
    setDone(true);
  };

  if (done)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 40,
          paddingBottom: 40,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "48px 32px",
            textAlign: "center",
            maxWidth: 400,
            border: "1.5px solid #F1F5F9",
            width: "100%",
          }}
        >
          <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
          <h2
            style={{
              margin: "0 0 8px",
              fontWeight: 800,
              color: "#0F172A",
              fontSize: 22,
            }}
          >
            Booking Submitted!
          </h2>
          <p style={{ color: "#64748B", margin: "0 0 28px", fontSize: 14 }}>
            Your appointment is pending confirmation.
          </p>
          <Btn onClick={onCancel}>Back to Services</Btn>
        </div>
      </div>
    );

  return (
    <div
      style={{
        maxWidth: 560,
        margin: "0 auto",
        padding: "0 16px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Back Button */}
      <button
        onClick={onCancel}
        style={{
          background: "none",
          border: "none",
          color: "#6366F1",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 24,
          padding: 0,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.color = "#4F46E5")}
        onMouseLeave={(e) => (e.target.style.color = "#6366F1")}
      >
        ← Back
      </button>

      {/* Form Card */}
      <div
        style={{
          background: "#fff",
          borderRadius: 18,
          border: "1.5px solid #F1F5F9",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
            padding: "28px 24px",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>{service?.icon}</div>
          <h2
            style={{
              margin: "0 0 6px",
              fontSize: 22,
              fontWeight: "800",
              lineHeight: 1.2,
            }}
          >
            {service?.name}
          </h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: 14 }}>
            {service?.duration} min · ${service?.price}
          </p>
        </div>

        {/* Form Content */}
        <div style={{ padding: "28px 24px" }}>
          {/* Date Selection */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: "700",
                color: "#0F172A",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              📅 Select Date
            </label>
            <input
              type="date"
              min={minDate}
              max={maxDate}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime("");
              }}
              style={{
                width: "100%",
                border: "1.5px solid #E2E8F0",
                borderRadius: 10,
                padding: "11px 14px",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                background: "#fff",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Time Selection */}
          {date && (
            <div style={{ marginBottom: 24 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#0F172A",
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                ⏰ Time Slots
                <span style={{ fontWeight: "400", color: "#94A3B8", marginLeft: 6 }}>
                  ({daySlots.filter((s) => !bookedSlots.includes(s)).length} available)
                </span>
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
                  gap: 10,
                }}
              >
                {daySlots.map((slot) => {
                  const booked = bookedSlots.includes(slot);
                  const selected = slot === time;
                  return (
                    <button
                      key={slot}
                      disabled={booked}
                      onClick={() => setTime(slot)}
                      style={{
                        padding: "11px 8px",
                        fontSize: 13,
                        fontWeight: "600",
                        borderRadius: 10,
                        border: "1.5px solid",
                        cursor: booked ? "not-allowed" : "pointer",
                        transition: "all 0.15s",
                        background: booked
                          ? "#F8FAFC"
                          : selected
                            ? "#6366F1"
                            : "#fff",
                        color: booked
                          ? "#CBD5E1"
                          : selected
                            ? "#fff"
                            : "#475569",
                        borderColor: booked
                          ? "#F1F5F9"
                          : selected
                            ? "#6366F1"
                            : "#E2E8F0",
                        position: "relative",
                        opacity: booked ? 0.6 : 1,
                      }}
                    >
                      {slot}
                      {booked && (
                        <span
                          style={{
                            position: "absolute",
                            fontSize: 8,
                            bottom: 2,
                            left: 0,
                            right: 0,
                            color: "#CBD5E1",
                            fontWeight: "700",
                            letterSpacing: "0.05em",
                          }}
                        >
                          FULL
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div style={{ marginBottom: 28 }}>
            <label
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: "700",
                color: "#0F172A",
                marginBottom: 8,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              📝 Special Requests (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Tell us about your needs…"
              style={{
                width: "100%",
                border: "1.5px solid #E2E8F0",
                borderRadius: 10,
                padding: "11px 14px",
                fontSize: 14,
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
              onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
            />
          </div>

          {/* Submit Button */}
          <Btn
            disabled={!date || !time || loading}
            onClick={handleSubmit}
            style={{ width: "100%" }}
          >
            {loading ? "Confirming..." : "Confirm Booking"}
          </Btn>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          input[type="date"],
          textarea {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingForm;