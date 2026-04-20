import { useState } from "react";

// Mock delay for better UX
const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

// 🔥 CLEAN AUTH LAYOUT - Responsive
const AuthLayout = ({ children }) => (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #EEF2FF 0%, #F0FDF4 50%, #FFF7ED 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}
  >
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        padding: "40px 30px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
      }}
      className="auth-card"
    >
      {children}
    </div>
    <style>{`
      @media (max-width: 480px) {
        .auth-card {
          border-radius: 16px !important;
          padding: 32px 20px !important;
        }
      }
    `}</style>
  </div>
);

export default function Register({ goLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }
    setLoading(true);
    await delay(600);
    alert("✅ Account created successfully! Redirecting to login...");
    goLogin();
    setLoading(false);
  };

  return (
    <AuthLayout>
      {/* TITLE */}
      <h2 style={{ marginBottom: 8, fontWeight: "800", color: "#0F172A", fontSize: 24 }}>
        Create Account 🚀
      </h2>
      <p style={{ margin: "0 0 24px", fontSize: 13, color: "#64748B" }}>
        Join Kalendora to manage your appointments
      </p>

      {/* NAME */}
      <input
        type="text"
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{
          width: "100%",
          padding: "12px 14px",
          marginBottom: 12,
          borderRadius: 10,
          border: "1.5px solid #E2E8F0",
          outline: "none",
          fontSize: 14,
          boxSizing: "border-box",
          background: "#fff",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
      />

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        style={{
          width: "100%",
          padding: "12px 14px",
          marginBottom: 12,
          borderRadius: 10,
          border: "1.5px solid #E2E8F0",
          outline: "none",
          fontSize: 14,
          boxSizing: "border-box",
          background: "#fff",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password (min 6 chars)"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={{
          width: "100%",
          padding: "12px 14px",
          marginBottom: 20,
          borderRadius: 10,
          border: "1.5px solid #E2E8F0",
          outline: "none",
          fontSize: 14,
          boxSizing: "border-box",
          background: "#fff",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
        onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 10,
          border: "none",
          background: loading ? "#CBD5E1" : "#6366F1",
          color: "#fff",
          fontWeight: "600",
          fontSize: 15,
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.target.style.background = "#4F46E5";
        }}
        onMouseLeave={(e) => {
          if (!loading) e.target.style.background = "#6366F1";
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>

      {/* LOGIN */}
      <p style={{ marginTop: 16, fontSize: 13, color: "#64748B", textAlign: "center" }}>
        Already have an account?{" "}
        <span
          onClick={goLogin}
          style={{
            color: "#6366F1",
            fontWeight: "600",
            cursor: "pointer",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#4F46E5")}
          onMouseLeave={(e) => (e.target.style.color = "#6366F1")}
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
}