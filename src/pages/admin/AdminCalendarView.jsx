import { useState, useMemo } from "react";
import { calendarStyles as s, calendarHover as hover } from "./styles/calendarview.js";

/* ── Helpers ──────────────────────────────────────────────────── */

const DAYS   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7 AM → 8 PM

const toDateStr = (y, m, d) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const parseHour = (timeStr) => {
  if (!timeStr) return null;
  const [h, rest] = timeStr.split(":");
  const pm = /pm/i.test(rest ?? "");
  let hour = parseInt(h, 10);
  if (pm && hour !== 12) hour += 12;
  if (!pm && hour === 12) hour = 0;
  return hour;
};

// Detect bookings that share the same date + time
const findConflicts = (bookings) => {
  const map = {};
  bookings.forEach((b) => {
    if (b.status === "cancelled") return;
    const key = `${b.date}|${b.time}`;
    if (!map[key]) map[key] = [];
    map[key].push(b.id);
  });
  const conflictIds = new Set();
  Object.values(map).forEach((ids) => {
    if (ids.length > 1) ids.forEach((id) => conflictIds.add(id));
  });
  return conflictIds;
};

/* ── Status Badge ─────────────────────────────────────────────── */

const STATUS_COLORS = {
  approved:  "#22c55e",
  pending:   "#f59e0b",
  cancelled: "#ef4444",
  confirmed: "#6366f1",
  ongoing:   "#06b6d4",
  completed: "#8b5cf6",
};

const BadgeMini = ({ status }) => (
  <span
    style={{
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 7px",
      borderRadius: 20,
      background: STATUS_COLORS[status] + "22",
      color: STATUS_COLORS[status] ?? "#777",
      textTransform: "capitalize",
      flexShrink: 0,
    }}
  >
    {status}
  </span>
);

/* ── Day Detail Panel (bottom drawer) ────────────────────────── */

