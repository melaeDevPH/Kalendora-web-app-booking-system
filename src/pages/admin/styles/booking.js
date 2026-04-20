import { purple } from "./color";

export const bookingStyles = {
  page: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },

  header: {
    wrapper: { marginBottom: 28 },
    title: {
      margin: "0 0 6px",
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

  filters: {
    wrapper: {
      display: "flex",
      gap: 10,
      marginBottom: 24,
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
    tdStatus: { padding: "14px 18px" },
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
    actionRow: { display: "flex", gap: 6, flexWrap: "wrap" },
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
    },
    variants: {
      pending:   { background: "#FEF9C3", color: "#854D0E" },
      approved:  { background: "#DCFCE7", color: "#166534" },
      cancelled: { background: "#FFE4E6", color: "#9F1239" },
    },
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
  rowEnter: (el) => { el.style.background = purple[50]; },
  rowLeave: (el) => { el.style.background = "transparent"; },
  inputFocus: (el) => { el.style.borderColor = purple[400]; },
  inputBlur:  (el) => { el.style.borderColor = purple[100]; },
};