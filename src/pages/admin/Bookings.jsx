import { useState, useMemo } from "react";
import ClientRescheduleModal from "../../components/modal/ClientReSched";
import BookingDetailDrawer   from "./BookingDetailDrawer";
import AdminCalendarView     from "./AdminCalendarView";
import { bookingStyles as s, bookingHover as hover } from "./styles/booking.js";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

/* ── Helpers ──────────────────────────────────────────────────── */

// Returns how many hours from now until a booking's datetime
const hoursUntil = (date, time) => {
  if (!date || !time) return Infinity;
  const dt = new Date(`${date}T${time}`);
  return (dt - Date.now()) / 36e5; // ms → hours
};

const formatTimeLabel = (hrs) => {
  if (hrs < 1)  return "in less than 1 hour";
  if (hrs < 24) return `in ${Math.round(hrs)} hour${Math.round(hrs) !== 1 ? "s" : ""}`;
  return `in ${Math.round(hrs / 24)} day${Math.round(hrs / 24) !== 1 ? "s" : ""}`;
};

/* ── Sub-components ───────────────────────────────────────────── */

const StatusBadge = ({ status }) => {
  const { base, variants, dot } = s.badge;
  const variant = variants[status] ?? variants.pending;
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span style={{ ...base, ...variant }}>
      <span style={dot(status)} />
      {label}
    </span>
  );
};

const Btn = ({ children, onClick, variant = "approve", icon }) => (
  <button
    onClick={onClick}
    style={{ ...s.btn.base, ...s.btn.variants[variant] }}
    onMouseEnter={(e) => hover.btnEnter(e.currentTarget)}
    onMouseLeave={(e) => hover.btnLeave(e.currentTarget)}
  >
    {icon && <i className={`fas ${icon}`} style={{ marginRight: 5, fontSize: 10, pointerEvents: "none" }} />}
    {children}
  </button>
);

const ActionButtons = ({ booking, onApprove, onDeny, onReschedule, onView }) => (
  <div style={s.table.actionRow} onClick={(e) => e.stopPropagation()}>
    <Btn variant="approve"    icon="fa-check"        onClick={() => onApprove(booking.id)}>Approve</Btn>
    <Btn variant="deny"       icon="fa-times"        onClick={() => onDeny(booking.id)}>Deny</Btn>
    <Btn variant="reschedule" icon="fa-calendar-alt" onClick={() => onReschedule(booking)}>Reschedule</Btn>
    <Btn variant="reschedule" icon="fa-eye"          onClick={() => onView(booking)}>View</Btn>
  </div>
);

/* ── Upcoming Alert Bar ───────────────────────────────────────── */

