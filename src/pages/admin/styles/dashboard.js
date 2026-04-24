import { purple, emerald, rose, amber, sky } from './color.js';
import './font.css'

export const styles = {


  header: {
    wrapper: { marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 },
    left: {},
    eyebrow: {
      display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
    },
    dot: {
      width: 7, height: 7, borderRadius: "50%", background: purple[500],
    },
    label: {
      fontSize: 11, fontWeight: 700, letterSpacing: "1.8px",
      color: purple[500], textTransform: "uppercase",
    },
    title: {
      margin: 0, fontSize: 30, fontWeight: 800,
      color: purple[900], letterSpacing: "-1px",
    },
    date: {
      margin: "4px 0 0", color: "#9CA3AF", fontSize: 13, fontWeight: 400,
    },
  },

  grid: {
    stat: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 14,
      marginBottom: 20,
    },
    charts: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 14,
      marginBottom: 20,
    },
    bottom: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14,
      marginBottom: 20,
    },
  },

  card: {
    base: {
      background: "#fff",
      borderRadius: 20,
      border: "1px solid #EEEBFF",
      padding: "22px 20px",
      transition: "transform 0.18s, box-shadow 0.18s",
    },
    dark: {
      background: purple[900],
      borderRadius: 20,
      border: "none",
      padding: "22px 20px",
      transition: "transform 0.18s, box-shadow 0.18s",
      position: "relative",
      overflow: "hidden",
    },
    success: {
      background: emerald[50],
      borderRadius: 20,
      border: `1px solid ${emerald[100]}`,
      padding: "22px 20px",
      transition: "transform 0.18s, box-shadow 0.18s",
    },
    warning: {
      background: amber[50],
      borderRadius: 20,
      border: `1px solid ${amber[100]}`,
      padding: "22px 20px",
      transition: "transform 0.18s, box-shadow 0.18s",
    },
    danger: {
      background: rose[50],
      borderRadius: 20,
      border: `1px solid ${rose[100]}`,
      padding: "22px 20px",
      transition: "transform 0.18s, box-shadow 0.18s",
    },
    noPadding: {
      background: "#fff",
      borderRadius: 20,
      border: "1px solid #EEEBFF",
      padding: 0,
      overflow: "hidden",
    },
  },

  statCard: {
    iconBox: (variant) => {
      const map = {
        dark:    { bg: "rgba(255,255,255,0.12)", color: "#fff" },
        success: { bg: emerald[100],             color: emerald[600] },
        warning: { bg: amber[100],               color: amber[600] },
        danger:  { bg: rose[100],                color: rose[600] },
      };
      const v = map[variant] || map.dark;
      return {
        width: 38, height: 38, borderRadius: 10,
        background: v.bg, color: v.color,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 15, marginBottom: 16, flexShrink: 0,
      };
    },
    label: (variant) => ({
      margin: "0 0 6px",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.8px",
      textTransform: "uppercase",
      color: variant === "dark" ? "rgba(255,255,255,0.55)"
           : variant === "success" ? emerald[600]
           : variant === "warning" ? amber[600]
           : variant === "danger"  ? rose[600]
           : "#9CA3AF",
    }),
    value: (variant) => ({
      margin: 0, fontSize: 40, fontWeight: 900,
      color: variant === "dark" ? "#fff"
           : variant === "success" ? emerald[800]
           : variant === "warning" ? amber[600]
           : variant === "danger"  ? rose[600]
           : purple[900],
      letterSpacing: "-2px", lineHeight: 1,
    }),
    sub: (variant) => ({
      margin: "6px 0 0", fontSize: 11, fontWeight: 500,
      color: variant === "dark" ? "rgba(255,255,255,0.4)"
           : "#BBC0CC",
    }),
  },

  cardHeader: {
    eyebrow: {
      margin: "0 0 3px", fontSize: 10, fontWeight: 700,
      color: "#BBC0CC", letterSpacing: "1.2px", textTransform: "uppercase",
    },
    title: {
      margin: "0 0 18px", fontSize: 18, fontWeight: 800,
      color: purple[900], letterSpacing: "-0.5px",
    },
    row: {
      display: "flex", justifyContent: "space-between",
      alignItems: "center", marginBottom: 18,
    },
    titleOnly: {
      margin: 0, fontSize: 18, fontWeight: 800,
      color: purple[900], letterSpacing: "-0.5px",
    },
  },

  filterPill: {
    wrapper: { display: "flex", gap: 4 },
    pill: (active) => ({
      fontSize: 11, fontWeight: 700, padding: "4px 11px",
      borderRadius: 999, cursor: "pointer", letterSpacing: "0.3px",
      border: "none", outline: "none", transition: "all 0.15s",
      background: active ? purple[500] : purple[50],
      color: active ? "#fff" : purple[600],
    }),
  },

  // Bar chart
  bar: {
    wrapper: { display: "flex", alignItems: "flex-end", gap: 6, height: 80 },
    col: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
    fill: (isToday) => ({
      width: "100%", borderRadius: "4px 4px 0 0",
      background: isToday
        ? `linear-gradient(180deg, ${purple[400]}, ${purple[600]})`
        : purple[100],
      minHeight: 4, transition: "height 0.5s ease",
    }),
    label: (isToday) => ({
      fontSize: 10,
      color: isToday ? purple[600] : "#CCC",
      fontWeight: isToday ? 700 : 400,
    }),
  },

  // Mini bar (horizontal)
  miniBar: {
    wrapper: { marginBottom: 12 },
    row: { display: "flex", justifyContent: "space-between", marginBottom: 5 },
    label: { fontSize: 12, color: "#6B7280", fontWeight: 500 },
    value: { fontSize: 12, fontWeight: 700, color: purple[800] },
    track: { height: 4, background: purple[50], borderRadius: 99, overflow: "hidden" },
    fill: (pct, color) => ({
      height: "100%", borderRadius: 99,
      width: `${pct}%`,
      background: color || purple[400],
      transition: "width 0.7s ease",
    }),
  },

  // Pie / donut
  donut: {
    wrapper: { display: "flex", alignItems: "center", gap: 20 },
    legend: { flex: 1 },
    legendItem: {
      display: "flex", alignItems: "center",
      gap: 8, marginBottom: 10,
    },
    legendDot: (color) => ({
      width: 9, height: 9, borderRadius: "50%",
      background: color, flexShrink: 0,
    }),
    legendLabel: { fontSize: 12, color: "#6B7280", fontWeight: 500 },
    legendValue: { fontSize: 12, fontWeight: 700, color: purple[900], marginLeft: "auto" },
  },

  // Recent bookings table
  recentHeader: {
    wrapper: {
      padding: "20px 24px 16px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    },
    eyebrow: {
      margin: "0 0 2px", fontSize: 10, fontWeight: 700,
      color: "#BBC0CC", letterSpacing: "1.2px", textTransform: "uppercase",
    },
    title: {
      margin: 0, fontSize: 18, fontWeight: 800,
      color: purple[900], letterSpacing: "-0.5px",
    },
    badge: {
      fontSize: 11, fontWeight: 700, color: purple[500],
      background: purple[50], padding: "4px 12px",
      borderRadius: 999, letterSpacing: "0.3px",
    },
  },

  table: {
    th: {
      textAlign: "left", fontSize: 10, fontWeight: 700,
      color: "#C4C9D4", textTransform: "uppercase",
      letterSpacing: "0.8px", padding: "10px 20px",
      background: "#FAFAFF",
    },
    tdClient:  { padding: "13px 20px" },
    tdService: { fontSize: 13, color: "#6B7280", padding: "13px 10px" },
    tdDate:    { fontSize: 12, color: "#9CA3AF", padding: "13px 10px", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" },
    tdStatus:  { padding: "13px 10px" },
    tdAmt:     { fontSize: 13, fontWeight: 700, color: purple[800], padding: "13px 20px", textAlign: "right", fontVariantNumeric: "tabular-nums" },
    clientName: { fontSize: 13, fontWeight: 600, color: purple[900] },
    clientCell: { display: "flex", alignItems: "center", gap: 10 },
  },

  avatar: (size = 34) => ({
    width: size, height: size, borderRadius: "50%",
    background: purple[50], color: purple[600],
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size < 34 ? 10 : 11, fontWeight: 800,
    flexShrink: 0, border: `1px solid ${purple[100]}`,
    letterSpacing: "0.5px",
  }),

  statusBadge: {
    base: {
      padding: "3px 10px", borderRadius: 999,
      fontSize: 11, fontWeight: 700,
      letterSpacing: "0.4px", textTransform: "uppercase",
      display: "inline-flex", alignItems: "center", gap: 5,
    },
    variants: {
      pending:   { background: amber[100],   color: amber[600] },
      approved:  { background: emerald[100], color: emerald[600] },
      cancelled: { background: rose[100],    color: rose[600] },
    },
    dot: (status) => ({
      width: 5, height: 5, borderRadius: "50%",
      background: status === "approved" ? emerald[400]
                : status === "cancelled" ? rose[400]
                : amber[400],
    }),
  },

  // Top clients card
  clientRank: {
    item: {
      display: "flex", alignItems: "center",
      gap: 12, padding: "10px 0",
      borderBottom: "1px solid #F3F0FF",
    },
    rank: {
      fontSize: 12, fontWeight: 800, color: "#D1C9F0",
      width: 20, textAlign: "center", flexShrink: 0,
    },
    name: { fontSize: 13, fontWeight: 600, color: purple[900] },
    sub:  { fontSize: 11, color: "#9CA3AF", marginTop: 1 },
    right: { marginLeft: "auto", textAlign: "right" },
    count: { fontSize: 14, fontWeight: 800, color: purple[700] },
    label: { fontSize: 10, color: "#9CA3AF", fontWeight: 500 },
  },

  divider: { height: 1, background: "#F3F0FF", margin: 0 },
};

export const hoverCard = {
  enter: (el) => {
    el.style.transform = "translateY(-2px)";
    el.style.boxShadow = "0 10px 32px rgba(124,92,252,0.10)";
  },
  leave: (el) => {
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  },
};

export const hoverRow = {
  enter: (el) => { el.style.background = "#FAFAFF"; },
  leave: (el) => { el.style.background = "transparent"; },
};