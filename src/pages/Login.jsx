import { useState } from "react";

// mock delay + users (keep for now)
const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

const MOCK_USERS = [
  { id: 1, name: "Admin User", email: "admin@demo.com", password: "admin", role: "admin" },
  { id: 2, name: "John Client", email: "john@demo.com", password: "john", role: "client" },
];

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

export default function Login({ onLogin, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await delay(600);

    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) onLogin(user);
    else alert("Invalid credentials");

    setLoading(false);
  };

  return (
    <AuthLayout>
      {/* TITLE */}
      <h2
        style={{
          marginBottom: 20,
          fontWeight: "700",
          color: "#0F172A",
        }}
      >
        Welcome Back 👋
      </h2>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: 12,
          borderRadius: 10,
          border: "1px solid #E2E8F0",
          outline: "none",
          fontSize: 14,
        }}
      />

      {/* PASSWORD */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: 16,
          borderRadius: 10,
          border: "1px solid #E2E8F0",
          outline: "none",
          fontSize: 14,
        }}
      />

      {/* BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: 10,
          border: "none",
          background: "#6366F1",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
          opacity: loading ? 0.6 : 1,
        }}
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {/* REGISTER */}
      <p
        style={{
          marginTop: 16,
          fontSize: 13,
          color: "#64748B",
          textAlign: "center",
        }}
      >
        No account?{" "}
        <span
          onClick={goRegister}
          style={{
            color: "#6366F1",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Register
        </span>
      </p>

      {/* DEMO ACCOUNTS */}
      <div
        style={{
          marginTop: 20,
          fontSize: 12,
          background: "#F8FAFC",
          padding: 10,
          borderRadius: 8,
          color: "#475569",
        }}
      >
        <strong>Demo:</strong><br />
        admin@demo.com / admin<br />
        john@demo.com / john
      </div>
    </AuthLayout>
  );
}