const UpcomingAlerts = ({ bookings }) => {
  const [dismissed, setDismissed] = useState([]);

  const upcoming = useMemo(() => {
    return bookings
      .filter(b => {
        if (b.status === "cancelled") return false;
        const hrs = hoursUntil(b.date, b.time);
        return hrs >= 0 && hrs <= 48;
      })
      .sort((a, b) => hoursUntil(a.date, a.time) - hoursUntil(b.date, b.time))
      .filter(b => !dismissed.includes(b.id));
  }, [bookings, dismissed]);

  if (upcoming.length === 0) return null;

  return (
    <div style={s.alert.wrapper}>
      {upcoming.map(b => {
        const hrs = hoursUntil(b.date, b.time);
        const urgent = hrs < 3;
        return (
          <div
            key={b.id}
            style={{
              ...s.alert.item,
              background: urgent ? "#FFF1F2" : "#FFF7ED",
              border: `1px solid ${urgent ? "#FECDD3" : "#FED7AA"}`,
            }}
          >
            <div style={{
              ...s.alert.iconBox,
              background: urgent ? "#FECDD3" : "#FED7AA",
              color: urgent ? "#BE123C" : "#C2410C",
            }}>
              <i className={`fas ${urgent ? "fa-bell" : "fa-clock"}`} />
            </div>

            <div style={s.alert.text}>
              <span style={{
                ...s.alert.bold,
                color: urgent ? "#881337" : "#9A3412",
              }}>
                {b.clientName}
              </span>
              <span style={{ color: urgent ? "#BE123C" : "#C2410C", fontSize: 13 }}>
                has a <strong>{b.serviceName}</strong> booking {formatTimeLabel(hrs)} · {b.date} at {b.time}
              </span>
            </div>

            {urgent && (
              <span style={{ ...s.alert.badge, background: urgent ? "#BE123C" : "#C2410C" }}>
                Urgent
              </span>
            )}
            <span style={{
              ...s.alert.badge,
              background: "transparent",
              color: urgent ? "#BE123C" : "#C2410C",
              border: `1px solid ${urgent ? "#FECDD3" : "#FED7AA"}`,
            }}>
              {b.status}
            </span>

            <button
              style={s.alert.dismiss}
              onClick={() => setDismissed(prev => [...prev, b.id])}
              title="Dismiss"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

/* ── Status Summary Strip ─────────────────────────────────────── */

const STRIP_ITEMS = [
  { key: "all",       label: "All",       dotColor: "#C4B5FD", color: { bg: "#F3F0FF", border: "#C4B5FD", text: "#5B21B6" } },
  { key: "approved",  label: "Confirmed", dotColor: "#22C55E", color: { bg: "#DCFCE7", border: "#86EFAC", text: "#166534" } },
  { key: "pending",   label: "Pending",   dotColor: "#FBBF24", color: { bg: "#FEF9C3", border: "#FDE047", text: "#854D0E" } },
  { key: "cancelled", label: "Cancelled", dotColor: "#F43F5E", color: { bg: "#FFE4E6", border: "#FECDD3", text: "#9F1239" } },
];

const SummaryStrip = ({ bookings, active, onChange }) => {
  const counts = {
    all:       bookings.length,
    approved:  bookings.filter(b => b.status === "approved").length,
    pending:   bookings.filter(b => b.status === "pending").length,
    cancelled: bookings.filter(b => b.status === "cancelled").length,
  };

  return (
    <div style={s.strip.wrapper}>
      {STRIP_ITEMS.map(item => {
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            style={s.strip.pill(isActive, item.color)}
            onClick={() => onChange(item.key)}
          >
            <span style={s.strip.dot(item.dotColor)} />
            {item.label}
            <span style={s.strip.count(isActive)}>{counts[item.key]}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ── Tab Bar ──────────────────────────────────────────────────── */

const TABS = [
  { key: "list",     label: "List",     icon: "fa-list" },
  { key: "calendar", label: "Calendar", icon: "fa-calendar-alt" },
];

const TabBar = ({ active, onChange }) => (
  <div style={{
    display: "flex", gap: 4,
    background: "#f5f3ff", borderRadius: 12,
    padding: 4, width: "fit-content", marginBottom: 20,
  }}>
    {TABS.map(({ key, label, icon }) => (
      <button
        key={key}
        style={{
          display: "flex", alignItems: "center", gap: 7,
          padding: "8px 18px", borderRadius: 9,
          border: "none", cursor: "pointer",
          fontSize: 13, fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          background: active === key ? "#346089" : "transparent",
          color: active === key ? "#fff" : "#949cc1",
          boxShadow: active === key ? "0 2px 8px rgba(52,96,137,0.18)" : "none",
          transition: "all 0.18s ease",
        }}
        onClick={() => onChange(key)}
      >
        <i className={`fas ${icon}`} style={{ fontSize: 11 }} />
        {label}
      </button>
    ))}
  </div>
);

/* ── Sort Toggle ──────────────────────────────────────────────── */

const SortToggle = ({ sort, onChange }) => (
  <div style={{ display: "flex", gap: 6 }}>
    {[
      { key: "newest", label: "Newest First", icon: "fa-arrow-down-wide-short" },
      { key: "oldest", label: "Oldest First", icon: "fa-arrow-up-wide-short"   },
    ].map(o => (
      <button
        key={o.key}
        style={s.filters.sortBtn(sort === o.key)}
        onClick={() => onChange(o.key)}
      >
        <i className={`fas ${o.icon}`} style={{ fontSize: 11 }} />
        {o.label}
      </button>
    ))}
  </div>
);

/* ── Main component ───────────────────────────────────────────── */

const AdminBookings = ({ bookings, setBookings }) => {
  const [activeTab,     setActiveTab]     = useState("list");
  const [statusFilter,  setStatusFilter]  = useState("all");
  const [dateFilter,    setDateFilter]    = useState("");
  const [search,        setSearch]        = useState("");
  const [sort,          setSort]          = useState("newest");
  const [rsModal,       setRsModal]       = useState(null);
  const [detailBooking, setDetailBooking] = useState(null);

  const filtered = useMemo(() => {
    let list = bookings.filter((b) =>
      (statusFilter === "all" || b.status === statusFilter) &&
      (!dateFilter || b.date === dateFilter) &&
      (
        b.clientName.toLowerCase().includes(search.toLowerCase()) ||
        b.serviceName.toLowerCase().includes(search.toLowerCase())
      )
    );

    list = [...list].sort((a, b) => {
      const da = new Date(`${a.date}T${a.time || "00:00"}`);
      const db = new Date(`${b.date}T${b.time || "00:00"}`);
      return sort === "newest" ? db - da : da - db;
    });

    return list;
  }, [bookings, statusFilter, dateFilter, search, sort]);

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

  const handleUpdateBooking = (updated) => {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setDetailBooking(updated);
  };

  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header.wrapper}>
        <h1 style={s.header.title}>All Bookings</h1>
        <p style={s.header.subtitle}>Manage all customer appointments</p>
      </div>

      {/* ── Upcoming Alerts ── */}
      <UpcomingAlerts bookings={bookings} />

      {/* ── Status Summary Strip ── */}
      <SummaryStrip bookings={bookings} active={statusFilter} onChange={setStatusFilter} />

      {/* ── Tab bar ── */}
      <TabBar active={activeTab} onChange={setActiveTab} />

      {/* ── Calendar ── */}
      {activeTab === "calendar" && (
        <AdminCalendarView bookings={bookings} />
      )}

      {/* ── List ── */}
      {activeTab === "list" && (
        <>
          {/* Filters row */}
          <div style={s.filters.wrapper}>
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 200px", minWidth: 160 }}>
              <i className="fas fa-search" style={{
                position: "absolute", left: 12, top: "50%",
                transform: "translateY(-50%)", fontSize: 11,
                color: "#ccc", pointerEvents: "none",
              }} />
              <input
                placeholder="Search client or event type…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ ...s.filters.input, paddingLeft: 32, width: "100%", boxSizing: "border-box" }}
                onFocus={(e) => hover.inputFocus(e.target)}
                onBlur={(e)  => hover.inputBlur(e.target)}
              />
            </div>

            {/* Date filter */}
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={s.filters.input}
              onFocus={(e) => hover.inputFocus(e.target)}
              onBlur={(e)  => hover.inputBlur(e.target)}
            />

            {/* Status dropdown (mirrors the strip, kept for quick filtering while scrolled) */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={s.filters.select}
              onFocus={(e) => hover.inputFocus(e.target)}
              onBlur={(e)  => hover.inputBlur(e.target)}
            >
              {["all", "pending", "approved", "cancelled"].map((val) => (
                <option key={val} value={val}>
                  {val === "all" ? "All Statuses" : val.charAt(0).toUpperCase() + val.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort toggle */}
            <SortToggle sort={sort} onChange={setSort} />
          </div>

          {/* Results count */}
          <p style={{ fontSize: 12, color: "#aaa", marginBottom: 14, margin: "0 0 14px" }}>
            Showing <strong style={{ color: "#666" }}>{filtered.length}</strong> of {bookings.length} bookings
          </p>

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
                        {["Client", "Event Type", "Date & Time", "Status", "Actions"].map((h) => (
                          <th key={h} style={s.table.th}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((b) => (
                        <tr
                          key={b.id}
                          style={{ borderTop: "1px solid #EEEDFE", transition: "background 0.15s", cursor: "pointer" }}
                          onClick={() => setDetailBooking(b)}
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
                              onView={setDetailBooking}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile cards */}
              <div
                className="mobile-cards"
                style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}
              >
                {filtered.map((b) => (
                  <div
                    key={b.id}
                    style={{ ...s.card.wrapper, cursor: "pointer" }}
                    onClick={() => setDetailBooking(b)}
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
                      onView={setDetailBooking}
                    />
                  </div>
                ))}
              </div>

            </div>
          )}
        </>
      )}

      {/* ── Reschedule Modal ── */}
      {rsModal && (
        <ClientRescheduleModal
          booking={rsModal}
          bookings={bookings}
          onSave={handleReschedule}
          onClose={() => setRsModal(null)}
        />
      )}

      {/* ── Detail Drawer ── */}
      {detailBooking && (
        <BookingDetailDrawer
          booking={detailBooking}
          onClose={() => setDetailBooking(null)}
          onUpdateBooking={handleUpdateBooking}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-table { display: none !important; }
          .mobile-cards  { display: grid !important; }
        }
        @media (min-width: 769px) {
          .desktop-table { display: block; }
          .mobile-cards  { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminBookings;