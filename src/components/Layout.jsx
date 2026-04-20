import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ user, page, setPage, onLogout, children }) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Sidebar
        user={user}
        page={page}
        setPage={setPage}
        open={open}
        setOpen={setOpen}
        isMobile={isMobile}
      />

      {/* Main */}
      <div
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : 240, // ✅ push content on desktop
          background: "#F8FAFC",
          minHeight: "100vh"
        }}
      >
        
        {/* Topbar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
          borderBottom: "1px solid #E2E8F0",
          background: "#fff"
        }}>
          
          {/* Show toggle ONLY on mobile */}
          {isMobile && (
            <button
              onClick={() => setOpen(true)}
              style={{
                fontSize: 18,
                background: "none",
                border: "none",
                cursor: "pointer"
              }}
            >
              ☰
            </button>
          )}

          <h3 style={{ margin: 0 }}>{page}</h3>

          <button onClick={onLogout}>Logout</button>
        </div>

        <div style={{ padding: 20 }}>
          {children}
        </div>
      </div>
    </div>
  );
}