import { purple } from "./color.js";
import './font.css'

export const scheduleStyles = {

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

    card: {
        background: "#fff",
        borderRadius: 16,
        border: `1px solid ${purple[50]}`,
        padding: "28px 24px",
    },

    datePicker: {
        row: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 16,
        },
        label: {
            margin: "0 0 4px",
            fontSize: 16,
            fontWeight: 900,
            color: purple[900],
            letterSpacing: "-0.4px",
        },
        sublabel: {
            margin: 0,
            fontSize: 12,
            color: "#bbb",
        },
        input: {
            border: `1.5px solid ${purple[100]}`,
            borderRadius: 10,
            padding: "10px 14px",
            fontSize: 13,
            outline: "none",
            background: "#fff",
            minWidth: 160,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: purple[900],
            transition: "border-color 0.2s",
        },
    },

    summary: {
        wrapper: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            padding: "14px 18px",
            background: purple[50],
            borderRadius: 12,
            border: `1px solid ${purple[100]}`,
            flexWrap: "wrap",
            gap: 12,
        },
        text: {
            fontSize: 13,
            color: "#888",
            display: "flex",
            alignItems: "center",
            gap: 6,
        },
        count: {
            fontSize: 16,
            fontWeight: 900,
            color: purple[600],
        },
        toggleBtn: {
            background: "none",
            border: "none",
            color: purple[600],
            fontWeight: 700,
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            letterSpacing: "0.3px",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
        },
    },

    slots: {
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
            gap: 10,
        },
        btnActive: {
            padding: "14px 10px",
            borderRadius: 12,
            border: `2px solid ${purple[400]}`,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            background: purple[400],
            color: "#fff",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            transition: "all 0.15s",
        },
        btnInactive: {
            padding: "14px 10px",
            borderRadius: 12,
            border: `1.5px solid ${purple[100]}`,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            background: "#FAFAFF",
            color: "#ccc",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            transition: "all 0.15s",
        },
        statusLabel: {
            fontSize: 9,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            opacity: 0.8,
        },
    },

    stats: {
        wrapper: {
            marginTop: 28,
            paddingTop: 20,
            borderTop: `1px solid ${purple[50]}`,
        },
        eyebrow: {
            margin: "0 0 12px",
            fontSize: 10,
            color: "#bbb",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 10,
        },
        cardOpen: {
            padding: 16,
            background: purple[50],
            borderRadius: 12,
            border: `1px solid ${purple[100]}`,
        },
        cardClosed: {
            padding: 16,
            background: "#FAFAFF",
            borderRadius: 12,
            border: "1px solid #f0f0f0",
        },
        numOpen: { fontSize: 32, fontWeight: 900, color: purple[600], letterSpacing: "-1px", lineHeight: 1 },
        numClosed: { fontSize: 32, fontWeight: 900, color: "#ccc", letterSpacing: "-1px", lineHeight: 1 },
        labelOpen: { fontSize: 10, color: purple[600], fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 4 },
        labelClosed: { fontSize: 10, color: "#bbb", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 4 },
    },
};

export const scheduleHover = {
    inputFocus: (el) => { el.style.borderColor = purple[400]; },
    inputBlur: (el) => { el.style.borderColor = purple[100]; },
    slotActiveEnter: (el) => { el.style.opacity = "0.85"; },
    slotActiveLeave: (el) => { el.style.opacity = "1"; },
    slotInactiveEnter: (el) => { el.style.background = purple[50]; el.style.borderColor = purple[200]; el.style.color = purple[400]; },
    slotInactiveLeave: (el) => { el.style.background = "#FAFAFF"; el.style.borderColor = purple[100]; el.style.color = "#ccc"; },
};