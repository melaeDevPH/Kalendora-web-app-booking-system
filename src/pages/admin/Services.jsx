import { useState } from "react";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

// Button component
const Btn = ({ children, onClick, variant = "default", disabled, style }) => {
  const styles = {
    default: { background: "#6366F1", color: "#fff" },
    danger: { background: "#FEE2E2", color: "#991B1B" },
    ghost: { background: "#F1F5F9", color: "#475569" },
  };
  const s = styles[variant] || styles.default;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        border: "none",
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "600",
        fontSize: 12,
        padding: "8px 14px",
        transition: "all 0.2s",
        opacity: disabled ? 0.6 : 1,
        ...s,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === "default") e.target.style.background = "#4F46E5";
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === "default") e.target.style.background = "#6366F1";
      }}
    >
      {children}
    </button>
  );
};

const AdminServices = ({ services, setServices }) => {
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const openAdd = () => {
    setForm({
      name: "",
      duration: 60,
      price: 0,
      category: "",
      description: "",
      icon: "⭐",
    });
    setModal("add");
  };

  const openEdit = (s) => {
    setForm({ ...s });
    setModal(s.id);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await delay(300);
      setServices((p) => p.filter((s) => s.id !== id));
    }
  };

  const handleSave = async () => {
    if (!form.name) {
      alert("Please enter a service name");
      return;
    }
    setLoading(true);
    await delay(400);

    if (modal === "add") {
      setServices((p) => [
        ...p,
        {
          ...form,
          id: Date.now(),
          price: Number(form.price),
          duration: Number(form.duration),
        },
      ]);
    } else {
      setServices((p) =>
        p.map((s) =>
          s.id === modal
            ? {
              ...s,
              ...form,
              price: Number(form.price),
              duration: Number(form.duration),
            }
            : s
        )
      );
    }

    setLoading(false);
    setModal(null);
  };

  const ICONS = ["✂", "💆", "💼", "✨", "🏋", "💅", "🎨", "🧪", "📚", "🎵", "🧘", "❤️"];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: "800",
            color: "#0F172A",
          }}
        >
          ⭐ Services
        </h1>
        <p style={{ margin: 0, color: "#64748B", fontSize: 15 }}>
          Manage your available services
        </p>
      </div>

      {/* ADD BUTTON */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <Btn onClick={openAdd}>+ Add Service</Btn>
      </div>

      {/* SERVICES GRID OR TABLE */}
      {services.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "64px 24px",
            background: "#fff",
            borderRadius: 16,
            border: "1.5px solid #F1F5F9",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 12 }}>➕</div>
          <p
            style={{
              fontWeight: "700",
              color: "#0F172A",
              margin: "0 0 6px",
              fontSize: 16,
            }}
          >
            No services yet
          </p>
          <p style={{ color: "#94A3B8", fontSize: 14, margin: 0 }}>
            Create your first service to get started
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {services.map((s) => (
            <div
              key={s.id}
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1.5px solid #F1F5F9",
                padding: "20px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C7D2FE";
                e.currentTarget.style.boxShadow =
                  "0 4px 16px rgba(99, 102, 241, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#F1F5F9";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Icon & Title */}
              <div style={{ position: "relative", marginBottom: 12 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    background: "#EEF2FF",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    marginBottom: 12,
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    margin: "0 0 4px",
                    fontSize: 16,
                    fontWeight: "800",
                    color: "#0F172A",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#94A3B8",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    fontWeight: "600",
                  }}
                >
                  {s.category}
                </p>
              </div>

              {/* Description */}
              <p
                style={{
                  margin: "0 0 12px",
                  fontSize: 13,
                  color: "#64748B",
                  lineHeight: 1.5,
                  minHeight: 40,
                }}
              >
                {s.description}
              </p>

              {/* Details */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 12,
                  borderBottom: "1px solid #F1F5F9",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div style={{ fontSize: 18, fontWeight: "800", color: "#0F172A" }}>
                    ${s.price}
                  </div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{s.duration}m</div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Btn onClick={() => openEdit(s)}>✏️ Edit</Btn>
                <Btn variant="danger" onClick={() => handleDelete(s.id)}>
                  🗑️ Delete
                </Btn>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modal !== null && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "28px",
              borderRadius: 16,
              width: "100%",
              maxWidth: 480,
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            }}
          >
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: 22,
                fontWeight: "800",
                color: "#0F172A",
              }}
            >
              {modal === "add" ? "➕ Add Service" : "✏️ Edit Service"}
            </h2>

            {/* ICON PICKER */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: "700",
                  color: "#0F172A",
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Select Icon
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
                {ICONS.map((ic) => (
                  <button
                    key={ic}
                    onClick={() => setForm((f) => ({ ...f, icon: ic }))}
                    style={{
                      background: form.icon === ic ? "#6366F1" : "#F1F5F9",
                      border: "1.5px solid" + (form.icon === ic ? "#6366F1" : "#E2E8F0"),
                      borderRadius: 10,
                      padding: "10px",
                      fontSize: 20,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>

            {/* INPUTS */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: "700", color: "#0F172A", display: "block", marginBottom: 6 }}>
                Service Name
              </label>
              <input
                type="text"
                placeholder="e.g., Haircut"
                value={form.name || ""}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                style={{
                  width: "100%",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "11px 14px",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: "700", color: "#0F172A", display: "block", marginBottom: 6 }}>
                Category
              </label>
              <input
                type="text"
                placeholder="e.g., Hair"
                value={form.category || ""}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                style={{
                  width: "100%",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "11px 14px",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: "700", color: "#0F172A", display: "block", marginBottom: 6 }}>
                  Duration (min)
                </label>
                <input
                  type="number"
                  value={form.duration || ""}
                  onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                  style={{
                    width: "100%",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 10,
                    padding: "11px 14px",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: "700", color: "#0F172A", display: "block", marginBottom: 6 }}>
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price || ""}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  style={{
                    width: "100%",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: 10,
                    padding: "11px 14px",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: "700", color: "#0F172A", display: "block", marginBottom: 6 }}>
                Description
              </label>
              <textarea
                placeholder="Describe your service"
                value={form.description || ""}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                style={{
                  width: "100%",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  padding: "11px 14px",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
              />
            </div>

            {/* ACTIONS */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setModal(null)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "1.5px solid #E2E8F0",
                  borderRadius: 10,
                  background: "#fff",
                  color: "#475569",
                  fontSize: 14,
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#F8FAFC")}
                onMouseLeave={(e) => (e.target.style.background = "#fff")}
              >
                Cancel
              </button>
              <Btn
                onClick={handleSave}
                disabled={loading}
                style={{ flex: 1, padding: "12px 16px" }}
              >
                {loading ? "Saving..." : "Save"}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;