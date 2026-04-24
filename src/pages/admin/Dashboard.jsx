import { useMemo } from "react";
import { styles, hoverCard, hoverRow } from "./styles/dashboard.js";


const StatusBadge = ({ status }) => {
  const { base, variants } = styles.statusBadge;
  const variant = variants[status] ?? variants.pending;
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span style={{ ...base, ...variant }}>{label}</span>;
};

const Avatar = ({ name }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return <div style={styles.avatar}>{initials}</div>;
};

const MiniBar = ({ label, value, max }) => {
  const pct = max ? (value / max) * 100 : 0;
  const s = styles.miniBar;
  return (
    <div style={s.wrapper}>
      <div style={s.row}>
        <span style={s.label}>{label}</span>
        <span style={s.value}>{value}</span>
      </div>
      <div style={s.track}>
        <div style={s.fill(pct)} />
      </div>
    </div>
  );
};

const Divider = () => <div style={styles.divider} />;

/* ── Main component ───────────────────────────────────────────── */

export default function AdminDashboard({ bookings }) {
  const today    = new Date();
  const todayStr = today.toISOString().split("T")[0];

  const todayBk  = bookings.filter(b => b.date === todayStr).length;
  const pending   = bookings.filter(b => b.status === "pending").length;
  const approved  = bookings.filter(b => b.status === "approved").length;
  const cancelled = bookings.filter(b => b.status === "cancelled").length;
  const recent    = [...bookings].sort((a, b) => b.id - a.id).slice(0, 6);

  const last7 = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() - (6 - i));
      const ds = d.toISOString().split("T")[0];
      return {
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        count: bookings.filter(b => b.date === ds).length,
      };
    });
  }, [bookings]);

  const maxDay = Math.max(...last7.map(d => d.count), 1);

  const topServices = useMemo(() => {
    const counts = {};
    bookings.forEach(b => { counts[b.serviceName] = (counts[b.serviceName] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  }, [bookings]);

  const maxSvc = topServices[0]?.[1] || 1;

  const statCards = [
    { label: "Total Events Booked", value: bookings.length, icon: "fa-calendar-check" },
    { label: "Today's Events",      value: todayBk,         icon: "fa-calendar-day" },
    { label: "Pending Requests",    value: pending,         icon: "fa-hourglass-half" },
    { label: "Cancelled Events",    value: cancelled,       icon: "fa-calendar-times" },
  ];
  return (
    <div style={styles.page}>
   
      {/* Header */}
      <div style={styles.header.wrapper}>
        <h1 style={styles.header.title}>Dashboard</h1>
        <p style={styles.header.date}>
          {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      {/* Stat Cards */}
      <div style={styles.grid.stat}>
        {statCards.map((s, i) => {
          const isDark = i === 0;
          return (
            <div
              key={s.label}
              style={isDark ? styles.card.dark : styles.card.base}
              onMouseEnter={e => hoverCard.enter(e.currentTarget)}
              onMouseLeave={e => hoverCard.leave(e.currentTarget)}
            >
              <i className={`fas ${s.icon}`} style={{
                fontSize: 13,
                marginBottom: 14,
                display: "block",
                color: isDark ? "rgba(255,255,255,0.4)" : "#ccc",
              }} />
              <p style={styles.statCard.label(isDark)}>{s.label}</p>
              <p style={styles.statCard.value(isDark)}>{s.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div style={styles.grid.charts}>
        {/* 7-day bar chart */}
        <div style={styles.card.base}>
       <p style={styles.cardHeader.eyebrow}>Event Activity</p>
        <p style={styles.cardHeader.title}>{bookings.length} total bookings</p>
          <div style={styles.bar.wrapper}>
            {last7.map((d, i) => {
              const isToday = i === 6;
              return (
                <div key={i} style={styles.bar.col}>
                  <div style={{ ...styles.bar.fill(isToday), height: `${(d.count / maxDay) * 52 + 4}px` }} />
                  <span style={styles.bar.label(isToday)}>{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status breakdown */}
        <div style={styles.card.base}>
          <p style={styles.cardHeader.eyebrow}>Booking Status</p>
          <p style={styles.cardHeader.title}>
            {bookings.length > 0 
              ? `${Math.round((approved / bookings.length) * 100)}% confirmed`
              : "No data"}
          </p>

          <MiniBar label="Confirmed" value={approved} max={bookings.length} />
          <MiniBar label="Pending Approval" value={pending} max={bookings.length} />
          <MiniBar label="Cancelled" value={cancelled} max={bookings.length} />
                  </div>

        {/* Popular services */}
        <div style={styles.card.base}>
       <p style={styles.cardHeader.eyebrow}>Top</p>
      <p style={styles.cardHeader.title}>Event Types</p>
          {topServices.length === 0
            ? <p style={{ fontSize: 13, color: "#ccc" }}>No data yet</p>
            : topServices.map(([name, count]) => (
                <MiniBar key={name} label={name} value={count} max={maxSvc} />
              ))
          }
        </div>
      </div>

      {/* Recent Bookings */}
      <div style={styles.card.noPadding}>
        <div style={styles.recentHeader.wrapper}>
          <div>
          <p style={styles.recentHeader.eyebrow}>Recent Activity</p>
          <p style={styles.recentHeader.title}>Event Bookings</p>
          </div>
          <span style={styles.recentHeader.badge}>{bookings.length} total</span>
        </div>

        <Divider />

        {recent.length === 0 ? (
          <p style={{ fontSize: 13, color: "#ccc", textAlign: "center", padding: "40px 0", margin: 0 }}>
            No bookings yet
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr>
              {["Client", "Event Type", "Schedule", "Status"].map(h => (
                    <th key={h} style={styles.table.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map(b => (
                  <tr
                    key={b.id}
                    style={{ borderTop: "1px solid #EEEDFE", transition: "background 0.15s" }}
                    onMouseEnter={e => hoverRow.enter(e.currentTarget)}
                    onMouseLeave={e => hoverRow.leave(e.currentTarget)}
                  >
                    <td style={styles.table.tdClient}>
                      <div style={styles.table.clientCell}>
                        <Avatar name={b.clientName} />
                        <span style={styles.table.clientName}>{b.clientName}</span>
                      </div>
                    </td>
                    <td style={styles.table.tdService}>{b.serviceName}</td>
                    <td style={styles.table.tdDate}>{b.date} · {b.time}</td>
                    <td style={styles.table.tdStatus}><StatusBadge status={b.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 640px) {
          th:nth-child(2), td:nth-child(2),
          th:nth-child(3), td:nth-child(3) { display: none; }
        }
      `}</style>
    </div>
  );
}