const DayPanel = ({ dateStr, bookings, conflictIds, onClose }) => {
  const dayBookings = bookings.filter((b) => b.date === dateStr);
  const label = (() => {
    const [y, m, d] = dateStr.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  })();

  return (
    <div style={s.panel.overlay} onClick={onClose}>
      <div style={s.panel.drawer} onClick={(e) => e.stopPropagation()}>
        <div style={s.panel.handle} />
        <p style={s.panel.date}>{label}</p>

        {dayBookings.length === 0 ? (
          <div style={s.panel.emptyDay}>
            <i className="fas fa-calendar-check" style={{ fontSize: 28, display: "block", marginBottom: 8, opacity: 0.3 }} />
            No bookings on this day
          </div>
        ) : (
          dayBookings.map((b) => (
            <div
              key={b.id}
              style={{
                ...s.panel.card,
                borderLeft: conflictIds.has(b.id)
                  ? "4px solid #ef4444"
                  : `4px solid ${STATUS_COLORS[b.status] ?? "#e0d9f7"}`,
              }}
              onMouseEnter={(e) => hover.panelCardEnter(e.currentTarget)}
              onMouseLeave={(e) => hover.panelCardLeave(e.currentTarget)}
            >
              <div style={s.panel.cardTop}>
                <div>
                  <p style={s.panel.clientName}>{b.clientName}</p>
                  <p style={s.panel.service}>{b.serviceName}</p>
                </div>
                <BadgeMini status={b.status} />
              </div>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <span style={s.panel.meta}>
                  <i className="fas fa-clock" style={{ marginRight: 4 }} />{b.time}
                </span>
                <span style={s.panel.meta}>
                  <i className="fas fa-envelope" style={{ marginRight: 4 }} />{b.clientEmail}
                </span>
                {b.venue && (
                  <span style={s.panel.meta}>
                    <i className="fas fa-map-marker-alt" style={{ marginRight: 4 }} />{b.venue}
                  </span>
                )}
                {conflictIds.has(b.id) && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#ef4444" }}>
                    ⚠ Time conflict
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
};

/* ── Month View ───────────────────────────────────────────────── */

const MonthView = ({ year, month, bookings, conflictIds, onDayClick }) => {
  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays  = new Date(year, month, 0).getDate();
  const today     = new Date();

  const cells = [];
  // Leading days from prev month
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: prevDays - i, current: false });
  // Current month
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, current: true });
  // Trailing days
  while (cells.length % 7 !== 0)
    cells.push({ day: cells.length - daysInMonth - firstDay + 1, current: false });

  const byDate = useMemo(() => {
    const m = {};
    bookings.forEach((b) => {
      if (!m[b.date]) m[b.date] = [];
      m[b.date].push(b);
    });
    return m;
  }, [bookings]);

  return (
    <div style={s.grid.wrapper}>
      {/* Day names header */}
      <div style={s.grid.dayNames}>
        {DAYS.map((d) => <div key={d} style={s.grid.dayName}>{d}</div>)}
      </div>

      {/* Cells */}
      <div style={s.grid.cells}>
        {cells.map(({ day, current }, idx) => {
          const dateStr   = current ? toDateStr(year, month, day) : null;
          const events    = dateStr ? (byDate[dateStr] ?? []) : [];
          const isToday   = current &&
            today.getFullYear() === year &&
            today.getMonth()    === month &&
            today.getDate()     === day;
          const hasConflict = events.some((b) => conflictIds.has(b.id));
          const visible = events.slice(0, 3);
          const more    = events.length - visible.length;

          return (
            <div
              key={idx}
              style={s.grid.cell(isToday, current, events.length > 0)}
              onClick={() => current && events.length > 0 && onDayClick(dateStr)}
              onMouseEnter={(e) => {
                if (current && events.length > 0)
                  e.currentTarget.style.background = "#f9f7ff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isToday ? "#f5f0ff" : "#fff";
              }}
            >
              <div style={s.grid.dateNum(isToday, current)}>{day}</div>
              {hasConflict && (
                <span style={{ fontSize: 9, color: "#ef4444", fontWeight: 700, display: "block", marginBottom: 2 }}>
                  ⚠ conflict
                </span>
              )}
              {visible.map((b) => (
                <div key={b.id} style={s.grid.eventPill(b.status)}>
                  <span style={s.grid.dot(b.status)} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                    {b.clientName}
                  </span>
                </div>
              ))}
              {more > 0 && <div style={s.grid.moreTag}>+{more} more</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Week View ────────────────────────────────────────────────── */

const WeekView = ({ year, month, weekStart, bookings, conflictIds, onDayClick }) => {
  const today = new Date();
  const days  = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const byDate = useMemo(() => {
    const m = {};
    bookings.forEach((b) => {
      if (!m[b.date]) m[b.date] = [];
      m[b.date].push(b);
    });
    return m;
  }, [bookings]);

  return (
    <div style={s.week.wrapper}>
      {/* Header */}
      <div style={s.week.header}>
        <div /> {/* time gutter */}
        {days.map((d, i) => {
          const isToday =
            d.getFullYear() === today.getFullYear() &&
            d.getMonth()    === today.getMonth() &&
            d.getDate()     === today.getDate();
          return (
            <div key={i} style={s.week.dayHeader(isToday)}>
              <div style={s.week.dayHeaderNum(isToday)}>{d.getDate()}</div>
              <div style={s.week.dayHeaderName}>{DAYS[d.getDay()]}</div>
            </div>
          );
        })}
      </div>

      {/* Body */}
      <div style={s.week.body}>
        {/* Time gutter */}
        <div style={s.week.timeCol}>
          {HOURS.map((h) => (
            <div key={h} style={s.week.timeSlot}>
              {h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`}
            </div>
          ))}
        </div>

        {/* Day columns */}
        {days.map((d, di) => {
          const isToday =
            d.getFullYear() === today.getFullYear() &&
            d.getMonth()    === today.getMonth() &&
            d.getDate()     === today.getDate();
          const ds      = toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
          const events  = byDate[ds] ?? [];

          return (
            <div key={di} style={s.week.dayCol(isToday)}>
              {HOURS.map((h) => <div key={h} style={s.week.hourCell} />)}

              {events.map((b) => {
                const hour = parseHour(b.time);
                if (hour === null || hour < HOURS[0] || hour > HOURS[HOURS.length - 1]) return null;
                const top  = (hour - HOURS[0]) * 56 + 4;
                const hasC = conflictIds.has(b.id);
                return (
                  <div
                    key={b.id}
                    style={{
                      ...s.week.eventBlock(b.status),
                      top,
                      height: 48,
                      outline: hasC ? "2px solid #ef4444" : "none",
                    }}
                    onClick={() => onDayClick(ds)}
                    title={`${b.clientName} — ${b.serviceName}`}
                  >
                    <div style={{ fontWeight: 800, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {b.clientName}
                    </div>
                    <div style={{ fontWeight: 500, opacity: 0.75, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                      {b.serviceName}
                    </div>
                    {hasC && <span style={{ fontSize: 9, color: "#ef4444" }}>⚠</span>}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main Component ───────────────────────────────────────────── */

const AdminCalendarView = ({ bookings }) => {
  const today = new Date();
  const [view,  setView]  = useState("month"); // "month" | "week"
  const [year,  setYear]  = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [panel, setPanel] = useState(null);   // dateStr of open day

  // Week: start from the Monday of the current week
  const weekStart = useMemo(() => {
    const d = new Date(year, month, 1);
    const day = d.getDay();
    d.setDate(d.getDate() - day); // Sunday-start
    return d;
  }, [year, month]);

  const conflictIds = useMemo(() => findConflicts(bookings), [bookings]);
  const conflictCount = conflictIds.size;

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const legend = [
    { label: "Approved",  color: "#22c55e" },
    { label: "Pending",   color: "#f59e0b" },
    { label: "Cancelled", color: "#ef4444" },
    { label: "Confirmed", color: "#6366f1" },
    { label: "Ongoing",   color: "#06b6d4" },
    { label: "Completed", color: "#8b5cf6" },
  ];

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={s.header.wrapper}>
        <h1 style={s.header.title}>Schedule Calendar</h1>
        <p style={s.header.subtitle}>Visual overview of all bookings and events</p>
      </div>

      {/* Conflict banner */}
      {conflictCount > 0 && (
        <div style={s.conflict.banner}>
          <i className="fas fa-exclamation-triangle" />
          <span>
            {conflictCount} booking{conflictCount !== 1 ? "s" : ""} have a time conflict — same date &amp; time slot
          </span>
        </div>
      )}

      {/* Navigation */}
      <div style={s.nav.wrapper}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            style={s.nav.arrowBtn}
            onClick={prevMonth}
            onMouseEnter={(e) => hover.arrowEnter(e.currentTarget)}
            onMouseLeave={(e) => hover.arrowLeave(e.currentTarget)}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <span style={s.nav.monthLabel}>{MONTHS[month]} {year}</span>
          <button
            style={s.nav.arrowBtn}
            onClick={nextMonth}
            onMouseEnter={(e) => hover.arrowEnter(e.currentTarget)}
            onMouseLeave={(e) => hover.arrowLeave(e.currentTarget)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>

        <div style={s.nav.viewToggle}>
          {["month", "week"].map((v) => (
            <button
              key={v}
              style={s.nav.viewBtn(view === v)}
              onClick={() => setView(v)}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={s.legend.wrapper}>
        {legend.map(({ label, color }) => (
          <div key={label} style={s.legend.item}>
            <span style={s.legend.dot(color)} />
            {label}
          </div>
        ))}
      </div>

      {/* Calendar */}
      {view === "month" ? (
        <MonthView
          year={year}
          month={month}
          bookings={bookings}
          conflictIds={conflictIds}
          onDayClick={setPanel}
        />
      ) : (
        <WeekView
          year={year}
          month={month}
          weekStart={weekStart}
          bookings={bookings}
          conflictIds={conflictIds}
          onDayClick={setPanel}
        />
      )}

      {/* Day detail drawer */}
      {panel && (
        <DayPanel
          dateStr={panel}
          bookings={bookings}
          conflictIds={conflictIds}
          onClose={() => setPanel(null)}
        />
      )}
    </div>
  );
};

export default AdminCalendarView;