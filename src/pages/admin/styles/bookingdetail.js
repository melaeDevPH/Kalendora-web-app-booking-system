// bookingDetail.js — styles for BookingDetailDrawer
// Matches existing DM Sans / purple design system

export const detailStyles = {

  // ── Overlay + Drawer ────────────────────────────────────────
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(20,15,45,0.40)",
    zIndex: 300,
    display: "flex",
    justifyContent: "flex-end",
  },

  drawer: {
    width: "100%",
    maxWidth: 480,
    height: "100vh",
    background: "#fff",
    boxShadow: "-8px 0 48px rgba(124,92,191,0.14)",
    display: "flex",
    flexDirection: "column",
    animation: "drawerIn 0.28s cubic-bezier(0.22,1,0.36,1)",
    overflowY: "auto",
  },

  // ── Header band ─────────────────────────────────────────────
  drawerHeader: {
    padding: "22px 24px 18px",
    borderBottom: "1px solid #EEEDFE",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    position: "sticky",
    top: 0,
    background: "#fff",
    zIndex: 2,
  },

  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  bookingId: {
    fontSize: 11,
    fontWeight: 700,
    color: "#b3abc8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  clientName: {
    fontSize: 20,
    fontWeight: 900,
    color: "#1a1535",
    letterSpacing: "-0.4px",
    margin: 0,
  },

  clientEmail: {
    fontSize: 12,
    color: "#9b94c1",
    fontWeight: 500,
    marginTop: 2,
  },

  closeBtn: {
    background: "#f5f3ff",
    border: "none",
    borderRadius: 10,
    width: 34,
    height: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#7c5cbf",
    fontSize: 13,
    flexShrink: 0,
    transition: "background 0.15s",
  },

  // ── Body ────────────────────────────────────────────────────
  body: {
    padding: "20px 24px 32px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  // ── Section ─────────────────────────────────────────────────
  section: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: 800,
    color: "#b3abc8",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 2,
  },

  // ── Info rows ───────────────────────────────────────────────
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },

  infoCard: {
    background: "#f9f8ff",
    border: "1px solid #EEEDFE",
    borderRadius: 12,
    padding: "12px 14px",
  },

  infoLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#c4bde0",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: 700,
    color: "#1a1535",
    lineHeight: 1.35,
  },

  infoValueSub: {
    fontSize: 11,
    color: "#9b94c1",
    fontWeight: 500,
    marginTop: 2,
  },

  // ── Status badge (large) ────────────────────────────────────
  statusRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },

  statusBadgeLarge: (status) => {
    const map = {
      approved:  { bg: "#dcfce7", color: "#15803d" },
      pending:   { bg: "#fef3c7", color: "#92400e" },
      cancelled: { bg: "#fee2e2", color: "#b91c1c" },
      confirmed: { bg: "#e0e7ff", color: "#3730a3" },
      ongoing:   { bg: "#cffafe", color: "#0e7490" },
      completed: { bg: "#ede9fe", color: "#5b21b6" },
    };
    const v = map[status] ?? map.pending;
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      padding: "6px 14px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 800,
      background: v.bg,
      color: v.color,
      textTransform: "capitalize",
    };
  },

  dotStatus: (status) => {
    const colors = {
      approved: "#22c55e", pending: "#f59e0b", cancelled: "#ef4444",
      confirmed: "#6366f1", ongoing: "#06b6d4", completed: "#8b5cf6",
    };
    return {
      width: 7, height: 7, borderRadius: "50%",
      background: colors[status] ?? "#ccc",
      display: "inline-block",
    };
  },

  // ── Notes box ───────────────────────────────────────────────
  notesBox: {
    background: "#f9f8ff",
    border: "1px solid #EEEDFE",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 13,
    color: "#4b4370",
    lineHeight: 1.6,
    fontWeight: 500,
    fontStyle: "italic",
    minHeight: 60,
  },

  notesEmpty: {
    fontSize: 12,
    color: "#c4bde0",
    fontStyle: "italic",
  },

  // ── Timeline ────────────────────────────────────────────────
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    position: "relative",
  },

  timelineItem: {
    display: "flex",
    gap: 14,
    paddingBottom: 18,
    position: "relative",
  },

  timelineLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexShrink: 0,
    width: 60,
  },

  timelineTime: {
    fontSize: 11,
    fontWeight: 800,
    color: "#7c5cbf",
    whiteSpace: "nowrap",
  },

  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#7c5cbf",
    border: "2px solid #fff",
    boxShadow: "0 0 0 2px #ede9fe",
    margin: "6px 0",
    flexShrink: 0,
  },

  timelineLine: (isLast) => ({
    width: 2,
    flex: 1,
    background: isLast ? "transparent" : "#EEEDFE",
    minHeight: 16,
  }),

  timelineContent: {
    paddingTop: 2,
    paddingBottom: 4,
  },

  timelineTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#1a1535",
    marginBottom: 2,
  },

  timelineDesc: {
    fontSize: 11,
    color: "#9b94c1",
    fontWeight: 500,
  },

  // ── Add timeline item ────────────────────────────────────────
  addTimelineBtn: {
    display: "flex",
    alignItems: "center",
    gap: 7,
    background: "transparent",
    border: "1.5px dashed #d4cef7",
    borderRadius: 10,
    padding: "9px 14px",
    fontSize: 12,
    fontWeight: 700,
    color: "#9b94c1",
    cursor: "pointer",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
    marginTop: 4,
  },

  // ── Inline add form ─────────────────────────────────────────
  addForm: {
    background: "#f9f8ff",
    border: "1px solid #EEEDFE",
    borderRadius: 12,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 4,
  },

  addFormRow: {
    display: "flex",
    gap: 8,
  },

  addInput: {
    flex: 1,
    background: "#fff",
    border: "1.5px solid #e5e1f7",
    borderRadius: 8,
    padding: "8px 11px",
    fontSize: 12,
    fontWeight: 600,
    color: "#1a1535",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "border-color 0.15s",
  },

  addFormActions: {
    display: "flex",
    gap: 8,
    justifyContent: "flex-end",
  },

  addSaveBtn: {
    background: "#7c5cbf",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "7px 16px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  addCancelBtn: {
    background: "#f5f3ff",
    color: "#9b94c1",
    border: "none",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
  },

  // ── Guests ──────────────────────────────────────────────────
  guestBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    background: "#f5f3ff",
    border: "1px solid #e0d9f7",
    borderRadius: 20,
    padding: "5px 12px",
    fontSize: 12,
    fontWeight: 600,
    color: "#5b4e94",
  },

  divider: {
    height: 1,
    background: "#EEEDFE",
    margin: "4px 0",
  },
};

export const detailHover = {
  closeBtnEnter: (el) => { el.style.background = "#ede9fe"; },
  closeBtnLeave: (el) => { el.style.background = "#f5f3ff"; },
  addBtnEnter:   (el) => { el.style.background = "#f5f3ff"; el.style.borderColor = "#b3a8e8"; el.style.color = "#7c5cbf"; },
  addBtnLeave:   (el) => { el.style.background = "transparent"; el.style.borderColor = "#d4cef7"; el.style.color = "#9b94c1"; },
  inputFocus:    (el) => { el.style.borderColor = "#7c5cbf"; },
  inputBlur:     (el) => { el.style.borderColor = "#e5e1f7"; },
};