import { useState } from "react";
import ClientRescheduleModal from "../../components/modal/ClientReSched";
import { bookingStyles as s, bookingHover as hover } from "./styles/booking.js";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

/* ── Sub-components ───────────────────────────────────────────── */

const StatusBadge = ({ status }) => {
  const variant = s.badge.variants[status] ?? s.badge.variants.pending;
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span style={{ ...s.badge.base, ...variant }}>{label}</span>;
};

const Btn = ({ children, onClick, variant = "approve", icon }) => (
  <button
    onClick={onClick}
    style={{ ...s.btn.base, ...s.btn.variants[variant] }}
    onMouseEnter={(e) => hover.btnEnter(e.currentTarget)}
    onMouseLeave={(e) => hover.btnLeave(e.currentTarget)}
  >
    {icon && <i className={`fas ${icon}`} style={{ marginRight: 5, fontSize: 10 }} />}
    {children}
  </button>
);

const ActionButtons = ({ booking, onApprove, onDeny, onReschedule }) => (
  <div style={s.table.actionRow}>
    <Btn variant="approve"    icon="fa-check"        onClick={() => onApprove(booking.id)}>Approve</Btn>
    <Btn variant="deny"       icon="fa-times"        onClick={() => onDeny(booking.id)}>Deny</Btn>
    <Btn variant="reschedule" icon="fa-calendar-alt" onClick={() => onReschedule(booking)}>Reschedule</Btn>
  </div>
);

/* ── Main component ───────────────────────────────────────────── */

const AdminBookings = ({ bookings, setBookings }) => {
  const [filter, setFilter]         = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch]         = useState("");
  const [rsModal, setRsModal]       = useState(null);

  const filtered = bookings.filter((b) =>
    (filter === "all" || b.status === filter) &&
    (!dateFilter || b.date === dateFilter) &&
    (
      b.clientName.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(search.toLowerCase())
    )
  );

  const updateStatus = async (id, status) => {
    await delay(400);
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const handleReschedule = (id, date, time) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, date, time, status: "pending" } : b))
    );
    setRsModal(null);
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={s.header.wrapper}>
        <h1 style={s.header.title}>All Bookings</h1>
        <p style={s.header.subtitle}>Manage all customer appointments</p>
      </div>

      {/* Filters */}
      <div style={s.filters.wrapper}>
        <div style={{ position: "relative", flex: "1 1 200px", minWidth: 160 }}>
          <i className="fas fa-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "#ccc", pointerEvents: "none" }} />
          <input
            placeholder="Search client or service…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...s.filters.input, paddingLeft: 32, width: "100%", boxSizing: "border-box" }}
            onFocus={(e) => hover.inputFocus(e.target)}
            onBlur={(e)  => hover.inputBlur(e.target)}
          />
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={s.filters.input}
          onFocus={(e) => hover.inputFocus(e.target)}
          onBlur={(e)  => hover.inputBlur(e.target)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={s.filters.select}
          onFocus={(e) => hover.inputFocus(e.target)}
          onBlur={(e)  => hover.inputBlur(e.target)}
        >
          {["all", "pending", "approved", "cancelled"].map((val) => (
            <option key={val} value={val}>
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div style={s.empty.wrapper}>
          <i className="fas fa-calendar-xmark" style={{ fontSize: 32, color: "#e0d9f7", marginBottom: 12, display: "block" }} />
          <p style={s.empty.title}>No bookings found</p>
          <p style={s.empty.sub}>Try adjusting your filters</p>
        </div>
      ) : (
        <div style={{ marginBottom: 20 }}>

          {/* Desktop table */}
          <div className="desktop-table" style={s.table.wrapper}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #EEEDFE" }}>
                    {["Client", "Service", "Date & Time", "Status", "Actions"].map((h) => (
                      <th key={h} style={s.table.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr
                      key={b.id}
                      style={{ borderTop: "1px solid #EEEDFE", transition: "background 0.15s" }}
                      onMouseEnter={(e) => hover.rowEnter(e.currentTarget)}
                      onMouseLeave={(e) => hover.rowLeave(e.currentTarget)}
                    >
                      <td style={s.table.tdName}>
                        <div>{b.clientName}</div>
                        <div style={s.table.tdEmail}>{b.clientEmail}</div>
                      </td>
                      <td style={s.table.tdService}>{b.serviceName}</td>
                      <td style={s.table.tdDate}>
                        <div>{b.date}</div>
                        <div style={s.table.tdDateSub}>{b.time}</div>
                      </td>
                      <td style={s.table.tdStatus}><StatusBadge status={b.status} /></td>
                      <td style={s.table.tdActions}>
                        <ActionButtons
                          booking={b}
                          onApprove={(id) => updateStatus(id, "approved")}
                          onDeny={(id)    => updateStatus(id, "cancelled")}
                          onReschedule={setRsModal}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="mobile-cards" style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
            {filtered.map((b) => (
              <div
                key={b.id}
                style={s.card.wrapper}
                onMouseEnter={(e) => hover.cardEnter(e.currentTarget)}
                onMouseLeave={(e) => hover.cardLeave(e.currentTarget)}
              >
                <div style={s.card.topRow}>
                  <div>
                    <p style={s.card.name}>{b.clientName}</p>
                    <p style={s.card.email}>{b.clientEmail}</p>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div style={s.card.body}>
                  <p style={s.card.meta}>
                    <i className="fas fa-calendar-alt" style={{ marginRight: 6, fontSize: 10, opacity: 0.5 }} />
                    {b.date} · {b.time}
                  </p>
                  <p style={s.card.meta}>
                    <i className="fas fa-concierge-bell" style={{ marginRight: 6, fontSize: 10, opacity: 0.5 }} />
                    {b.serviceName}
                  </p>
                </div>
                <ActionButtons
                  booking={b}
                  onApprove={(id) => updateStatus(id, "approved")}
                  onDeny={(id)    => updateStatus(id, "cancelled")}
                  onReschedule={setRsModal}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reschedule modal */}
      {rsModal && (
        <ClientRescheduleModal
          booking={rsModal}
          bookings={bookings}
          onSave={handleReschedule}
          onClose={() => setRsModal(null)}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; }
        .desktop-table { display: none !important; }
        .mobile-cards  { display: grid !important; }
        @media (min-width: 1024px) {
          .desktop-table { display: block !important; }
          .mobile-cards  { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminBookings;