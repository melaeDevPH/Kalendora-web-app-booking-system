import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
//  MOCK DATA
// ─────────────────────────────────────────────
const today = new Date();
const fmt = (d) => d.toISOString().split("T")[0];
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };

const SERVICES_DATA = [
  { id: 1, name: "Haircut & Styling", duration: 60, price: 45, category: "Hair", description: "Professional cut and style tailored to your preferences and face shape.", icon: "✂" },
  { id: 2, name: "Deep Tissue Massage", duration: 90, price: 85, category: "Wellness", description: "Targeted muscle relief and stress reduction with deep-pressure techniques.", icon: "💆" },
  { id: 3, name: "Business Consultation", duration: 45, price: 120, category: "Consulting", description: "One-on-one strategy session to grow and optimize your business.", icon: "💼" },
  { id: 4, name: "Facial Treatment", duration: 60, price: 65, category: "Skincare", description: "Rejuvenating facial for cleaner, glowing, and healthier-looking skin.", icon: "✨" },
  { id: 5, name: "Personal Training", duration: 60, price: 75, category: "Fitness", description: "Custom workout session designed around your goals and fitness level.", icon: "🏋" },
  { id: 6, name: "Nail Art Session", duration: 75, price: 55, category: "Beauty", description: "Creative nail designs with premium gel and acrylic materials.", icon: "💅" },
];

const ALL_SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

const BOOKINGS_DATA = [
  { id: 1, clientName: "Alice Johnson", clientEmail: "alice@demo.com", serviceId: 1, serviceName: "Haircut & Styling", date: fmt(addDays(today, 1)), time: "10:00", status: "approved", notes: "" },
  { id: 2, clientName: "Bob Smith", clientEmail: "bob@demo.com", serviceId: 2, serviceName: "Deep Tissue Massage", date: fmt(addDays(today, 1)), time: "14:00", status: "pending", notes: "First visit" },
  { id: 3, clientName: "Carol White", clientEmail: "carol@demo.com", serviceId: 3, serviceName: "Business Consultation", date: fmt(addDays(today, 2)), time: "11:00", status: "approved", notes: "" },
  { id: 4, clientName: "David Lee", clientEmail: "david@demo.com", serviceId: 4, serviceName: "Facial Treatment", date: fmt(addDays(today, -1)), time: "09:00", status: "cancelled", notes: "" },
  { id: 5, clientName: "John Client", clientEmail: "john@demo.com", serviceId: 1, serviceName: "Haircut & Styling", date: fmt(addDays(today, 3)), time: "15:00", status: "pending", notes: "" },
  { id: 6, clientName: "John Client", clientEmail: "john@demo.com", serviceId: 3, serviceName: "Business Consultation", date: fmt(today), time: "10:00", status: "approved", notes: "Bring portfolio" },
  { id: 7, clientName: "Emma Wilson", clientEmail: "emma@demo.com", serviceId: 5, serviceName: "Personal Training", date: fmt(addDays(today, 2)), time: "09:00", status: "pending", notes: "" },
  { id: 8, clientName: "Frank Miller", clientEmail: "frank@demo.com", serviceId: 6, serviceName: "Nail Art Session", date: fmt(addDays(today, 4)), time: "13:00", status: "approved", notes: "" },
];

const MOCK_USERS = [
  { id: 1, name: "Admin User", email: "admin@demo.com", password: "admin", role: "admin" },
  { id: 2, name: "John Client", email: "john@demo.com", password: "john", role: "client" },
];

// ─────────────────────────────────────────────
//  API SIMULATION
// ─────────────────────────────────────────────
const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

export async function fetchBookings(bookings) {
  await delay();
  return bookings;
}
export async function createBooking(bookings, setBookings, data) {
  await delay(900);
  const nb = { id: Date.now(), status: "pending", ...data };
  setBookings((p) => [...p, nb]);
  return nb;
}
export async function updateBookingStatus(setBookings, id, status) {
  await delay(500);
  setBookings((p) => p.map((b) => (b.id === id ? { ...b, status } : b)));
}

// ─────────────────────────────────────────────
//  UTILITY COMPONENTS
// ─────────────────────────────────────────────
const statusCfg = {
  pending:   { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  approved:  { bg: "#D1FAE5", text: "#065F46", dot: "#10B981" },
  cancelled: { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
};

const StatusBadge = ({ status }) => {
  const c = statusCfg[status] || { bg: "#F3F4F6", text: "#374151", dot: "#9CA3AF" };
  return (
    <span style={{ background: c.bg, color: c.text, display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, letterSpacing: "0.02em" }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Spinner = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
    <div style={{ width: 28, height: 28, border: "3px solid #E0E7FF", borderTopColor: "#6366F1", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
  </div>
);

const Modal = ({ title, onClose, children, width = 480 }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16, backdropFilter: "blur(2px)" }}>
    <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: width, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0,0,0,0.18)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #F1F5F9" }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0F172A" }}>{title}</h3>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#94A3B8", lineHeight: 1, padding: "0 4px" }}>×</button>
      </div>
      <div style={{ padding: "24px" }}>{children}</div>
    </div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>{label}</label>}
    <input {...props} style={{ width: "100%", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 13px", fontSize: 14, color: "#0F172A", outline: "none", boxSizing: "border-box", background: "#fff", transition: "border-color 0.15s", ...props.style }} onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
  </div>
);

const Btn = ({ variant = "primary", children, style, ...props }) => {
  const styles = {
    primary: { background: "#6366F1", color: "#fff", border: "none" },
    secondary: { background: "#F8FAFC", color: "#475569", border: "1.5px solid #E2E8F0" },
    danger: { background: "#FEE2E2", color: "#DC2626", border: "none" },
    success: { background: "#D1FAE5", color: "#065F46", border: "none" },
    ghost: { background: "transparent", color: "#6366F1", border: "1.5px solid #E0E7FF" },
  };
  return (
    <button {...props} style={{ ...styles[variant], padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: props.disabled ? "not-allowed" : "pointer", opacity: props.disabled ? 0.5 : 1, transition: "opacity 0.15s, transform 0.1s", ...style }}>
      {children}
    </button>
  );
};

// ─────────────────────────────────────────────
//  AUTH PAGES
// ─────────────────────────────────────────────
const AuthLayout = ({ children }) => (
  <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 50%, #FFF7ED 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
    <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } } .auth-card { animation: fadeUp 0.4s ease both }`}</style>
    <div className="auth-card" style={{ background: "#fff", borderRadius: 24, padding: "40px 36px", width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(99,102,241,0.1)" }}>
      {children}
    </div>
  </div>
);

const Logo = () => (
  <div style={{ textAlign: "center", marginBottom: 32 }}>
    <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 22 }}>📅</div>
    <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.5px" }}>BookEase</h1>
    <p style={{ margin: "6px 0 0", fontSize: 14, color: "#94A3B8" }}>Scheduling, simplified.</p>
  </div>
);

const Login = ({ onLogin, goRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(""); setLoading(true);
    await delay(800);
    const u = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (u) onLogin(u);
    else setError("Invalid credentials. Use the demo accounts below.");
    setLoading(false);
  };

  return (
    <AuthLayout>
      <Logo />
      {error && <div style={{ background: "#FEE2E2", color: "#991B1B", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>{error}</div>}
      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleSubmit()} />
      <Btn style={{ width: "100%", padding: "12px", fontSize: 14, marginTop: 4 }} onClick={handleSubmit} disabled={loading}>
        {loading ? "Signing in…" : "Sign in →"}
      </Btn>
      <p style={{ textAlign: "center", fontSize: 13, color: "#94A3B8", marginTop: 20 }}>
        No account? <button onClick={goRegister} style={{ color: "#6366F1", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>Sign up</button>
      </p>
      <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 14px", marginTop: 16, fontSize: 12, color: "#64748B", lineHeight: 1.7 }}>
        <strong>Demo accounts:</strong><br />
        Admin: admin@demo.com / <strong>admin</strong><br />
        Client: john@demo.com / <strong>john</strong>
      </div>
    </AuthLayout>
  );
};

const Register = ({ goLogin }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = () => { setDone(true); setTimeout(goLogin, 1800); };

  if (done) return (
    <AuthLayout>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontWeight: 800, color: "#0F172A" }}>Account Created!</h2>
        <p style={{ color: "#64748B" }}>Redirecting you to login…</p>
      </div>
    </AuthLayout>
  );

  return (
    <AuthLayout>
      <Logo />
      {[["Full Name","name","text","Your name"], ["Email","email","email","you@example.com"], ["Password","password","password","••••••••"], ["Confirm Password","confirm","password","••••••••"]].map(([label, key, type, ph]) => (
        <Input key={key} label={label} type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
      ))}
      <Btn style={{ width: "100%", padding: "12px", fontSize: 14 }} onClick={handleSubmit}>Create Account →</Btn>
      <p style={{ textAlign: "center", fontSize: 13, color: "#94A3B8", marginTop: 20 }}>
        Have an account? <button onClick={goLogin} style={{ color: "#6366F1", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>Sign in</button>
      </p>
    </AuthLayout>
  );
};

// ─────────────────────────────────────────────
//  LAYOUT
// ─────────────────────────────────────────────
const clientNav = [
  { id: "client.services", label: "Book a Service", icon: "🗓" },
  { id: "client.bookings", label: "My Bookings", icon: "📋" },
];
const adminNav = [
  { id: "admin.dashboard", label: "Dashboard", icon: "📊" },
  { id: "admin.bookings", label: "Manage Bookings", icon: "📋" },
  { id: "admin.services", label: "Services", icon: "⚙" },
  { id: "admin.schedule", label: "Schedule", icon: "🕐" },
];

const Sidebar = ({ user, page, setPage, onLogout, open, setOpen }) => {
  const nav = user.role === "admin" ? adminNav : clientNav;
  const initials = user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      {open && <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 40 }} />}
      <aside style={{ position: "fixed", top: 0, left: 0, height: "100%", width: 240, background: "#0F172A", display: "flex", flexDirection: "column", zIndex: 50, transition: "transform 0.25s", transform: open ? "translateX(0)" : undefined, willChange: "transform" }} className="sidebar">
        <style>{`.sidebar { @media (max-width: 768px) { transform: translateX(-100%) } } .sidebar.open { transform: translateX(0) !important } nav-item:hover { background: rgba(255,255,255,0.08) !important } @keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>📅</div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 17, letterSpacing: "-0.3px" }}>BookEase</span>
          </div>
          {user.role === "admin" && (
            <div style={{ marginTop: 10, background: "rgba(99,102,241,0.2)", borderRadius: 6, padding: "3px 8px", display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 10, color: "#A5B4FC", fontWeight: 700, letterSpacing: "0.08em" }}>ADMIN PANEL</span>
            </div>
          )}
        </div>
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {nav.map(item => {
            const active = page === item.id;
            return (
              <button key={item.id} onClick={() => { setPage(item.id); setOpen(false); }}
                style={{ width: "100%", display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? "rgba(99,102,241,0.25)" : "transparent", color: active ? "#A5B4FC" : "#94A3B8", fontSize: 14, fontWeight: active ? 700 : 500, textAlign: "left", transition: "all 0.15s" }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = active ? "#A5B4FC" : "#CBD5E1"; }}
                onMouseLeave={e => { e.currentTarget.style.background = active ? "rgba(99,102,241,0.25)" : "transparent"; e.currentTarget.style.color = active ? "#A5B4FC" : "#94A3B8"; }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
                {active && <span style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#6366F1" }} />}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{initials}</div>
            <div style={{ minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#E2E8F0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</p>
              <p style={{ margin: 0, fontSize: 11, color: "#64748B", textTransform: "capitalize" }}>{user.role}</p>
            </div>
          </div>
          <button onClick={onLogout} style={{ width: "100%", background: "rgba(239,68,68,0.1)", border: "none", color: "#FCA5A5", fontSize: 13, fontWeight: 600, padding: "9px 0", borderRadius: 8, cursor: "pointer" }}>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
};

const Layout = ({ user, page, setPage, onLogout, children }) => {
  const [open, setOpen] = useState(false);
  const allNav = [...clientNav, ...adminNav];
  const pageTitle = allNav.find(n => n.id === page)?.label || "BookEase";

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
      <style>{`@media(min-width:769px){.content-area{margin-left:240px!important}.menu-btn{display:none!important}} @keyframes spin{to{transform:rotate(360deg)}} .page-enter{animation:fadeUp 0.3s ease both} @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <Sidebar user={user} page={page} setPage={setPage} onLogout={onLogout} open={open} setOpen={setOpen} />
      <div className="content-area" style={{ minHeight: "100vh", transition: "margin 0.25s" }}>
        <header style={{ background: "#fff", borderBottom: "1px solid #F1F5F9", padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button className="menu-btn" onClick={() => setOpen(true)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#64748B" }}>☰</button>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{pageTitle}</h2>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8", fontWeight: 500 }}>
            {today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </div>
        </header>
        <main className="page-enter" key={page} style={{ padding: "28px 24px", maxWidth: 1100, margin: "0 auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  CLIENT: SERVICES
// ─────────────────────────────────────────────
const ServicesPage = ({ services, onBook }) => {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...new Set(services.map(s => s.category))];
  const filtered = services.filter(s =>
    (cat === "All" || s.category === cat) &&
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#0F172A" }}>Available Services</h3>
        <p style={{ margin: 0, color: "#64748B", fontSize: 14 }}>Choose a service to book your appointment.</p>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input placeholder="Search services…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 180, border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none", background: "#fff" }}
          onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)}
              style={{ padding: "9px 16px", borderRadius: 10, border: "1.5px solid", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", background: cat === c ? "#6366F1" : "#fff", color: cat === c ? "#fff" : "#64748B", borderColor: cat === c ? "#6366F1" : "#E2E8F0" }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
        {filtered.map(s => (
          <div key={s.id}
            style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9", padding: "22px 22px 18px", transition: "all 0.2s", cursor: "default" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#C7D2FE"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(99,102,241,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#F1F5F9"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 44, height: 44, background: "#EEF2FF", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
              <span style={{ background: "#F0FDF4", color: "#166534", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, letterSpacing: "0.02em" }}>{s.category}</span>
            </div>
            <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: "#0F172A" }}>{s.name}</h3>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "#64748B", lineHeight: 1.55 }}>{s.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 20, fontWeight: 800, color: "#0F172A" }}>${s.price}</span>
                <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: 6 }}>· {s.duration}m</span>
              </div>
              <Btn onClick={() => onBook(s)} style={{ padding: "8px 16px" }}>Book Now</Btn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  CLIENT: BOOKING FORM
// ─────────────────────────────────────────────
const BookingForm = ({ service, bookings, availableSlots, onConfirm, onCancel }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const minDate = fmt(today);
  const maxDate = fmt(addDays(today, 30));
  const bookedSlots = bookings.filter(b => b.date === date && b.serviceId === service?.id && b.status !== "cancelled").map(b => b.time);
  const daySlots = availableSlots[date] || ALL_SLOTS;

  const handleSubmit = async () => {
    if (!date || !time) return;
    setLoading(true);
    await delay(900);
    onConfirm({ serviceId: service.id, serviceName: service.name, date, time, notes });
    setLoading(false);
    setDone(true);
  };

  if (done) return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 40 }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "48px 40px", textAlign: "center", maxWidth: 400, border: "1.5px solid #F1F5F9" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
        <h2 style={{ margin: "0 0 8px", fontWeight: 800, color: "#0F172A", fontSize: 22 }}>Booking Submitted!</h2>
        <p style={{ color: "#64748B", margin: "0 0 28px" }}>Your appointment is pending confirmation.</p>
        <Btn onClick={onCancel} style={{ padding: "12px 28px" }}>Back to Services</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 540, margin: "0 auto" }}>
      <button onClick={onCancel} style={{ background: "none", border: "none", color: "#6366F1", cursor: "pointer", fontSize: 14, fontWeight: 600, marginBottom: 20, padding: 0 }}>← Back to Services</button>
      <div style={{ background: "#fff", borderRadius: 24, border: "1.5px solid #F1F5F9", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", padding: "24px", color: "#fff" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{service?.icon}</div>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 800 }}>{service?.name}</h2>
          <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>{service?.duration} min session · ${service?.price}</p>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Select Date</label>
            <input type="date" min={minDate} max={maxDate} value={date} onChange={e => { setDate(e.target.value); setTime(""); }}
              style={{ width: "100%", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fff" }}
              onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
          </div>
          {date && (
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 10 }}>
                Available Time Slots <span style={{ color: "#94A3B8", fontWeight: 400 }}>({daySlots.filter(s => !bookedSlots.includes(s)).length} available)</span>
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {daySlots.map(slot => {
                  const booked = bookedSlots.includes(slot);
                  const selected = slot === time;
                  return (
                    <button key={slot} disabled={booked} onClick={() => setTime(slot)}
                      style={{ padding: "10px 0", fontSize: 13, fontWeight: 600, borderRadius: 10, border: "1.5px solid", cursor: booked ? "not-allowed" : "pointer", transition: "all 0.15s",
                        background: booked ? "#F8FAFC" : selected ? "#6366F1" : "#fff",
                        color: booked ? "#CBD5E1" : selected ? "#fff" : "#475569",
                        borderColor: booked ? "#F1F5F9" : selected ? "#6366F1" : "#E2E8F0",
                        position: "relative" }}>
                      {slot}
                      {booked && <span style={{ position: "absolute", bottom: 3, right: 0, left: 0, textAlign: "center", fontSize: 8, color: "#CBD5E1", letterSpacing: "0.05em" }}>BOOKED</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Notes (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Any special requests or information…"
              style={{ width: "100%", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 13px", fontSize: 14, resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
          </div>
          <Btn disabled={!date || !time || loading} onClick={handleSubmit} style={{ width: "100%", padding: "13px", fontSize: 14 }}>
            {loading ? "Confirming…" : "Confirm Booking"}
          </Btn>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  CLIENT: MY BOOKINGS
// ─────────────────────────────────────────────
const MyBookings = ({ bookings, user, onCancel, onReschedule }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const mine = bookings.filter(b => b.clientEmail === user.email);
  const filtered = mine.filter(b =>
    (filter === "all" || b.status === filter) &&
    b.serviceName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <input placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 160, border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none", background: "#fff" }}
          onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
        {["all","pending","approved","cancelled"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: "9px 16px", borderRadius: 10, border: "1.5px solid", fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", transition: "all 0.15s",
              background: filter === s ? "#6366F1" : "#fff", color: filter === s ? "#fff" : "#64748B", borderColor: filter === s ? "#6366F1" : "#E2E8F0" }}>
            {s}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "64px 24px", background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
          <p style={{ fontWeight: 700, color: "#0F172A", margin: "0 0 6px" }}>No bookings found</p>
          <p style={{ color: "#94A3B8", fontSize: 14 }}>Try a different filter or book a new service.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(b => (
            <div key={b.id} style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #F1F5F9", padding: "18px 20px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#0F172A" }}>{b.serviceName}</h3>
                  <StatusBadge status={b.status} />
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#64748B" }}>📆 {b.date} at {b.time}</p>
                {b.notes && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94A3B8" }}>Note: {b.notes}</p>}
              </div>
              {b.status !== "cancelled" && (
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <Btn variant="ghost" onClick={() => onReschedule(b)} style={{ padding: "7px 14px", fontSize: 12 }}>Reschedule</Btn>
                  <Btn variant="danger" onClick={() => onCancel(b.id)} style={{ padding: "7px 14px", fontSize: 12 }}>Cancel</Btn>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  ADMIN: DASHBOARD
// ─────────────────────────────────────────────
const AdminDashboard = ({ bookings, services }) => {
  const todayStr = fmt(today);
  const todayBk = bookings.filter(b => b.date === todayStr).length;
  const pending = bookings.filter(b => b.status === "pending").length;
  const approved = bookings.filter(b => b.status === "approved").length;
  const cancelled = bookings.filter(b => b.status === "cancelled").length;
  const recent = [...bookings].sort((a, b) => b.id - a.id).slice(0, 6);

  const statCards = [
    { label: "Total Bookings", value: bookings.length, icon: "📋", bg: "#EEF2FF", iconBg: "#6366F1", col: "#6366F1" },
    { label: "Today's Appointments", value: todayBk, icon: "📅", bg: "#F0FDF4", iconBg: "#10B981", col: "#10B981" },
    { label: "Pending Approval", value: pending, icon: "⏳", bg: "#FFFBEB", iconBg: "#F59E0B", col: "#F59E0B" },
    { label: "Cancelled", value: cancelled, icon: "🚫", bg: "#FFF1F2", iconBg: "#F43F5E", col: "#F43F5E" },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 16, marginBottom: 28 }}>
        {statCards.map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 20, padding: "22px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, background: s.iconBg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{s.icon}</div>
            </div>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "#64748B", fontWeight: 500 }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 900, color: "#0F172A", letterSpacing: "-1px" }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9", padding: 24, gridColumn: "1/-1" }}>
          <h3 style={{ margin: "0 0 18px", fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Recent Bookings</h3>
          <div>
            {recent.map(b => (
              <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #F8FAFC" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#6366F1" }}>
                    {b.clientName.split(" ").map(w=>w[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0F172A" }}>{b.clientName}</p>
                    <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{b.serviceName} · {b.date} {b.time}</p>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ADMIN: SERVICES MANAGER
// ─────────────────────────────────────────────
const AdminServices = ({ services, setServices }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const openAdd = () => { setForm({ name:"", duration:60, price:0, category:"", description:"", icon:"⭐" }); setModal("add"); };
  const openEdit = s => { setForm({...s}); setModal(s.id); };
  const handleDelete = async id => { await delay(400); setServices(p => p.filter(s => s.id !== id)); };
  const handleSave = async () => {
    setLoading(true); await delay(700);
    if (modal === "add") {
      setServices(p => [...p, { ...form, id: Date.now(), price: Number(form.price), duration: Number(form.duration) }]);
    } else {
      setServices(p => p.map(s => s.id === modal ? { ...s, ...form, price: Number(form.price), duration: Number(form.duration) } : s));
    }
    setLoading(false); setModal(null);
  };

  const ICONS = ["✂","💆","💼","✨","🏋","💅","🎨","🧪","📚","🎵"];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <Btn onClick={openAdd}>+ Add Service</Btn>
      </div>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
              {["Service","Category","Duration","Price",""].map(h => (
                <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id} style={{ borderBottom: "1px solid #F8FAFC" }}
                onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, background: "#EEF2FF", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.icon}</div>
                    <div>
                      <p style={{ margin: 0, fontWeight: 700, color: "#0F172A" }}>{s.name}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{s.description.slice(0,42)}…</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 18px" }}><span style={{ background: "#F0FDF4", color: "#166534", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{s.category}</span></td>
                <td style={{ padding: "14px 18px", color: "#64748B" }}>{s.duration}m</td>
                <td style={{ padding: "14px 18px", fontWeight: 800, color: "#0F172A" }}>${s.price}</td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Btn variant="ghost" onClick={() => openEdit(s)} style={{ padding: "6px 12px", fontSize: 12 }}>Edit</Btn>
                    <Btn variant="danger" onClick={() => handleDelete(s.id)} style={{ padding: "6px 12px", fontSize: 12 }}>Delete</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal !== null && (
        <Modal title={modal === "add" ? "Add New Service" : "Edit Service"} onClose={() => setModal(null)}>
          <div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Icon</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ICONS.map(ic => (
                  <button key={ic} onClick={() => setForm(f => ({...f, icon: ic}))}
                    style={{ width: 40, height: 40, borderRadius: 10, border: `1.5px solid ${form.icon === ic ? "#6366F1" : "#E2E8F0"}`, background: form.icon === ic ? "#EEF2FF" : "#fff", fontSize: 18, cursor: "pointer" }}>
                    {ic}
                  </button>
                ))}
              </div>
            </div>
            {[["Service Name","name","text"],["Category","category","text"],["Duration (min)","duration","number"],["Price ($)","price","number"]].map(([label, key, type]) => (
              <Input key={key} label={label} type={type} value={form[key] || ""} onChange={e => setForm(f => ({...f, [key]: e.target.value}))} />
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>Description</label>
              <textarea value={form.description || ""} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3}
                style={{ width: "100%", border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 13px", fontSize: 14, resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <Btn variant="secondary" onClick={() => setModal(null)}>Cancel</Btn>
              <Btn onClick={handleSave} disabled={loading}>{loading ? "Saving…" : "Save Service"}</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  ADMIN: BOOKINGS MANAGER
// ─────────────────────────────────────────────
const AdminBookings = ({ bookings, setBookings }) => {
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [search, setSearch] = useState("");
  const [rsModal, setRsModal] = useState(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const filtered = bookings.filter(b =>
    (filter === "all" || b.status === filter) &&
    (!dateFilter || b.date === dateFilter) &&
    (b.clientName.toLowerCase().includes(search.toLowerCase()) || b.serviceName.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = async (id, status) => {
    await delay(400);
    setBookings(p => p.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleReschedule = () => {
    if (!newDate || !newTime) return;
    setBookings(p => p.map(b => b.id === rsModal.id ? { ...b, date: newDate, time: newTime, status: "pending" } : b));
    setRsModal(null);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input placeholder="Search client or service…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 160, border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 14px", fontSize: 14, outline: "none", background: "#fff" }}
          onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)}
          style={{ border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", background: "#fff" }}
          onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
        <select value={filter} onChange={e => setFilter(e.target.value)}
          style={{ border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "10px 13px", fontSize: 14, outline: "none", background: "#fff", cursor: "pointer" }}>
          {["all","pending","approved","cancelled"].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
        </select>
        {dateFilter && <button onClick={() => setDateFilter("")} style={{ background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: 10, padding: "10px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Clear Date ×</button>}
      </div>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 620 }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #F1F5F9" }}>
              {["Client","Service","Date & Time","Status","Actions"].map(h => (
                <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ padding: "48px", textAlign: "center", color: "#94A3B8" }}>No bookings match your filters.</td></tr>
            ) : filtered.map(b => (
              <tr key={b.id} style={{ borderBottom: "1px solid #F8FAFC" }}
                onMouseEnter={e => e.currentTarget.style.background = "#FAFAFA"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ padding: "14px 18px" }}>
                  <p style={{ margin: 0, fontWeight: 700, color: "#0F172A" }}>{b.clientName}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{b.clientEmail}</p>
                </td>
                <td style={{ padding: "14px 18px", color: "#475569", fontWeight: 500 }}>{b.serviceName}</td>
                <td style={{ padding: "14px 18px" }}>
                  <p style={{ margin: 0, color: "#0F172A", fontWeight: 600 }}>{b.date}</p>
                  <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>{b.time}</p>
                </td>
                <td style={{ padding: "14px 18px" }}><StatusBadge status={b.status} /></td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {b.status === "pending" && <Btn variant="success" onClick={() => updateStatus(b.id, "approved")} style={{ padding: "6px 12px", fontSize: 12 }}>Approve</Btn>}
                    {b.status !== "cancelled" && <Btn variant="danger" onClick={() => updateStatus(b.id, "cancelled")} style={{ padding: "6px 12px", fontSize: 12 }}>Cancel</Btn>}
                    <Btn variant="ghost" onClick={() => { setRsModal(b); setNewDate(b.date); setNewTime(b.time); }} style={{ padding: "6px 12px", fontSize: 12 }}>Reschedule</Btn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rsModal && (
        <Modal title="Reschedule Booking" onClose={() => setRsModal(null)}>
          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "12px 14px", marginBottom: 20, fontSize: 13, color: "#475569" }}>
            <strong>{rsModal.clientName}</strong> — {rsModal.serviceName}
          </div>
          <Input label="New Date" type="date" value={newDate} onChange={e => setNewDate(e.target.value)} />
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>New Time</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {ALL_SLOTS.map(s => (
                <button key={s} onClick={() => setNewTime(s)}
                  style={{ padding: "10px 0", fontSize: 13, fontWeight: 600, borderRadius: 10, border: "1.5px solid", cursor: "pointer",
                    background: newTime === s ? "#6366F1" : "#fff", color: newTime === s ? "#fff" : "#475569", borderColor: newTime === s ? "#6366F1" : "#E2E8F0" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Btn variant="secondary" onClick={() => setRsModal(null)}>Cancel</Btn>
            <Btn onClick={handleReschedule} disabled={!newDate || !newTime}>Save Changes</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  ADMIN: SCHEDULE MANAGER
// ─────────────────────────────────────────────
const AdminSchedule = ({ availableSlots, setAvailableSlots }) => {
  const [selDate, setSelDate] = useState(fmt(today));
  const currentSlots = availableSlots[selDate] !== undefined ? availableSlots[selDate] : ALL_SLOTS;
  const allEnabled = currentSlots.length === ALL_SLOTS.length;

  const toggle = (slot) => {
    const cur = availableSlots[selDate] !== undefined ? availableSlots[selDate] : ALL_SLOTS;
    const updated = cur.includes(slot) ? cur.filter(s => s !== slot) : [...cur, slot].sort();
    setAvailableSlots(p => ({ ...p, [selDate]: updated }));
  };

  const toggleAll = () => {
    setAvailableSlots(p => ({ ...p, [selDate]: allEnabled ? [] : [...ALL_SLOTS] }));
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9", padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800, color: "#0F172A" }}>Time Slot Manager</h3>
            <p style={{ margin: 0, fontSize: 13, color: "#94A3B8" }}>Toggle available slots for each day</p>
          </div>
          <input type="date" value={selDate} onChange={e => setSelDate(e.target.value)}
            style={{ border: "1.5px solid #E2E8F0", borderRadius: 10, padding: "9px 12px", fontSize: 14, outline: "none" }}
            onFocus={e => e.target.style.borderColor = "#6366F1"} onBlur={e => e.target.style.borderColor = "#E2E8F0"} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "10px 14px", background: "#F8FAFC", borderRadius: 12 }}>
          <span style={{ fontSize: 13, color: "#64748B" }}>
            <strong style={{ color: "#6366F1" }}>{currentSlots.length}</strong> / {ALL_SLOTS.length} slots active for <strong>{selDate}</strong>
          </span>
          <button onClick={toggleAll}
            style={{ background: "none", border: "none", color: "#6366F1", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            {allEnabled ? "Disable All" : "Enable All"}
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {ALL_SLOTS.map(slot => {
            const active = currentSlots.includes(slot);
            return (
              <button key={slot} onClick={() => toggle(slot)}
                style={{ padding: "14px 0", borderRadius: 14, border: "2px solid", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                  background: active ? "#6366F1" : "#F8FAFC",
                  color: active ? "#fff" : "#94A3B8",
                  borderColor: active ? "#6366F1" : "#E2E8F0" }}>
                {slot}
                <div style={{ fontSize: 9, marginTop: 2, fontWeight: 500, opacity: 0.7 }}>{active ? "OPEN" : "CLOSED"}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  RESCHEDULE MODAL (CLIENT)
// ─────────────────────────────────────────────
const ClientRescheduleModal = ({ booking, bookings, onSave, onClose }) => {
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const booked = bookings.filter(b => b.date === date && b.id !== booking.id && b.status !== "cancelled").map(b => b.time);

  return (
    <Modal title="Reschedule Appointment" onClose={onClose}>
      <div style={{ background: "#EEF2FF", borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#4338CA" }}>{booking.serviceName}</p>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6366F1" }}>Current: {booking.date} at {booking.time}</p>
      </div>
      <Input label="New Date" type="date" min={fmt(today)} value={date} onChange={e => { setDate(e.target.value); setTime(""); }} />
      {date && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Select New Time</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {ALL_SLOTS.map(s => (
              <button key={s} disabled={booked.includes(s)} onClick={() => setTime(s)}
                style={{ padding: "10px 0", fontSize: 13, fontWeight: 600, borderRadius: 10, border: "1.5px solid", cursor: booked.includes(s) ? "not-allowed" : "pointer",
                  background: booked.includes(s) ? "#F8FAFC" : time === s ? "#6366F1" : "#fff",
                  color: booked.includes(s) ? "#CBD5E1" : time === s ? "#fff" : "#475569",
                  borderColor: booked.includes(s) ? "#F1F5F9" : time === s ? "#6366F1" : "#E2E8F0" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn disabled={!date || !time} onClick={() => onSave(booking.id, date, time)}>Confirm Reschedule</Btn>
      </div>
    </Modal>
  );
};

// ─────────────────────────────────────────────
//  ROOT APP
// ─────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login");
  const [page, setPage] = useState("");
  const [services, setServices] = useState(SERVICES_DATA);
  const [bookings, setBookings] = useState(BOOKINGS_DATA);
  const [availableSlots, setAvailableSlots] = useState({});
  const [selService, setSelService] = useState(null);
  const [rsTarget, setRsTarget] = useState(null);

  const login = (u) => { setUser(u); setPage(u.role === "admin" ? "admin.dashboard" : "client.services"); };
  const logout = () => { setUser(null); setAuthView("login"); setPage(""); };

  const onBook = useCallback((service) => { setSelService(service); setPage("client.book"); }, []);
  const onConfirmBooking = useCallback((data) => {
    setBookings(p => [...p, { id: Date.now(), clientName: user.name, clientEmail: user.email, ...data, status: "pending" }]);
  }, [user]);
  const onCancelBooking = useCallback((id) => setBookings(p => p.map(b => b.id === id ? {...b, status:"cancelled"} : b)), []);
  const onReschedule = useCallback((id, date, time) => {
    setBookings(p => p.map(b => b.id === id ? {...b, date, time, status:"pending"} : b));
    setRsTarget(null);
  }, []);

  if (!user) {
    return authView === "login"
      ? <Login onLogin={login} goRegister={() => setAuthView("register")} />
      : <Register goLogin={() => setAuthView("login")} />;
  }

  const renderPage = () => {
    switch (page) {
      case "client.services":   return <ServicesPage services={services} onBook={onBook} />;
      case "client.book":       return <BookingForm service={selService} bookings={bookings} availableSlots={availableSlots} onConfirm={onConfirmBooking} onCancel={() => setPage("client.services")} />;
      case "client.bookings":   return (
        <>
          <MyBookings bookings={bookings} user={user} onCancel={onCancelBooking} onReschedule={b => setRsTarget(b)} />
          {rsTarget && <ClientRescheduleModal booking={rsTarget} bookings={bookings} onSave={onReschedule} onClose={() => setRsTarget(null)} />}
        </>
      );
      case "admin.dashboard":   return <AdminDashboard bookings={bookings} services={services} />;
      case "admin.services":    return <AdminServices services={services} setServices={setServices} />;
      case "admin.bookings":    return <AdminBookings bookings={bookings} setBookings={setBookings} />;
      case "admin.schedule":    return <AdminSchedule availableSlots={availableSlots} setAvailableSlots={setAvailableSlots} />;
      default:                  return null;
    }
  };

  return (
    <Layout user={user} page={page} setPage={setPage} onLogout={logout}>
      {renderPage()}
    </Layout>
  );
}