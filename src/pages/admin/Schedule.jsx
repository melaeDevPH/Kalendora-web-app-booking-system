import { useState } from "react";
import { scheduleStyles as s, scheduleHover as hover } from "./styles/schedule";

const ALL_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM",
  "04:00 PM", "05:00 PM",
];

const fmt = (date) => date.toISOString().split("T")[0];

/* ── Sub-components ───────────────────────────────────────────── */

const SlotButton = ({ slot, active, onToggle }) => (
  <button
    onClick={() => onToggle(slot)}
    style={active ? s.slots.btnActive : s.slots.btnInactive}
    onMouseEnter={(e) => active ? hover.slotActiveEnter(e.currentTarget) : hover.slotInactiveEnter(e.currentTarget)}
    onMouseLeave={(e) => active ? hover.slotActiveLeave(e.currentTarget) : hover.slotInactiveLeave(e.currentTarget)}
  >
    <i className={`fas ${active ? "fa-circle-check" : "fa-circle-xmark"}`} style={{ fontSize: 13, marginBottom: 4 }} />
    <span>{slot}</span>
    <span style={s.slots.statusLabel}>{active ? "Open" : "Closed"}</span>
  </button>
);

const StatCard = ({ value, label, isOpen }) => (
  <div style={isOpen ? s.stats.cardOpen : s.stats.cardClosed}>
    <i className={`fas ${isOpen ? "fa-door-open" : "fa-door-closed"}`} style={{
      fontSize: 13,
      color: isOpen ? "#8f4ab7" : "#ccc",
      marginBottom: 8,
      display: "block",
    }} />
    <div style={isOpen ? s.stats.numOpen : s.stats.numClosed}>{value}</div>
    <div style={isOpen ? s.stats.labelOpen : s.stats.labelClosed}>{label}</div>
  </div>
);

/* ── Main component ───────────────────────────────────────────── */

const AdminSchedule = ({ availableSlots, setAvailableSlots }) => {
  const [selDate, setSelDate] = useState(fmt(new Date()));

  const currentSlots = availableSlots[selDate] !== undefined ? availableSlots[selDate] : ALL_SLOTS;
  const allEnabled = currentSlots.length === ALL_SLOTS.length;

  const toggle = (slot) => {
    const cur = availableSlots[selDate] !== undefined ? availableSlots[selDate] : ALL_SLOTS;
    const updated = cur.includes(slot)
      ? cur.filter((s) => s !== slot)
      : [...cur, slot].sort();
    setAvailableSlots((prev) => ({ ...prev, [selDate]: updated }));
  };

  const toggleAll = () => {
    setAvailableSlots((prev) => ({ ...prev, [selDate]: allEnabled ? [] : [...ALL_SLOTS] }));
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={s.header.wrapper}>
        <h1 style={s.header.title}>Schedule Management</h1>
        <p style={s.header.subtitle}>Configure your available time slots</p>
      </div>

      <div style={s.card}>
        {/* Date picker */}
        <div style={s.datePicker.row}>
          <div>
            <p style={s.datePicker.label}>
              <i className="fas fa-calendar-days" style={{ marginRight: 8, fontSize: 14, opacity: 0.4 }} />
              Select Date
            </p>
            <p style={s.datePicker.sublabel}>Manage slots for a specific date</p>
          </div>
          <input
            type="date"
            value={selDate}
            onChange={(e) => setSelDate(e.target.value)}
            style={s.datePicker.input}
            onFocus={(e) => hover.inputFocus(e.target)}
            onBlur={(e)  => hover.inputBlur(e.target)}
          />
        </div>

        {/* Summary bar */}
        <div style={s.summary.wrapper}>
          <span style={s.summary.text}>
            <i className="fas fa-clock" style={{ fontSize: 11, opacity: 0.5 }} />
            <strong style={s.summary.count}>{currentSlots.length}</strong>
            of {ALL_SLOTS.length} slots available
          </span>
          <button style={s.summary.toggleBtn} onClick={toggleAll}>
            {allEnabled ? "Disable All" : "Enable All"}
          </button>
        </div>

        {/* Slots grid */}
        <div style={s.slots.grid}>
          {ALL_SLOTS.map((slot) => (
            <SlotButton
              key={slot}
              slot={slot}
              active={currentSlots.includes(slot)}
              onToggle={toggle}
            />
          ))}
        </div>

        {/* Stats */}
        <div style={s.stats.wrapper}>
          <p style={s.stats.eyebrow}>Selected date</p>
          <div style={s.stats.grid}>
            <StatCard value={currentSlots.length}                    label="Open Slots"   isOpen={true} />
            <StatCard value={ALL_SLOTS.length - currentSlots.length} label="Closed Slots" isOpen={false} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { input[type="date"] { width: 100% !important; } }
      `}</style>
    </div>
  );
};

export default AdminSchedule;