import { useState } from "react";
import { serviceStyles as s, serviceHover as hover } from "./styles/services";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

/* ── Sub-components ───────────────────────────────────────────── */

const Btn = ({ children, onClick, variant = "edit", disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{ ...s.btn.base, ...s.btn[variant], opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    onMouseEnter={(e) => !disabled && hover.btnEnter(e.currentTarget)}
    onMouseLeave={(e) => !disabled && hover.btnLeave(e.currentTarget)}
  >
    {children}
  </button>
);

const FormField = ({ label, children, style }) => (
  <div style={{ ...s.modal.fieldGap, ...style }}>
    <label style={s.modal.label}>{label}</label>
    {children}
  </div>
);

const FormInput = ({ type = "text", value, onChange, placeholder, step }) => (
  <input
    type={type}
    step={step}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={s.modal.input}
    onFocus={(e) => hover.inputFocus(e.target)}
    onBlur={(e)  => hover.inputBlur(e.target)}
  />
);

const ServiceCard = ({ service, onEdit, onDelete }) => (
  <div
    style={s.card.wrapper}
    onMouseEnter={(e) => hover.cardEnter(e.currentTarget)}
    onMouseLeave={(e) => hover.cardLeave(e.currentTarget)}
  >
    
    <h3 style={s.card.name}>{service.name}</h3>
    <p style={s.card.category}>{service.category}</p>
    <p style={s.card.description}>{service.description}</p>

    <div style={s.card.detailsRow}>
      <div>
        <div style={s.card.price}>${service.price}</div>
        <div style={s.card.duration}>{service.duration} min</div>
      </div>
    </div>

    <div style={s.card.actionRow}>
      <Btn variant="edit"   onClick={() => onEdit(service)}>Edit</Btn>
      <Btn variant="delete" onClick={() => onDelete(service.id)}>Delete</Btn>
    </div>
  </div>
);

/* ── Main component ───────────────────────────────────────────── */

const AdminServices = ({ services, setServices }) => {
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState({});
  const [loading, setLoading] = useState(false);

  const field = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const openAdd = () => {
    setForm({ name: "", duration: 60, price: 0, category: "", description: "", icon: "fa-star" });
    setModal("add");
  };

  const openEdit = (svc) => { setForm({ ...svc }); setModal(svc.id); };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    await delay(300);
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSave = async () => {
    if (!form.name) { alert("Please enter a service name"); return; }
    setLoading(true);
    await delay(400);

    if (modal === "add") {
      setServices((prev) => [
        ...prev,
        { ...form, id: Date.now(), price: Number(form.price), duration: Number(form.duration) },
      ]);
    } else {
      setServices((prev) =>
        prev.map((svc) =>
          svc.id === modal
            ? { ...svc, ...form, price: Number(form.price), duration: Number(form.duration) }
            : svc
        )
      );
    }

    setLoading(false);
    setModal(null);
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={s.header.wrapper}>
        <h1 style={s.header.title}>Services</h1>
        <p style={s.header.subtitle}>Manage your available services</p>
      </div>

      {/* Add button */}
      <div style={s.addRow}>
        <button
          style={s.addBtn}
          onClick={openAdd}
          onMouseEnter={(e) => hover.btnEnter(e.currentTarget)}
          onMouseLeave={(e) => hover.btnLeave(e.currentTarget)}
        >
          + Add Service
        </button>
      </div>

      {/* Empty state */}
      {services.length === 0 ? (
        <div style={s.empty.wrapper}>
          <p style={s.empty.title}>No services yet</p>
          <p style={s.empty.sub}>Create your first service to get started</p>
        </div>
      ) : (
        <div style={s.grid}>
          {services.map((svc) => (
            <ServiceCard key={svc.id} service={svc} onEdit={openEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Modal */}
      {modal !== null && (
        <div style={s.modal.overlay}>
          <div style={s.modal.box}>
            <h2 style={s.modal.title}>
              {modal === "add" ? "Add Service" : "Edit Service"}
            </h2>

          
            <FormField label="Service Name">
              <FormInput value={form.name || ""} onChange={field("name")} placeholder="e.g., Haircut" />
            </FormField>

            <FormField label="Category">
              <FormInput value={form.category || ""} onChange={field("category")} placeholder="e.g., Hair" />
            </FormField>

            <div style={s.modal.twoCol}>
              <FormField label="Duration (min)" style={{ marginBottom: 0 }}>
                <FormInput type="number" value={form.duration || ""} onChange={field("duration")} />
              </FormField>
              <FormField label="Price ($)" style={{ marginBottom: 0 }}>
                <FormInput type="number" step="0.01" value={form.price || ""} onChange={field("price")} />
              </FormField>
            </div>

            <FormField label="Description">
              <textarea
                value={form.description || ""}
                onChange={field("description")}
                placeholder="Describe your service"
                rows={3}
                style={{ ...s.modal.input, resize: "vertical" }}
                onFocus={(e) => hover.inputFocus(e.target)}
                onBlur={(e)  => hover.inputBlur(e.target)}
              />
            </FormField>

            <div style={s.modal.actionRow}>
              <button
                onClick={() => setModal(null)}
                style={s.btn.cancel}
                onMouseEnter={(e) => hover.cancelEnter(e.currentTarget)}
                onMouseLeave={(e) => hover.cancelLeave(e.currentTarget)}
              >
                Cancel
              </button>
              <Btn variant="save" onClick={handleSave} disabled={loading}>
                {loading ? "Saving…" : "Save"}
              </Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;