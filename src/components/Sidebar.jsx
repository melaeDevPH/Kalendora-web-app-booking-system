import { useMemo, useState } from "react";

const ITEM_HEIGHT = 54;
const BG = "#18283b";

export default function Sidebar({
  user, page, setPage, open, setOpen, isMobile, collapsed, setCollapsed, onLogout
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
  const isCollapsed  = collapsed && !isMobile;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: isMobile ? (open ? 0 : -260) : 0,
      width: isCollapsed ? 72 : 240,
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
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: isCollapsed ? "center" : "space-between",
        padding: "0 16px",
        flexShrink: 0,
      }}>
        {!isCollapsed && (
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Orbix Events</h2>
        )}

        {/* Desktop: collapse toggle inside sidebar header */}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: 16,
              padding: "6px",
              borderRadius: 6,
              lineHeight: 1,
            }}
          >
            <i className="fa-solid fa-bars" />
          </button>
        )}

        {/* Mobile: close button */}
        {isMobile && (
          <button
            onClick={() => setOpen(false)}
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontSize: 18,
              padding: "6px",
              borderRadius: 6,
              lineHeight: 1,
            }}
          >
            <i className="fa-solid fa-xmark" />
          </button>
        )}
      </div>

      {/* MENU */}
      <div style={{ position: "relative", flex: 1 }}>

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
            <div style={{
              position: "absolute",
              inset: 0,
              background: "#fff",
              borderRadius: "16px 0 0 16px",
            }} />
            <div style={{
              position: "absolute",
              bottom: "100%", right: 0,
              width: 20, height: 20,
              background: BG,
              borderBottomRightRadius: "50%",
              boxShadow: "6px 6px 0 6px #fff",
            }} />
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
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: 12,
                height: ITEM_HEIGHT,
                padding: isCollapsed ? 0 : "0 20px",
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
              {!isCollapsed && <span>{item.label}</span>}
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{
        padding: "12px 16px",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        flexShrink: 0,
      }}>
        {/* User info */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: isCollapsed ? 0 : 10,
          justifyContent: isCollapsed ? "center" : "flex-start",
        }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <i className="fa-solid fa-user" style={{ fontSize: 14 }} />
          </div>
          {!isCollapsed && (
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{user.name}</div>
              <div style={{ fontSize: 11, opacity: 0.5 }}>{user.role}</div>
            </div>
          )}
        </div>

        {/* Logout button */}
        {!isCollapsed ? (
          <button
            onClick={onLogout}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.07)",
              border: "0.5px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.75)",
              fontSize: 13,
              fontWeight: 500,
              padding: "8px 0",
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.13)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "rgba(255,255,255,0.75)";
            }}
          >
            <i className="fa-solid fa-right-from-bracket" />
            Log out
          </button>
        ) : (
          <button
            onClick={onLogout}
            title="Log out"
            style={{
              width: "100%",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontSize: 16,
              padding: "8px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.5)"}
          >
            <i className="fa-solid fa-right-from-bracket" />
          </button>
        )}
      </div>
    </div>
  );
}