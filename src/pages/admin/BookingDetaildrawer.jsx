import { useState } from "react";
import { detailStyles as s, detailHover as hover } from "./styles/bookingdetail.js";

/* ── Helpers ──────────────────────────────────────────────────── */

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-").map(Number);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const date   = new Date(y, m - 1, d);
  return `${days[date.getDay()]}, ${months[m - 1]} ${d}, ${y}`;
};

/* ── Section wrapper ──────────────────────────────────────────── */

const Section = ({ title, children }) => (
  <div style={s.section}>
    <p style={s.sectionTitle}>{title}</p>
    {children}
  </div>
);

/* ── Info card (single cell) ──────────────────────────────────── */

const InfoCard = ({ label, value, sub, icon, fullWidth }) => (
  <div style={{ ...s.infoCard, ...(fullWidth ? { gridColumn: "1 / -1" } : {}) }}>
    <p style={s.infoLabel}>
      {icon && <i className={`fas ${icon}`} style={{ marginRight: 5 }} />}
      {label}
    </p>
    <p style={s.infoValue}>{value || "—"}</p>
    {sub && <p style={s.infoValueSub}>{sub}</p>}
  </div>
);

/* ── Timeline section ─────────────────────────────────────────── */

const TimelineSection = ({ items, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState({ time: "", title: "", desc: "" });

  const handleSave = () => {
    if (!form.time.trim() || !form.title.trim()) return;
    onAdd({ ...form, id: Date.now() });
    setForm({ time: "", title: "", desc: "" });
    setShowForm(false);
  };

  const sorted = [...items].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Section title="Program / Timeline">
      {sorted.length === 0 && !showForm && (
        <p style={{ fontSize: 12, color: "#c4bde0", fontStyle: "italic" }}>
          No timeline added yet.
        </p>
      )}

      {sorted.length > 0 && (
        <div style={s.timeline}>
          {sorted.map((item, i) => (
            <div key={item.id} style={s.timelineItem}>
              {/* Left: time + dot + line */}
              <div style={s.timelineLeft}>
                <span style={s.timelineTime}>{item.time}</span>
                <span style={s.timelineDot} />
                <span style={s.timelineLine(i === sorted.length - 1)} />
              </div>

              {/* Right: content */}
              <div style={{ ...s.timelineContent, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={s.timelineTitle}>{item.title}</p>
                  <button
                    onClick={() => onDelete(item.id)}
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "#e0d9f7", fontSize: 11, padding: "0 2px",
                      lineHeight: 1, transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#e0d9f7"; }}
                    title="Remove"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
                {item.desc && <p style={s.timelineDesc}>{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div style={s.addForm}>
          <div style={s.addFormRow}>
            <input
              placeholder="Time (e.g. 3:00 PM)"
              value={form.time}
              onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
              style={{ ...s.addInput, maxWidth: 130 }}
              onFocus={(e) => hover.inputFocus(e.target)}
              onBlur={(e)  => hover.inputBlur(e.target)}
            />
            <input
              placeholder="Event (e.g. Ceremony)"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              style={s.addInput}
              onFocus={(e) => hover.inputFocus(e.target)}
              onBlur={(e)  => hover.inputBlur(e.target)}
            />
          </div>
          <input
            placeholder="Description (optional)"
            value={form.desc}
            onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
            style={s.addInput}
            onFocus={(e) => hover.inputFocus(e.target)}
            onBlur={(e)  => hover.inputBlur(e.target)}
          />
          <div style={s.addFormActions}>
            <button style={s.addCancelBtn} onClick={() => setShowForm(false)}>Cancel</button>
            <button style={s.addSaveBtn}   onClick={handleSave}>
              <i className="fas fa-plus" style={{ marginRight: 5 }} />
              Add
            </button>
          </div>
        </div>
      )}

      {!showForm && (
        <button
          style={s.addTimelineBtn}
          onClick={() => setShowForm(true)}
          onMouseEnter={(e) => hover.addBtnEnter(e.currentTarget)}
          onMouseLeave={(e) => hover.addBtnLeave(e.currentTarget)}
        >
          <i className="fas fa-plus" style={{ fontSize: 10 }} />
          Add timeline item
        </button>
      )}
    </Section>
  );
};

/* ── Main Drawer ──────────────────────────────────────────────── */

const BookingDetailDrawer = ({ booking, onClose, onUpdateBooking }) => {
  const [timeline, setTimeline] = useState(booking.timeline ?? []);
  const [notes,    setNotes]    = useState(booking.notes    ?? "");
  const [editNotes, setEditNotes] = useState(false);

  if (!booking) return null;

  const addTimelineItem = (item) => {
    const updated = [...timeline, item];
    setTimeline(updated);
    onUpdateBooking?.({ ...booking, timeline: updated });
  };

  const deleteTimelineItem = (id) => {
    const updated = timeline.filter((t) => t.id !== id);
    setTimeline(updated);
    onUpdateBooking?.({ ...booking, timeline: updated });
  };

  const saveNotes = () => {
    setEditNotes(false);
    onUpdateBooking?.({ ...booking, notes });
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.drawer} onClick={(e) => e.stopPropagation()}>

        {/* ── Header ── */}
        <div style={s.drawerHeader}>
          <div style={s.headerLeft}>
            <span style={s.bookingId}>Booking #{booking.id}</span>
            <h2 style={s.clientName}>{booking.clientName}</h2>
            <p style={s.clientEmail}>{booking.clientEmail}</p>
          </div>
          <button
            style={s.closeBtn}
            onClick={onClose}
            onMouseEnter={(e) => hover.closeBtnEnter(e.currentTarget)}
            onMouseLeave={(e) => hover.closeBtnLeave(e.currentTarget)}
          >
            <i className="fas fa-times" />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={s.body}>

          {/* Status */}
          <div style={s.statusRow}>
            <span style={s.statusBadgeLarge(booking.status)}>
              <span style={s.dotStatus(booking.status)} />
              {booking.status}
            </span>
          </div>

          <div style={s.divider} />

          {/* Event info */}
          <Section title="Event Details">
            <div style={s.infoGrid}>
              <InfoCard
                label="Service / Event Type"
                value={booking.serviceName}
                icon="fa-concierge-bell"
                fullWidth
              />
              <InfoCard
                label="Date"
                value={formatDate(booking.date)}
                icon="fa-calendar"
              />
              <InfoCard
                label="Time"
                value={booking.time}
                icon="fa-clock"
              />
              {booking.venue && (
                <InfoCard
                  label="Venue"
                  value={booking.venue}
                  icon="fa-map-marker-alt"
                  fullWidth
                />
              )}
              {booking.guests !== undefined && (
                <InfoCard
                  label="Guest Count"
                  value={`${booking.guests} guests`}
                  icon="fa-users"
                />
              )}
              {booking.price !== undefined && (
                <InfoCard
                  label="Package Price"
                  value={`₱${Number(booking.price).toLocaleString()}`}
                  icon="fa-tag"
                />
              )}
            </div>
          </Section>

          <div style={s.divider} />

          {/* Notes */}
          <Section title="Notes">
            {editNotes ? (
              <div style={s.addForm}>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  placeholder="Add notes about this booking…"
                  style={{
                    ...s.addInput,
                    resize: "vertical",
                    lineHeight: 1.6,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onFocus={(e) => hover.inputFocus(e.target)}
                  onBlur={(e)  => hover.inputBlur(e.target)}
                  autoFocus
                />
                <div style={s.addFormActions}>
                  <button style={s.addCancelBtn} onClick={() => { setNotes(booking.notes ?? ""); setEditNotes(false); }}>
                    Cancel
                  </button>
                  <button style={s.addSaveBtn} onClick={saveNotes}>Save</button>
                </div>
              </div>
            ) : (
              <div
                style={{ ...s.notesBox, cursor: "pointer" }}
                onClick={() => setEditNotes(true)}
                title="Click to edit notes"
              >
                {notes
                  ? notes
                  : <span style={s.notesEmpty}>No notes yet — click to add one.</span>
                }
              </div>
            )}
          </Section>

          <div style={s.divider} />

          {/* Timeline */}
          <TimelineSection
            items={timeline}
            onAdd={addTimelineItem}
            onDelete={deleteTimelineItem}
          />

        </div>
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes drawerIn {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BookingDetailDrawer;