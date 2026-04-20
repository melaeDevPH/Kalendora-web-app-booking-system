import { purple } from "./color";

export const serviceStyles = {
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
    subtitle: { margin: 0, color: "#aaa", fontSize: 13 },
  },

  addRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 24,
  },

  addBtn: {
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 12,
    padding: "10px 18px",
    background: purple[900],
    color: "#fff",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    letterSpacing: "0.2px",
    transition: "opacity 0.15s",
  },

  empty: {
    wrapper: {
      textAlign: "center",
      padding: "64px 24px",
      background: "#fff",
      borderRadius: 16,
      border: `1px solid ${purple[50]}`,
    },
    title: { fontWeight: 700, color: purple[900], margin: "0 0 6px", fontSize: 15 },
    sub:   { color: "#bbb", fontSize: 13, margin: 0 },
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: 16,
  },

  card: {
    wrapper: {
      background: "#fff",
      borderRadius: 14,
      border: `1px solid ${purple[50]}`,
      padding: 20,
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    iconBox: {
      width: 52,
      height: 52,
      background: purple[50],
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 26,
      marginBottom: 12,
    },
    name: {
      margin: "0 0 3px",
      fontSize: 15,
      fontWeight: 800,
      color: purple[900],
    },
    category: {
      margin: 0,
      fontSize: 10,
      color: purple[400],
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      fontWeight: 700,
    },
    description: {
      margin: "10px 0 12px",
      fontSize: 12,
      color: "#aaa",
      lineHeight: 1.55,
      minHeight: 36,
    },
    detailsRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 12,
      borderBottom: `1px solid ${purple[50]}`,
      marginBottom: 14,
    },
    price: { fontSize: 20, fontWeight: 900, color: purple[900], letterSpacing: "-0.5px" },
    duration: { fontSize: 11, color: "#bbb", marginTop: 2 },
    actionRow: { display: "flex", gap: 8 },
  },

  btn: {
    base: {
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 11,
      padding: "7px 13px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      transition: "opacity 0.15s",
    },
    edit:   { background: purple[50],  color: purple[600] },
    delete: { background: "#FFE4E6",   color: "#9F1239" },
    save:   { background: purple[900], color: "#fff", flex: 1, padding: "12px 16px", fontSize: 13 },
    cancel: {
      flex: 1,
      padding: "12px 16px",
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10,
      background: "#fff",
      color: "#aaa",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      transition: "background 0.15s",
    },
  },

  modal: {
    overlay: {
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      background: "rgba(0,0,0,0.35)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      zIndex: 1000,
    },
    box: {
      background: "#fff",
      padding: 28,
      borderRadius: 16,
      width: "100%",
      maxWidth: 480,
      maxHeight: "90vh",
      overflowY: "auto",
    },
    title: {
      margin: "0 0 20px",
      fontSize: 20,
      fontWeight: 900,
      color: purple[900],
      letterSpacing: "-0.5px",
    },
    label: {
      display: "block",
      fontSize: 11,
      fontWeight: 700,
      color: "#aaa",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
    },
    input: {
      width: "100%",
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      outline: "none",
      boxSizing: "border-box",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: purple[900],
      transition: "border-color 0.2s",
    },
    fieldGap: { marginBottom: 16 },
    twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 },
    iconGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 8,
      marginBottom: 20,
    },
    iconBtn: (active) => ({
      background: active ? purple[900] : purple[50],
      border: `1.5px solid ${active ? purple[900] : purple[100]}`,
      borderRadius: 10,
      padding: 10,
      fontSize: 20,
      cursor: "pointer",
      transition: "all 0.15s",
    }),
    actionRow: { display: "flex", gap: 12, marginTop: 8 },
  },
};

export const serviceHover = {
  cardEnter: (el) => {
    el.style.borderColor = purple[200];
    el.style.boxShadow = `0 4px 20px ${purple[50]}`;
  },
  cardLeave: (el) => {
    el.style.borderColor = purple[50];
    el.style.boxShadow = "none";
  },
  inputFocus: (el) => { el.style.borderColor = purple[400]; },
  inputBlur:  (el) => { el.style.borderColor = purple[100]; },
  btnEnter:   (el) => { el.style.opacity = "0.8"; },
  btnLeave:   (el) => { el.style.opacity = "1"; },
  cancelEnter: (el) => { el.style.background = purple[50]; },
  cancelLeave: (el) => { el.style.background = "#fff"; },
};