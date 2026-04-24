import {purple} from './color.js';

export const styles = {

  header: {
    wrapper: { marginBottom: 36 },
    eyebrow: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 6,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: purple[400],
    },
    label: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "1.5px",
      color: purple[400],
      textTransform: "uppercase",
    },
    title: {
      margin: 0,
      fontSize: 28,
      fontWeight: 700,
      color: purple[900],
      letterSpacing: "-0.8px",
    },
    date: {
      margin: "4px 0 0",
      color: "#aaa",
      fontSize: 13,
      fontWeight: 400,
    },
  },

  grid: {
    stat: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: 12,
      marginBottom: 20,
    },
    charts: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: 12,
      marginBottom: 20,
    },
  },

  card: {
    base: {
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${purple[50]}`,
      padding: "24px 20px",
    },
    dark: {
      background: purple[900],
      borderRadius: 16,
      border: "none",
      padding: "24px 20px",
    },
    noPadding: {
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${purple[50]}`,
      padding: 0,
      overflow: "hidden",
    },
  },

  statCard: {
    label: (isDark) => ({
      margin: "0 0 12px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.8px",
      textTransform: "uppercase",
      color: isDark ? purple[200] : "#aaa",
    }),
    value: (isDark) => ({
      margin: 0,
      fontSize: 42,
      fontWeight: 900,
      color: isDark ? "#fff" : purple[900],
      letterSpacing: "-2px",
      lineHeight: 1,
    }),
  },

  cardHeader: {
    eyebrow: {
      margin: "0 0 4px",
      fontSize: 11,
      fontWeight: 700,
      color: "#aaa",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    title: {
      margin: "0 0 20px",
      fontSize: 20,
      fontWeight: 900,
      color: purple[900],
      letterSpacing: "-0.5px",
    },
  },

  bar: {
    wrapper: { display: "flex", alignItems: "flex-end", gap: 5, height: 64 },
    col: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 },
    fill: (isToday) => ({
      width: "100%",
      borderRadius: "3px 3px 0 0",
      background: isToday ? purple[400] : purple[100],
      minHeight: 4,
      transition: "height 0.4s ease",
    }),
    label: (isToday) => ({
      fontSize: 10,
      color: isToday ? purple[600] : "#ccc",
      fontWeight: isToday ? 700 : 400,
    }),
  },

  miniBar: {
    wrapper: { marginBottom: 14 },
    row: { display: "flex", justifyContent: "space-between", marginBottom: 6 },
    label: { fontSize: 12, color: "#888", fontWeight: 500 },
    value: { fontSize: 12, fontWeight: 700, color: purple[800] },
    track: { height: 3, background: purple[50], borderRadius: 99, overflow: "hidden" },
    fill: (pct) => ({
      height: "100%",
      borderRadius: 99,
      width: `${pct}%`,
      background: purple[400],
      transition: "width 0.6s ease",
    }),
  },

  recentHeader: {
    wrapper: {
      padding: "20px 24px 18px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    eyebrow: {
      margin: "0 0 2px",
      fontSize: 11,
      fontWeight: 700,
      color: "#aaa",
      letterSpacing: "1px",
      textTransform: "uppercase",
    },
    title: {
      margin: 0,
      fontSize: 18,
      fontWeight: 900,
      color: purple[900],
      letterSpacing: "-0.5px",
    },
    badge: {
      fontSize: 11,
      fontWeight: 700,
      color: purple[400],
      background: purple[50],
      padding: "4px 10px",
      borderRadius: 999,
      letterSpacing: "0.3px",
    },
  },

  table: {
    th: {
      textAlign: "left",
      fontSize: 10,
      fontWeight: 700,
      color: "#bbb",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      padding: "10px 24px",
      background: "#FAFAFF",
    },
    tdClient: { padding: "14px 24px" },
    tdService: { fontSize: 13, color: "#888", padding: "14px 10px" },
    tdDate: { fontSize: 12, color: "#bbb", padding: "14px 10px", fontVariantNumeric: "tabular-nums" },
    tdStatus: { padding: "14px 10px" },
    clientName: { fontSize: 13, fontWeight: 600, color: purple[900] },
    clientCell: { display: "flex", alignItems: "center", gap: 10 },
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    background: purple[50],
    color: purple[600],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 800,
    flexShrink: 0,
    border: `1px solid ${purple[100]}`,
    letterSpacing: "0.5px",
  },

  statusBadge: {
    base: {
      padding: "3px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.4px",
      textTransform: "uppercase",
    },
    variants: {
      pending:   { background: "#FEF9C3", color: "#854D0E" },
      approved:  { background: "#DCFCE7", color: "#166534" },
      cancelled: { background: "#FFE4E6", color: "#9F1239" },
    },
  },

  divider: {
    height: "1px",
    background: purple[50],
    margin: 0,
  },
};

export const hoverCard = {
  enter: (el) => {
    el.style.transform = "translateY(-2px)";
    el.style.boxShadow = `0 8px 28px ${purple[50]}`;
  },
  leave: (el) => {
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  },
};

export const hoverRow = {
  enter: (el) => { el.style.background = purple[50]; },
  leave: (el) => { el.style.background = "transparent"; },
};