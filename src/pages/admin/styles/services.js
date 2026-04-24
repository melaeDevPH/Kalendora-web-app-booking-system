import { purple } from "./color";
import './font.css';

// Accent palette for bundle/service type tags
export const accent = {
  gold:    { bg: "#FBF3DC", text: "#92620A", border: "#F5DFA0" },
  rose:    { bg: "#FDE8F0", text: "#9D1F4E", border: "#F5BAD1" },
  emerald: { bg: "#DFF4EC", text: "#0E6645", border: "#A7DFC5" },
  sky:     { bg: "#DFF0FB", text: "#0A5E8A", border: "#A3D6F5" },
  violet:  { bg: "#EDE8FC", text: "#4B2FA0", border: "#C3B3F5" },
  slate:   { bg: "#F0F1F5", text: "#3D4466", border: "#CBD0E0" },
};

export const serviceStyles = {

  header: {
    wrapper: { marginBottom: 28 },
    top: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 },
    eyebrow: {
      display: "flex", alignItems: "center", gap: 8, marginBottom: 6,
    },
    dot: { width: 7, height: 7, borderRadius: "50%", background: purple[500] },
    label: { fontSize: 11, fontWeight: 700, letterSpacing: "1.8px", color: purple[500], textTransform: "uppercase" },
    title: {
      margin: "0 0 4px",
      fontSize: "clamp(22px, 5vw, 28px)",
      fontWeight: 900,
      color: purple[900],
      letterSpacing: "-0.8px",
    },
    subtitle: { margin: 0, color: "#aaa", fontSize: 13 },
  },

  // ── Tab strip ───────────────────────────────────────────────
  tabs: {
    wrapper: {
      display: "flex", gap: 4,
      background: "#EEEAFF", borderRadius: 12,
      padding: 4, width: "fit-content", marginBottom: 28,
    },
    btn: (active) => ({
      display: "flex", alignItems: "center", gap: 7,
      padding: "8px 18px", borderRadius: 9,
      border: "none", cursor: "pointer",
      fontSize: 13, fontWeight: 700,
      fontFamily: "'DM Sans', sans-serif",
      background: active ? purple[700] : "transparent",
      color: active ? "#fff" : purple[400],
      boxShadow: active ? `0 2px 10px ${purple[200]}` : "none",
      transition: "all 0.18s ease",
    }),
  },

  // ── Filters row ─────────────────────────────────────────────
  filters: {
    wrapper: {
      display: "flex", gap: 10,
      marginBottom: 24, flexWrap: "wrap", alignItems: "center",
    },
    search: {
      flex: "1 1 220px", minWidth: 180,
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10, padding: "10px 14px 10px 36px",
      fontSize: 13, background: "#fff", outline: "none",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: purple[900], transition: "border-color 0.2s",
    },
    select: {
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10, padding: "10px 14px",
      fontSize: 13, background: "#fff",
      cursor: "pointer", outline: "none",
      fontWeight: 500,
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: purple[900], transition: "border-color 0.2s",
    },
  },

  addBtn: {
    display: "flex", alignItems: "center", gap: 7,
    border: "none", borderRadius: 10,
    cursor: "pointer", fontWeight: 700,
    fontSize: 12, padding: "10px 18px",
    background: purple[900], color: "#fff",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    letterSpacing: "0.2px", transition: "opacity 0.15s",
    whiteSpace: "nowrap",
  },

  // ── Stats strip ──────────────────────────────────────────────
  statsStrip: {
    wrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: 12, marginBottom: 24,
    },
    card: {
      background: "#fff", borderRadius: 14,
      border: `1px solid ${purple[50]}`,
      padding: "16px 18px",
    },
    label: { fontSize: 10, fontWeight: 700, color: "#BBC0CC", textTransform: "uppercase", letterSpacing: "0.8px", margin: "0 0 6px" },
    value: { fontSize: 26, fontWeight: 900, color: purple[900], letterSpacing: "-1px", margin: 0 },
    sub:   { fontSize: 11, color: "#aaa", margin: "3px 0 0" },
  },

  // ── Section header ───────────────────────────────────────────
  sectionHeader: {
    wrapper: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16, marginTop: 4 },
    line: { flex: 1, height: 1, background: purple[50] },
    label: {
      fontSize: 10, fontWeight: 800, color: "#BBC0CC",
      textTransform: "uppercase", letterSpacing: "1.4px",
      whiteSpace: "nowrap",
    },
  },

  // ── Bundle card ──────────────────────────────────────────────
  bundle: {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 16, marginBottom: 32,
    },
    wrapper: {
      background: "#fff", borderRadius: 18,
      border: `1px solid ${purple[100]}`,
      overflow: "hidden",
      transition: "transform 0.18s, box-shadow 0.18s",
      display: "flex", flexDirection: "column",
    },
    banner: (color) => ({
      height: 6,
      background: color || purple[400],
    }),
    body: { padding: "20px 20px 16px", flex: 1, display: "flex", flexDirection: "column" },
    topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
    badgeRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 },
    badge: (accent) => ({
      fontSize: 10, fontWeight: 700,
      background: accent.bg, color: accent.text,
      border: `1px solid ${accent.border}`,
      borderRadius: 999, padding: "3px 9px",
      letterSpacing: "0.3px", textTransform: "uppercase",
    }),
    name: { margin: "0 0 6px", fontSize: 16, fontWeight: 900, color: purple[900], letterSpacing: "-0.4px" },
    description: { margin: "0 0 14px", fontSize: 12, color: "#888", lineHeight: 1.6, flex: 1 },
    includes: {
      margin: "0 0 14px",
      padding: "12px 14px",
      background: "#FAFAFF",
      borderRadius: 10,
      border: `1px solid ${purple[50]}`,
    },
    includesTitle: { fontSize: 10, fontWeight: 700, color: "#BBC0CC", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 8 },
    includesItem: { display: "flex", alignItems: "center", gap: 7, marginBottom: 5, fontSize: 12, color: "#555" },
    checkDot: { width: 6, height: 6, borderRadius: "50%", background: purple[400], flexShrink: 0 },
    footer: {
      display: "flex", justifyContent: "space-between",
      alignItems: "center", paddingTop: 14,
      borderTop: `1px solid ${purple[50]}`,
    },
    price: { fontSize: 22, fontWeight: 900, color: purple[900], letterSpacing: "-0.8px" },
    priceLabel: { fontSize: 11, color: "#aaa", marginTop: 1 },
    actionRow: { display: "flex", gap: 7 },
    popularBadge: {
      fontSize: 10, fontWeight: 800,
      background: `linear-gradient(135deg, ${purple[500]}, ${purple[700]})`,
      color: "#fff", borderRadius: 999,
      padding: "3px 10px", letterSpacing: "0.4px",
      textTransform: "uppercase",
    },
  },

  // ── Solo service card ────────────────────────────────────────
  service: {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: 14, marginBottom: 24,
    },
    wrapper: {
      background: "#fff", borderRadius: 16,
      border: `1px solid ${purple[50]}`,
      padding: 20,
      transition: "border-color 0.2s, box-shadow 0.2s",
      display: "flex", flexDirection: "column",
    },
    iconBox: (color) => ({
      width: 44, height: 44,
      background: color || purple[50],
      borderRadius: 12,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 20, marginBottom: 12, flexShrink: 0,
    }),
    topRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
    name: { margin: "0 0 3px", fontSize: 14, fontWeight: 800, color: purple[900] },
    category: {
      margin: 0, fontSize: 10, color: purple[400],
      textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700,
    },
    description: { margin: "8px 0 14px", fontSize: 12, color: "#888", lineHeight: 1.55, flex: 1 },
    footer: {
      display: "flex", justifyContent: "space-between",
      alignItems: "center", paddingTop: 12,
      borderTop: `1px solid ${purple[50]}`,
      marginTop: "auto",
    },
    price: { fontSize: 18, fontWeight: 900, color: purple[900], letterSpacing: "-0.5px" },
    duration: { fontSize: 11, color: "#aaa" },
    actionRow: { display: "flex", gap: 7 },
  },

  empty: {
    wrapper: {
      textAlign: "center", padding: "64px 24px",
      background: "#fff", borderRadius: 16,
      border: `1px solid ${purple[50]}`,
    },
    title: { fontWeight: 700, color: purple[900], margin: "0 0 6px", fontSize: 15 },
    sub: { color: "#bbb", fontSize: 13, margin: 0 },
  },

  // ── Buttons ──────────────────────────────────────────────────
  btn: {
    base: {
      border: "none", borderRadius: 8, cursor: "pointer",
      fontWeight: 700, fontSize: 11, padding: "7px 13px",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      transition: "opacity 0.15s",
    },
    edit:   { background: purple[50],  color: purple[600] },
    delete: { background: "#FFE4E6",   color: "#9F1239" },
    save:   { background: purple[900], color: "#fff", flex: 1, padding: "12px 16px", fontSize: 13 },
    cancel: {
      flex: 1, padding: "12px 16px",
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10, background: "#fff",
      color: "#aaa", fontSize: 13, fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      transition: "background 0.15s",
    },
  },

  // ── Modal ────────────────────────────────────────────────────
  modal: {
    overlay: {
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex", justifyContent: "center",
      alignItems: "center", padding: 16, zIndex: 1000,
    },
    box: {
      background: "#fff", padding: 28,
      borderRadius: 20, width: "100%",
      maxWidth: 520, maxHeight: "92vh", overflowY: "auto",
    },
    titleRow: {
      display: "flex", justifyContent: "space-between",
      alignItems: "center", marginBottom: 22,
    },
    title: {
      margin: 0, fontSize: 20, fontWeight: 900,
      color: purple[900], letterSpacing: "-0.5px",
    },
    closeBtn: {
      background: purple[50], border: "none",
      borderRadius: 8, width: 32, height: 32,
      cursor: "pointer", display: "flex",
      alignItems: "center", justifyContent: "center",
      color: purple[600], fontSize: 14,
      fontFamily: "'DM Sans', sans-serif",
    },
    label: {
      display: "block", fontSize: 11, fontWeight: 700,
      color: "#aaa", marginBottom: 6,
      textTransform: "uppercase", letterSpacing: "0.8px",
    },
    input: {
      width: "100%",
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10, padding: "10px 14px",
      fontSize: 13, outline: "none",
      boxSizing: "border-box",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: purple[900], transition: "border-color 0.2s",
    },
    fieldGap: { marginBottom: 16 },
    twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 },
    typeToggle: {
      display: "flex", gap: 8, marginBottom: 20,
    },
    typeBtn: (active) => ({
      flex: 1, padding: "10px 0", borderRadius: 10,
      border: `1.5px solid ${active ? purple[500] : purple[100]}`,
      background: active ? purple[50] : "#fff",
      color: active ? purple[700] : "#aaa",
      fontSize: 12, fontWeight: 700, cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif",
      transition: "all 0.15s",
    }),
    sectionLabel: {
      fontSize: 10, fontWeight: 800, color: "#BBC0CC",
      textTransform: "uppercase", letterSpacing: "1.2px",
      margin: "20px 0 10px",
      paddingTop: 16, borderTop: `1px solid ${purple[50]}`,
    },
    includesRow: {
      display: "flex", gap: 8, marginBottom: 8,
    },
    includesInput: {
      flex: 1,
      border: `1.5px solid ${purple[100]}`,
      borderRadius: 10, padding: "8px 12px",
      fontSize: 12, outline: "none",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      color: purple[900], transition: "border-color 0.2s",
    },
    addIncludesBtn: {
      background: purple[50], border: "none",
      borderRadius: 8, padding: "8px 12px",
      fontSize: 12, fontWeight: 700,
      color: purple[600], cursor: "pointer",
    },
    includesTag: {
      display: "flex", alignItems: "center", gap: 6,
      background: purple[50], borderRadius: 8,
      padding: "5px 10px", fontSize: 12, color: purple[700],
      fontWeight: 500,
    },
    includesList: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 },
    removeBtn: {
      background: "none", border: "none",
      cursor: "pointer", color: purple[300],
      fontSize: 12, padding: 0, lineHeight: 1,
    },
    actionRow: { display: "flex", gap: 12, marginTop: 24 },
  },
};

export const serviceHover = {
  cardEnter: (el) => {
    el.style.transform = "translateY(-2px)";
    el.style.boxShadow = "0 10px 32px rgba(124,92,252,0.10)";
  },
  cardLeave: (el) => {
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  },
  inputFocus: (el) => { el.style.borderColor = "#9B7EFF"; },
  inputBlur:  (el) => { el.style.borderColor  = "#E9E3FF"; },
  btnEnter:   (el) => { el.style.opacity = "0.8"; },
  btnLeave:   (el) => { el.style.opacity = "1"; },
  cancelEnter: (el) => { el.style.background = "#F3F0FF"; },
  cancelLeave: (el) => { el.style.background = "#fff"; },
};