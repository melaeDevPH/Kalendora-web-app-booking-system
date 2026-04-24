// calendarView.js — styles for AdminCalendarView
// Matches the existing purple/DM Sans design system

export const calendarStyles = {
  page: {
    fontFamily: "'DM Sans', sans-serif",
    padding: "28px 24px",
    maxWidth: 1100,
    margin: "0 auto",
    color: "#1a1535",
  },

  header: {
    wrapper: {
      marginBottom: 28,
    },
    title: {
      fontSize: 26,
      fontWeight: 900,
      margin: 0,
      color: "#1a1535",
      letterSpacing: "-0.5px",
    },
    subtitle: {
      fontSize: 13,
      color: "#9b94c1",
      margin: "4px 0 0",
      fontWeight: 500,
    },
  },

  nav: {
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      gap: 12,
      flexWrap: "wrap",
    },
    monthLabel: {
      fontSize: 18,
      fontWeight: 700,
      color: "#1a1535",
      minWidth: 180,
      textAlign: "center",
    },
    arrowBtn: {
      background: "#f5f3ff",
      border: "none",
      borderRadius: 10,
      width: 36,
      height: 36,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#346089",
      fontSize: 14,
      transition: "background 0.15s",
    },
    viewToggle: {
      display: "flex",
      gap: 6,
      background: "#f5f3ff",
      borderRadius: 10,
      padding: 4,
    },
    viewBtn: (active) => ({
      padding: "6px 14px",
      borderRadius: 7,
      border: "none",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "'DM Sans', sans-serif",
      background: active ? "#346089" : "transparent",
      color: active ? "#fff" : "#9b94c1",
      transition: "all 0.15s",
    }),
  },

  // ── Month grid ─────────────────────────────────────────────
  grid: {
    wrapper: {
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 2px 16px rgba(124,92,191,0.08)",
      overflow: "hidden",
      border: "1px solid #EEEDFE",
    },
    dayNames: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      background: "#f9f8ff",
      borderBottom: "1px solid #EEEDFE",
    },
    dayName: {
      textAlign: "center",
      padding: "10px 4px",
      fontSize: 11,
      fontWeight: 700,
      color: "#9b94c1",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
    cells: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
    },
    cell: (isToday, isCurrentMonth, hasBookings) => ({
      minHeight: 88,
      padding: "8px 6px 6px",
      borderRight: "1px solid #EEEDFE",
      borderBottom: "1px solid #EEEDFE",
      background: isToday
        ? "#f5f0ff"
        : !isCurrentMonth
        ? "#fdfcff"
        : "#fff",
      cursor: hasBookings ? "pointer" : "default",
      transition: "background 0.12s",
      position: "relative",
    }),
    dateNum: (isToday, isCurrentMonth) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 26,
      height: 26,
      borderRadius: "50%",
      fontSize: 13,
      fontWeight: isToday ? 800 : 500,
      background: isToday ? "#346089" : "transparent",
      color: isToday ? "#fff" : isCurrentMonth ? "#1a1535" : "#ccc",
      marginBottom: 4,
    }),
    dot: (status) => {
      const colors = {
        approved:  "#22c55e",
        pending:   "#f59e0b",
        cancelled: "#ef4444",
        confirmed: "#6366f1",
        ongoing:   "#06b6d4",
        completed: "#8b5cf6",
      };
      return {
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: colors[status] ?? "#ccc",
        marginRight: 3,
        flexShrink: 0,
      };
    },
    eventPill: (status) => {
      const bg = {
        approved:  "#dcfce7",
        pending:   "#fef3c7",
        cancelled: "#fee2e2",
        confirmed: "#e0e7ff",
        ongoing:   "#cffafe",
        completed: "#ede9fe",
      };
      const text = {
        approved:  "#15803d",
        pending:   "#92400e",
        cancelled: "#b91c1c",
        confirmed: "#3730a3",
        ongoing:   "#0e7490",
        completed: "#5b21b6",
      };
      return {
        display: "flex",
        alignItems: "center",
        fontSize: 10,
        fontWeight: 600,
        background: bg[status] ?? "#f3f4f6",
        color: text[status] ?? "#374151",
        borderRadius: 5,
        padding: "2px 5px",
        marginBottom: 3,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        gap: 3,
      };
    },
    moreTag: {
      fontSize: 10,
      color: "#9b94c1",
      fontWeight: 600,
      paddingLeft: 4,
    },
  },

  // ── Week view ──────────────────────────────────────────────
  week: {
    wrapper: {
      background: "#fff",
      borderRadius: 18,
      boxShadow: "0 2px 16px rgba(124,92,191,0.08)",
      overflow: "hidden",
      border: "1px solid #EEEDFE",
    },
    header: {
      display: "grid",
      gridTemplateColumns: "60px repeat(7, 1fr)",
      background: "#f9f8ff",
      borderBottom: "1px solid #EEEDFE",
    },
    dayHeader: (isToday) => ({
      textAlign: "center",
      padding: "12px 4px",
      borderLeft: "1px solid #EEEDFE",
    }),
    dayHeaderNum: (isToday) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: isToday ? "#346089" : "transparent",
      color: isToday ? "#fff" : "#1a1535",
      fontSize: 14,
      fontWeight: isToday ? 800 : 600,
      marginBottom: 2,
    }),
    dayHeaderName: {
      fontSize: 10,
      fontWeight: 700,
      color: "#9b94c1",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
    },
    body: {
      display: "grid",
      gridTemplateColumns: "60px repeat(7, 1fr)",
      minHeight: 500,
    },
    timeCol: {
      borderRight: "1px solid #EEEDFE",
    },
    timeSlot: {
      height: 56,
      borderBottom: "1px solid #f3f0ff",
      display: "flex",
      alignItems: "flex-start",
      paddingTop: 4,
      paddingRight: 8,
      justifyContent: "flex-end",
      fontSize: 10,
      color: "#c4bde0",
      fontWeight: 600,
    },
    dayCol: (isToday) => ({
      borderLeft: "1px solid #EEEDFE",
      background: isToday ? "#fdfbff" : "transparent",
      position: "relative",
    }),
    hourCell: {
      height: 56,
      borderBottom: "1px solid #f3f0ff",
    },
    eventBlock: (status) => {
      const bg = {
        approved:  "linear-gradient(135deg,#bbf7d0,#86efac)",
        pending:   "linear-gradient(135deg,#fde68a,#fcd34d)",
        cancelled: "linear-gradient(135deg,#fecaca,#fca5a5)",
        confirmed: "linear-gradient(135deg,#c7d2fe,#a5b4fc)",
        ongoing:   "linear-gradient(135deg,#a5f3fc,#67e8f9)",
        completed: "linear-gradient(135deg,#ddd6fe,#c4b5fd)",
      };
      return {
        position: "absolute",
        left: 3,
        right: 3,
        borderRadius: 7,
        padding: "4px 6px",
        fontSize: 10,
        fontWeight: 700,
        background: bg[status] ?? "#e5e7eb",
        color: "#1a1535",
        overflow: "hidden",
        cursor: "pointer",
        zIndex: 1,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        lineHeight: 1.3,
      };
    },
  },

  // ── Day panel / detail drawer ──────────────────────────────
  panel: {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(20,15,45,0.35)",
      zIndex: 200,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    drawer: {
      background: "#fff",
      borderRadius: "20px 20px 0 0",
      width: "100%",
      maxWidth: 540,
      maxHeight: "80vh",
      overflowY: "auto",
      padding: "24px 24px 32px",
      boxShadow: "0 -8px 40px rgba(124,92,191,0.18)",
      animation: "slideUp 0.25s ease",
    },
    handle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      background: "#e0d9f7",
      margin: "0 auto 20px",
    },
    date: {
      fontSize: 17,
      fontWeight: 800,
      color: "#1a1535",
      marginBottom: 16,
      letterSpacing: "-0.3px",
    },
    card: {
      background: "#f9f8ff",
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 10,
      border: "1px solid #EEEDFE",
      cursor: "pointer",
      transition: "box-shadow 0.15s",
    },
    cardTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    clientName: {
      fontWeight: 700,
      fontSize: 14,
      color: "#1a1535",
    },
    service: {
      fontSize: 12,
      color: "#9b94c1",
      marginTop: 2,
    },
    meta: {
      fontSize: 11,
      color: "#b3abc8",
      fontWeight: 500,
    },
    emptyDay: {
      textAlign: "center",
      padding: "32px 0",
      color: "#c4bde0",
      fontSize: 13,
      fontWeight: 500,
    },
  },

  // ── Conflict banner ────────────────────────────────────────
  conflict: {
    banner: {
      background: "linear-gradient(90deg,#fee2e2,#fef3c7)",
      border: "1px solid #fca5a5",
      borderRadius: 12,
      padding: "12px 16px",
      marginBottom: 18,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      fontWeight: 600,
      color: "#b91c1c",
    },
  },

  // ── Legend ─────────────────────────────────────────────────
  legend: {
    wrapper: {
      display: "flex",
      flexWrap: "wrap",
      gap: 10,
      marginBottom: 16,
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      fontSize: 11,
      fontWeight: 600,
      color: "#6b6393",
    },
    dot: (color) => ({
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: color,
      flexShrink: 0,
    }),
  },
};

export const calendarHover = {
  arrowEnter: (el) => { el.style.background = "#ede9fe"; },
  arrowLeave: (el) => { el.style.background = "#f5f3ff"; },
  cellEnter:  (el) => { el.style.background = "#f9f7ff"; },
  cellLeave:  (el, isToday) => {
    el.style.background = isToday ? "#f5f0ff" : "#fff";
  },
  panelCardEnter: (el) => { el.style.boxShadow = "0 4px 14px rgba(124,92,191,0.15)"; },
  panelCardLeave: (el) => { el.style.boxShadow = "none"; },
};