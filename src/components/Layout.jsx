import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ user, page, setPage, onLogout, children }) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const sidebarWidth = isMobile ? 0 : collapsed ? 72 : 240;

  return (
    <div style={{ display: "flex" }}>

      {/* Mobile backdrop */}
      {isMobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 999,
          }}
        />
      )}

      <Sidebar
        user={user}
        page={page}
        setPage={setPage}
        open={open}
        setOpen={setOpen}
        isMobile={isMobile}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={onLogout}
      />

      {/* Main content — no navbar */}
      <div style={{
        flex: 1,
        marginLeft: sidebarWidth,
  
        minHeight: "100vh",
        transition: "margin-left 0.25s ease",
      }}>

        {/* Mobile hamburger — floating top-left */}
        {isMobile && (
          <button
            onClick={() => setOpen(true)}
            style={{
              position: "fixed",
              top: 14,
              left: 14,
              zIndex: 998,
              background: "#18283b",
              border: "none",
              color: "#fff",
              width: 40,
              height: 40,
              borderRadius: 10,
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            }}
          >
            <i className="fa-solid fa-bars" />
          </button>
        )}

        <div style={{ padding: isMobile ? "64px 20px 20px" : "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}