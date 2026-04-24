import { useMemo, useState } from "react";
import { styles, hoverCard, hoverRow } from "./styles/dashboard.js";
import { purple, emerald, rose, amber } from "./styles/color.js";

/* ── Small reusable atoms ──────────────────────────────────────── */

const StatusBadge = ({ status }) => {
  const { base, variants, dot } = styles.statusBadge;
  const variant = variants[status] ?? variants.pending;
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span style={{ ...base, ...variant }}>
      <span style={dot(status)} />
      {label}
    </span>
  );
};

const Avatar = ({ name, size = 34 }) => {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return <div style={styles.avatar(size)}>{initials}</div>;
};

const MiniBar = ({ label, value, max, color }) => {
  const pct = max ? (value / max) * 100 : 0;
  const s = styles.miniBar;
  return (
    <div style={s.wrapper}>
      <div style={s.row}>
        <span style={s.label}>{label}</span>
        <span style={s.value}>{value}</span>
      </div>
      <div style={s.track}>
        <div style={s.fill(pct, color)} />
      </div>
    </div>
  );
};

const Divider = () => <div style={styles.divider} />;

/* ── Donut / Pie chart (pure SVG) ──────────────────────────────── */
const DonutChart = ({ data, size = 120 }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = 44, cx = 60, cy = 60, stroke = 14;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const slices = data.map(d => {
    const pct = d.value / total;
    const dash = pct * circumference;
    const gap  = circumference - dash;
    const slice = { ...d, dash, gap, offset };
    offset += dash;
    return slice;
  });

  return (
    <div style={styles.donut.wrapper}>
      <svg width={size} height={size} viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
        {/* track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F3F0FF" strokeWidth={stroke} />
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={circumference / 4 - s.offset}
            strokeLinecap="butt"
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        ))}
        {/* center label */}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="900" fill={purple[900]}>
          {total}
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="9" fill="#9CA3AF" fontWeight="600" letterSpacing="0.5">
          TOTAL
        </text>
      </svg>

      <div style={styles.donut.legend}>
        {data.map((d, i) => (
          <div key={i} style={styles.donut.legendItem}>
            <span style={styles.donut.legendDot(d.color)} />
            <span style={styles.donut.legendLabel}>{d.label}</span>
            <span style={styles.donut.legendValue}>{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Bar chart ─────────────────────────────────────────────────── */
const BarChart = ({ data, maxVal, todayIndex }) => (
  <div style={styles.bar.wrapper}>
    {data.map((d, i) => {
      const isToday = i === todayIndex;
      return (
        <div key={i} style={styles.bar.col}>
          <div style={{ ...styles.bar.fill(isToday), height: `${(d.count / maxVal) * 68 + 4}px` }} />
          <span style={styles.bar.label(isToday)}>{d.label}</span>
        </div>
      );
    })}
  </div>
);

/* ── FilterPill ────────────────────────────────────────────────── */
const FilterPill = ({ options, value, onChange }) => (
  <div style={styles.filterPill.wrapper}>
    {options.map(o => (
      <button
        key={o.value}
        style={styles.filterPill.pill(value === o.value)}
        onClick={() => onChange(o.value)}
      >
        {o.label}
      </button>
    ))}
  </div>
);

/* ── Stat card ─────────────────────────────────────────────────── */
const StatCard = ({ label, value, icon, variant, sub }) => (
  <div
    style={styles.card[variant] || styles.card.base}
    onMouseEnter={e => hoverCard.enter(e.currentTarget)}
    onMouseLeave={e => hoverCard.leave(e.currentTarget)}
  >
    <div style={styles.statCard.iconBox(variant)}>
      <i className={`fas ${icon}`} />
    </div>
    <p style={styles.statCard.label(variant)}>{label}</p>
    <p style={styles.statCard.value(variant)}>{value}</p>
    {sub && <p style={styles.statCard.sub(variant)}>{sub}</p>}
  </div>
);

/* ── Main component ────────────────────────────────────────────── */
export default function AdminDashboard({ bookings }) {
  const today    = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const [clientFilter, setClientFilter] = useState("week");

  /* ── Aggregates ── */
  const totalBk   = bookings.length;
  const todayBk   = bookings.filter(b => b.date === todayStr).length;
  const pending   = bookings.filter(b => b.status === "pending").length;
  const approved  = bookings.filter(b => b.status === "approved").length;
  const cancelled = bookings.filter(b => b.status === "cancelled").length;
  const recent    = [...bookings].sort((a, b) => b.id - a.id).slice(0, 8);

  /* ── Monthly revenue / event count trend ── */
  const monthlyTrend = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(today.getFullYear(), today.getMonth() - (5 - i), 1);
      const label = d.toLocaleDateString("en-US", { month: "short" });
      const monthStr = d.toISOString().slice(0, 7); // YYYY-MM
      const count = bookings.filter(b => b.date?.startsWith(monthStr)).length;
      return { label, count };
    });
  }, [bookings]);
  const maxMonth = Math.max(...monthlyTrend.map(d => d.count), 1);

  /* ── Last-7-days bar ── */
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

  /* ── Top services ── */
  const topServices = useMemo(() => {
    const counts = {};
    bookings.forEach(b => { counts[b.serviceName] = (counts[b.serviceName] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [bookings]);
  const maxSvc = topServices[0]?.[1] || 1;

  /* ── Top clients by filter ── */
  const topClients = useMemo(() => {
    const now = new Date();
    const filtered = bookings.filter(b => {
      if (!b.date) return false;
      const bd = new Date(b.date);
      if (clientFilter === "week") {
        const cutoff = new Date(now);
        cutoff.setDate(cutoff.getDate() - 7);
        return bd >= cutoff;
      } else {
        return bd.getFullYear() === now.getFullYear() && bd.getMonth() === now.getMonth();
      }
    });
    const counts = {};
    filtered.forEach(b => {
      if (!counts[b.clientName]) counts[b.clientName] = { count: 0 };
      counts[b.clientName].count += 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 5)
      .map(([name, d]) => ({ name, ...d }));
  }, [bookings, clientFilter]);

  /* ── Donut data ── */
  const donutData = [
    { label: "Confirmed",  value: approved,  color: emerald[400] },
    { label: "Pending",    value: pending,   color: amber[400] },
    { label: "Cancelled",  value: cancelled, color: rose[400] },
  ];

  /* ── Stats sub text ── */
  const approvedPct = totalBk > 0 ? `${Math.round((approved / totalBk) * 100)}% success rate` : "No data";
  const pendingPct  = totalBk > 0 ? `${Math.round((pending  / totalBk) * 100)}% awaiting approval` : "No data";
  const cancelPct   = totalBk > 0 ? `${Math.round((cancelled / totalBk) * 100)}% of all bookings` : "No data";

  return (
    <div style={styles.page}>
      {/* ── Header ── */}
      <div style={styles.header.wrapper}>
        <div style={styles.header.left}>
          <div style={styles.header.eyebrow}>
            <span style={styles.header.label}>ADMIN</span>
          </div>
          <h1 style={styles.header.title}>Dashboard</h1>
          <p style={styles.header.date}>
            {today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div style={styles.grid.stat}>
        <StatCard label="Total Bookings"    value={totalBk}   icon="fa-calendar-check" variant="dark"    sub={`${todayBk} booked today`} />
        <StatCard label="Confirmed Events"  value={approved}  icon="fa-check-circle"   variant="success" sub={approvedPct} />
        <StatCard label="Pending Requests"  value={pending}   icon="fa-hourglass-half" variant="warning" sub={pendingPct} />
        <StatCard label="Cancelled Events"  value={cancelled} icon="fa-times-circle"   variant="danger"  sub={cancelPct} />
      </div>

      {/* ── Charts Row ── */}
      <div style={styles.grid.charts}>

        {/* Weekly bar chart */}
        <div
          style={styles.card.base}
          onMouseEnter={e => hoverCard.enter(e.currentTarget)}
          onMouseLeave={e => hoverCard.leave(e.currentTarget)}
        >
          <p style={styles.cardHeader.eyebrow}>This Week</p>
          <p style={styles.cardHeader.title}>Daily Bookings</p>
          <BarChart data={last7} maxVal={maxDay} todayIndex={6} />
        </div>

        {/* Monthly bar chart */}
        <div
          style={styles.card.base}
          onMouseEnter={e => hoverCard.enter(e.currentTarget)}
          onMouseLeave={e => hoverCard.leave(e.currentTarget)}
        >
          <p style={styles.cardHeader.eyebrow}>6-Month Trend</p>
          <p style={styles.cardHeader.title}>Monthly Activity</p>
          <BarChart data={monthlyTrend} maxVal={maxMonth} todayIndex={5} />
        </div>

        {/* Donut / Pie chart */}
        <div
          style={styles.card.base}
          onMouseEnter={e => hoverCard.enter(e.currentTarget)}
          onMouseLeave={e => hoverCard.leave(e.currentTarget)}
        >
          <p style={styles.cardHeader.eyebrow}>Overview</p>
          <p style={styles.cardHeader.title}>Booking Status</p>
          <DonutChart data={donutData} size={120} />
        </div>
      </div>

      {/* ── Bottom row: Top Clients + Top Services ── */}
      <div style={{ ...styles.grid.bottom, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>

        {/* Top Clients */}
        <div
          style={styles.card.base}
          onMouseEnter={e => hoverCard.enter(e.currentTarget)}
          onMouseLeave={e => hoverCard.leave(e.currentTarget)}
        >
          <div style={styles.cardHeader.row}>
            <div>
              <p style={styles.cardHeader.eyebrow}>Leaderboard</p>
              <p style={styles.cardHeader.titleOnly}>Top Clients</p>
            </div>
            <FilterPill
              options={[{ label: "Week", value: "week" }, { label: "Month", value: "month" }]}
              value={clientFilter}
              onChange={setClientFilter}
            />
          </div>

          {topClients.length === 0 ? (
            <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>No data for this period</p>
          ) : (
            topClients.map((c, i) => (
              <div key={c.name} style={{
                ...styles.clientRank.item,
                borderBottom: i === topClients.length - 1 ? "none" : "1px solid #F3F0FF",
              }}>
                <span style={styles.clientRank.rank}>#{i + 1}</span>
                <Avatar name={c.name} size={32} />
                <div>
                  <p style={styles.clientRank.name}>{c.name}</p>
                </div>
                <div style={styles.clientRank.right}>
                  <p style={styles.clientRank.count}>{c.count}</p>
                  <p style={styles.clientRank.label}>booking{c.count !== 1 ? "s" : ""}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Top Services / Event Types */}
        <div
          style={styles.card.base}
          onMouseEnter={e => hoverCard.enter(e.currentTarget)}
          onMouseLeave={e => hoverCard.leave(e.currentTarget)}
        >
          <p style={styles.cardHeader.eyebrow}>Popular</p>
          <p style={styles.cardHeader.title}>Event Types</p>
          {topServices.length === 0
            ? <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>No data yet</p>
            : topServices.map(([name, count], i) => {
                const colors = [purple[400], emerald[400], amber[400], rose[400], "#38BDF8"];
                return (
                  <MiniBar key={name} label={name} value={count} max={maxSvc} color={colors[i % colors.length]} />
                );
              })
          }
        </div>
      </div>

      {/* ── Recent Bookings ── */}
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
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                    style={{ borderTop: "1px solid #F3F0FF", transition: "background 0.15s" }}
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

 
    </div>
  );
}