import { useMemo, useState } from "react";

const ITEM_HEIGHT = 54;
const BG = "#18283b";

export default function Sidebar({
  user, page, setPage, open, setOpen, isMobile, collapsed, setCollapsed
}) {
  const [hovered, setHovered] = useState(null);

  const menu = useMemo(() => {
    return user.role === "admin"
      ? [
          { label: "Dashboard", key: "admin.dashboard", icon: "fa-solid fa-chart-line" },
          { label: "Bookings",  key: "admin.bookings",  icon: "fa-solid fa-calendar-days" },
          { label: "Services",  key: "admin.services",  icon: "fa-solid fa-briefcase" },
          { label: "Schedule",  key: "admin.schedule",  icon: "fa-solid fa-clock" },
        ]
      : [
          { label: "Services",    key: "client.services", icon: "fa-solid fa-star" },
          { label: "My Bookings", key: "client.bookings", icon: "fa-solid fa-book" },
        ];
  }, [user]);

  const activeIndex  = menu.findIndex(m => m.key === page);
  const highlightIdx = hovered !== null ? hovered : activeIndex;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: isMobile ? (open ? 0 : -260) : 0,
      width: collapsed && !isMobile ? 80 : 240,
      height: "100vh",
      background: BG,
      color: "#fff",
      transition: "all 0.25s ease",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}>

      {/* HEADER */}
      <div style={{
        height: 70,
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed && !isMobile ? "center" : "space-between",
        padding: "0 16px",
      }}>
        {!(collapsed && !isMobile) && (
          <h2 style={{ margin: 0, fontSize: 18 }}>Kalendora</h2>
        )}

        {/* Collapse toggle — desktop only */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "none",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            <i className="fa-solid fa-bars" />
          </button>
        )}
      </div>

      {/* MENU */}
      <div style={{ position: "relative" }}>

        {/* Sliding highlight — desktop only */}
        {!isMobile && highlightIdx >= 0 && (
          <div style={{
            position: "absolute",
            left: 0,
            top: highlightIdx * ITEM_HEIGHT,
            width: "100%",
            height: ITEM_HEIGHT,
            transition: "top 0.25s ease",
            zIndex: 0,
            pointerEvents: "none",
          }}>
            {/* White slab */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "#fff",
              borderRadius: "16px 0 0 16px",
            }} />
            {/* Concave corner — top */}
            <div style={{
              position: "absolute",
              bottom: "100%", right: 0,
              width: 20, height: 20,
              background: BG,
              borderBottomRightRadius: "50%",
              boxShadow: "6px 6px 0 6px #fff",
            }} />
            {/* Concave corner — bottom */}
            <div style={{
              position: "absolute",
              top: "100%", right: 0,
              width: 20, height: 20,
              background: BG,
              borderTopRightRadius: "50%",
              boxShadow: "6px -6px 0 6px #fff",
            }} />
          </div>
        )}

        {/* Menu items */}
        {menu.map((item, index) => {
          const isHighlighted = !isMobile && highlightIdx === index;
          const isActive = page === item.key;

          return (
            <div
              key={item.key}
              onClick={() => {
                setPage(item.key);
                if (isMobile) setOpen(false);
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                gap: 12,
                height: ITEM_HEIGHT,
                padding: collapsed && !isMobile ? 0 : "0 20px",
                cursor: "pointer",
                zIndex: 1,
                color: isHighlighted ? "#0F172A" : isActive && isMobile ? "#60A5FA" : "#CBD5F5",
                fontWeight: 600,
                fontSize: 14,
                transition: "color 0.2s",
                userSelect: "none",
              }}
            >
              <i className={`fa ${item.icon}`} style={{ width: 20, textAlign: "center" }} />
              {!(collapsed && !isMobile) && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{
        marginTop: "auto",
        padding: 16,
        borderTop: "1px solid #2c3e50",
        textAlign: collapsed && !isMobile ? "center" : "left",
      }}>
        {!(collapsed && !isMobile) ? (
          <>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{user.name}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{user.role}</div>
          </>
        ) : (
          <i className="fa-solid fa-user" />
        )}
      </div>
    </div>
  );
}