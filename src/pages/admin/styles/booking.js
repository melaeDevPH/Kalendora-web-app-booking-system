import { purple } from "./color";
import './font.css';

export const bookingStyles = {

  page: {
    padding: "32px 28px",
    maxWidth: 1280,
    margin: "0 auto",
    minHeight: "100vh",
  },

  header: {
    wrapper: { marginBottom: 24 },
    title: {
      margin: "0 0 4px",
      fontSize: "clamp(22px, 5vw, 28px)",
      fontWeight: 900,
      color: purple[900],
      letterSpacing: "-0.8px",
    },
    subtitle: {
      margin: 0,
      color: "#aaa",
      fontSize: 13,
    },
  },

  // ── Upcoming alerts ──────────────────────────────────────────
  alert: {
    wrapper: {
      marginBottom: 20,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      background: "#FFF7ED",
      border: "1px solid #FED7AA",
      borderRadius: 12,
      padding: "12px 16px",
      fontSize: 13,
    },
    iconBox: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "#FED7AA",
      color: "#C2410C",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      flexShrink: 0,
    },
    text: {
      flex: 1,
    },
    bold: {
      fontWeight: 700,
      color: "#9A3412",
      marginRight: 4,
    },
    sub: {
      color: "#C2410C",
      fontSize: 12,
    },
    dismiss: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#FDA974",
      fontSize: 13,
      padding: 4,
      borderRadius: 6,
      transition: "color 0.15s",
      flexShrink: 0,
    },
    badge: {
      fontSize: 10,
      fontWeight: 700,
      background: "#C2410C",
      color: "#fff",
      borderRadius: 999,
      padding: "2px 7px",
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      marginLeft: 6,
      flexShrink: 0,
    },
  },

  // ── Status summary strip ──────────────────────────────────────
  strip: {
    wrapper: {
      display: "flex",
      gap: 8,
      marginBottom: 20,
      flexWrap: "wrap",
    },
    pill: (active, color) => ({
      display: "flex",
      alignItems: "center",
      gap: 7,
      padding: "8px 16px",
      borderRadius: 999,
      border: `1.5px solid ${active ? color.border : "#E8E4FF"}`,
      background: active ? color.bg : "#fff",
      color: active ? color.text : "#888",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      letterSpacing: "0.2px",
      transition: "all 0.15s",
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }),
    dot: (color) => ({
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: color,
      flexShrink: 0,
    }),
    count: (active) => ({
      fontSize: 11,
      fontWeight: 800,
      opacity: active ? 1 : 0.5,
    }),
  },

  // ── Filters row ───────────────────────────────────────────────
  filters: {
    wrapper: {
      display: "flex",
      gap: 10,
      marginBottom: 20,
      flexWrap: "wrap",
      alignItems: "center",
    },
    input: {
      flex: "1 1 200px",
      minWidth: 160,
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      background: "#fff",
      outline: "none",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: purple[900],
      transition: "border-color 0.2s",
    },
    select: {
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      background: "#fff",
      cursor: "pointer",
      outline: "none",
      fontWeight: 500,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: purple[900],
      transition: "border-color 0.2s",
    },
    sortBtn: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: 6,
      border: `1.5px solid ${active ? purple[400] : purple[100]}`,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 12,
      fontWeight: 700,
      background: active ? purple[50] : "#fff",
      color: active ? purple[600] : "#aaa",
      cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      transition: "all 0.15s",
      whiteSpace: "nowrap",
    }),
  },

  empty: {
    wrapper: {
      textAlign: "center",
      padding: "64px 24px",
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${purple[50]}`,
    },
    title: {
      fontWeight: 700,
      color: purple[900],
      margin: "0 0 6px",
      fontSize: 15,
    },
    sub: {
      color: "#bbb",
      fontSize: 13,
      margin: 0,
    },
  },

  // Desktop table
  table: {
    wrapper: {
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${purple[50]}`,
      overflow: "hidden",
    },
    th: {
      padding: "14px 18px",
      textAlign: "left",
      fontSize: 10,
      fontWeight: 700,
      color: "#bbb",
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      background: "#FAFAFF",
    },
    tdName: {
      padding: "14px 18px",
      fontSize: 13,
      fontWeight: 600,
      color: purple[900],
    },
    tdEmail: {
      fontSize: 11,
      color: "#bbb",
      fontWeight: 400,
      marginTop: 2,
    },
    tdService: {
      padding: "14px 18px",
      fontSize: 13,
      color: "#888",
    },
    tdDate: {
      padding: "14px 18px",
      fontSize: 12,
      color: "#888",
    },
    tdDateSub: {
      color: "#bbb",
      marginTop: 2,
    },
    tdStatus:  { padding: "14px 18px" },
    tdActions: { padding: "14px 18px" },
    actionRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  },

  // Mobile card
  card: {
    wrapper: {
      background: "#fff",
      borderRadius: 14,
      border: `1px solid ${purple[50]}`,
      padding: 18,
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    topRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    name: {
      margin: "0 0 3px",
      fontSize: 14,
      fontWeight: 700,
      color: purple[900],
    },
    email: {
      margin: 0,
      fontSize: 11,
      color: "#bbb",
    },
    body: {
      marginBottom: 12,
      paddingBottom: 12,
      borderBottom: `1px solid ${purple[50]}`,
    },
    meta: {
      margin: "0 0 3px",
      fontSize: 12,
      color: "#888",
    },
  },

  // Buttons
  btn: {
    base: {
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      padding: "6px 12px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      letterSpacing: "0.2px",
      transition: "opacity 0.15s",
    },
    variants: {
      approve:    { background: "#DCFCE7", color: "#166534" },
      deny:       { background: "#FFE4E6", color: "#9F1239" },
      reschedule: { background: purple[50], color: purple[600], border: `1px solid ${purple[100]}` },
    },
  },

  // Status badge
  badge: {
    base: {
      padding: "3px 10px",
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.4px",
      textTransform: "uppercase",
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
    },
    variants: {
      pending:   { background: "#FEF9C3", color: "#854D0E" },
      approved:  { background: "#DCFCE7", color: "#166534" },
      cancelled: { background: "#FFE4E6", color: "#9F1239" },
    },
    dot: (status) => ({
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: status === "approved"  ? "#22C55E"
                : status === "cancelled" ? "#F43F5E"
                : "#FBBF24",
    }),
  },
};

export const bookingHover = {
  cardEnter: (el) => {
    el.style.borderColor = purple[200];
    el.style.boxShadow = `0 4px 20px ${purple[50]}`;
  },
  cardLeave: (el) => {
    el.style.borderColor = purple[50];
    el.style.boxShadow = "none";
  },
  rowEnter:   (el) => { el.style.background = "#FAFAFF"; },
  rowLeave:   (el) => { el.style.background = "transparent"; },
  inputFocus: (el) => { el.style.borderColor = purple[400]; },
  inputBlur:  (el) => { el.style.borderColor = purple[100]; },
  btnEnter:   (el) => { el.style.opacity = "0.8"; },
  btnLeave:   (el) => { el.style.opacity = "1"; },
};