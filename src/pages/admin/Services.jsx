import { useState, useMemo } from "react";
import { serviceStyles as s, serviceHover as hover, accent } from "./styles/services";

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

/* ── Sample seed data ─────────────────────────────────────────── */

const BUNDLE_COLOR_MAP = {
  "Wedding":     "#E8B4C8",
  "Corporate":   "#93C5FD",
  "Debut":       "#C4B5FD",
  "Birthday":    "#FCD34D",
  "Christening": "#6EE7B7",
  "Other":       "#CBD5E1",
};

const CATEGORIES = ["Wedding", "Corporate", "Debut", "Birthday", "Christening", "Other"];

export const SEED_BUNDLES = [
  {
    id: 1, type: "bundle",
    name: "Grand Wedding Package",
    category: "Wedding", popular: true,
    description: "Our all-inclusive wedding experience — from ceremony design to honeymoon send-off. Everything handled, nothing left to chance.",
    includes: ["Ceremony & Reception Venue Design", "Photography & Videography", "Bridal Hair & Makeup", "Wedding Cake & Buffet", "Floral Arrangements", "Hotel Accommodation (2 nights)", "Emcee & Host", "Sound & Lights"],
    price: 280000,
  },
  {
    id: 2, type: "bundle",
    name: "Intimate Debut Package",
    category: "Debut", popular: true,
    description: "A stunning 18th birthday celebration crafted with elegance. Includes everything for a night the debutante will never forget.",
    includes: ["Venue Styling & Décor", "Photo & Video Coverage", "Hair, Makeup & Gown", "18 Roses & Candles Coordination", "Catering (100 pax)", "Debut Cake", "DJ & Sound System"],
    price: 120000,
  },
  {
    id: 3, type: "bundle",
    name: "Corporate Gala Package",
    category: "Corporate", popular: false,
    description: "Professional event management for galas, product launches, and company milestones. Polished, on-brand, and seamless.",
    includes: ["Venue Sourcing & Setup", "AV & Stage Production", "Corporate Photography", "Buffet & Cocktail Service", "Emcee & Program Flow", "Branded Photo Backdrop"],
    price: 150000,
  },
  {
    id: 4, type: "bundle",
    name: "Birthday Celebration Bundle",
    category: "Birthday", popular: false,
    description: "Make every birthday unforgettable with a fully coordinated party package — from décor to entertainment.",
    includes: ["Theme Décor & Styling", "Photo Coverage", "Birthday Cake", "Catering (50 pax)", "Party Host / Emcee", "Balloon & Floral Setup"],
    price: 55000,
  },
  {
    id: 5, type: "bundle",
    name: "Christening Package",
    category: "Christening", popular: false,
    description: "A heartfelt and beautifully styled christening celebration for your little one's special day.",
    includes: ["Venue Décor & Styling", "Photo & Video Coverage", "Christening Cake", "Catering (80 pax)", "Souvenir & Token Setup"],
    price: 45000,
  },
];

export const SEED_SERVICES = [
  { id: 101, type: "service", name: "Photography Coverage",     category: "Media",         description: "Professional photographers capturing every candid and posed moment of your event.",    price: 18000, duration: 480, icon: "📷", iconBg: "#EDE8FC" },
  { id: 102, type: "service", name: "Videography & SDE",        category: "Media",         description: "Full event video coverage plus a Same Day Edit screened during the reception.",        price: 22000, duration: 480, icon: "🎬", iconBg: "#DFF0FB" },
  { id: 103, type: "service", name: "Bridal Hair & Makeup",     category: "Beauty",        description: "Glam team for the bride and entourage — from airbrush foundation to elaborate updos.", price: 12000, duration: 240, icon: "💄", iconBg: "#FDE8F0" },
  { id: 104, type: "service", name: "Floral Arrangements",      category: "Décor",         description: "Custom floral designs for ceremonies, receptions, and table centerpieces.",             price: 15000, duration: 300, icon: "💐", iconBg: "#DFF4EC" },
  { id: 105, type: "service", name: "Emcee / Host",             category: "Entertainment", description: "Experienced and personable emcee to run your program with energy and professionalism.", price: 8000,  duration: 360, icon: "🎙️", iconBg: "#FBF3DC" },
  { id: 106, type: "service", name: "DJ & Sound System",        category: "Entertainment", description: "Pro DJ with full PA system, dance floor lighting, and curated playlist coordination.",  price: 12000, duration: 480, icon: "🎧", iconBg: "#EDE8FC" },
  { id: 107, type: "service", name: "Venue Styling & Décor",    category: "Décor",         description: "Complete venue transformation including drapes, lighting, and thematic installations.",  price: 35000, duration: 600, icon: "✨", iconBg: "#FBF3DC" },
  { id: 108, type: "service", name: "Buffet Catering (100 pax)",category: "Food",          description: "Plated or buffet service with full setup, staffing, and customizable menu options.",    price: 30000, duration: 300, icon: "🍽️", iconBg: "#DFF4EC" },
  { id: 109, type: "service", name: "Hotel Accommodation",      category: "Lodging",       description: "Coordinated room blocks at partner hotels for the couple and VIP guests.",               price: 20000, duration: 0,   icon: "🏨", iconBg: "#DFF0FB" },
  { id: 110, type: "service", name: "Custom Event Cake",        category: "Food",          description: "Artisan multi-tiered cakes designed to match your event theme and color palette.",       price: 7500,  duration: 0,   icon: "🎂", iconBg: "#FDE8F0" },
];

/* ── Helpers ──────────────────────────────────────────────────── */

const fmt = (n) => "₱" + Number(n).toLocaleString("en-PH");

const categoryAccent = (cat) => {
  const map = {
    Wedding: accent.rose, Corporate: accent.sky, Debut: accent.violet,
    Birthday: accent.gold, Christening: accent.emerald, Other: accent.slate,
    Media: accent.sky, Beauty: accent.rose, Décor: accent.gold,
    Entertainment: accent.violet, Food: accent.emerald, Lodging: accent.slate,
  };
  return map[cat] || accent.slate;
};

/* ── Shared atoms ─────────────────────────────────────────────── */

const Btn = ({ children, onClick, variant = "edit", disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{ ...s.btn.base, ...s.btn[variant], opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
    onMouseEnter={(e) => !disabled && hover.btnEnter(e.currentTarget)}
    onMouseLeave={(e) => !disabled && hover.btnLeave(e.currentTarget)}
  >
    {children}
  </button>
);

const SectionDivider = ({ label }) => (
  <div style={s.sectionHeader.wrapper}>
    <span style={s.sectionHeader.label}>{label}</span>
    <div style={s.sectionHeader.line} />
  </div>
);

/* ── Bundle Card ──────────────────────────────────────────────── */

const BundleCard = ({ bundle, onEdit, onDelete }) => {
  const bannerColor = BUNDLE_COLOR_MAP[bundle.category] || "#C4B5FD";
  const ac = categoryAccent(bundle.category);
  return (
    <div
      style={s.bundle.wrapper}
      onMouseEnter={(e) => hover.cardEnter(e.currentTarget)}
      onMouseLeave={(e) => hover.cardLeave(e.currentTarget)}
    >
      <div style={s.bundle.banner(bannerColor)} />
      <div style={s.bundle.body}>
        <div style={s.bundle.topRow}>
          <div style={s.bundle.badgeRow}>
            <span style={s.bundle.badge(ac)}>{bundle.category}</span>
            {bundle.popular && <span style={s.bundle.popularBadge}>⭐ Popular</span>}
          </div>
        </div>

        <h3 style={s.bundle.name}>{bundle.name}</h3>
        <p style={s.bundle.description}>{bundle.description}</p>

        {/* Includes list */}
        {bundle.includes?.length > 0 && (
          <div style={s.bundle.includes}>
            <p style={s.bundle.includesTitle}>What's Included</p>
            {bundle.includes.map((item, i) => (
              <div key={i} style={s.bundle.includesItem}>
                <span style={s.bundle.checkDot} />
                {item}
              </div>
            ))}
          </div>
        )}

        <div style={s.bundle.footer}>
          <div>
            <div style={s.bundle.price}>{fmt(bundle.price)}</div>
            <div style={s.bundle.priceLabel}>full package</div>
          </div>
          <div style={s.bundle.actionRow}>
            <Btn variant="edit"   onClick={() => onEdit(bundle)}>Edit</Btn>
            <Btn variant="delete" onClick={() => onDelete(bundle.id, "bundle")}>Delete</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Solo Service Card ────────────────────────────────────────── */

const ServiceCard = ({ service, onEdit, onDelete }) => {
  const ac = categoryAccent(service.category);
  return (
    <div
      style={s.service.wrapper}
      onMouseEnter={(e) => hover.cardEnter(e.currentTarget)}
      onMouseLeave={(e) => hover.cardLeave(e.currentTarget)}
    >
      <div style={s.service.topRow}>
        <div style={s.service.iconBox(service.iconBg || "#F3F0FF")}>
          {service.icon || "🎪"}
        </div>
        <span style={s.bundle.badge(ac)}>{service.category}</span>
      </div>
      <h3 style={s.service.name}>{service.name}</h3>
      <p style={s.service.description}>{service.description}</p>

      <div style={s.service.footer}>
        <div>
          <div style={s.service.price}>{fmt(service.price)}</div>
          {service.duration > 0 && (
            <div style={s.service.duration}>{service.duration} min</div>
          )}
        </div>
        <div style={s.service.actionRow}>
          <Btn variant="edit"   onClick={() => onEdit(service)}>Edit</Btn>
          <Btn variant="delete" onClick={() => onDelete(service.id, "service")}>Delete</Btn>
        </div>
      </div>
    </div>
  );
};

/* ── Add / Edit Modal ─────────────────────────────────────────── */

const BLANK_BUNDLE = {
  type: "bundle", name: "", category: "Wedding",
  description: "", includes: [], price: 0, popular: false,
};
const BLANK_SERVICE = {
  type: "service", name: "", category: "Media",
  description: "", price: 0, duration: 60, icon: "🎪", iconBg: "#F3F0FF",
};

const ServiceModal = ({ item, onClose, onSave, loading }) => {
  const isEdit = !!item?.id;
  const [form, setForm]             = useState(item || BLANK_BUNDLE);
  const [includeInput, setInclude]  = useState("");

  const f = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const addInclude = () => {
    if (!includeInput.trim()) return;
    setForm(prev => ({ ...prev, includes: [...(prev.includes || []), includeInput.trim()] }));
    setInclude("");
  };

  const removeInclude = (i) =>
    setForm(prev => ({ ...prev, includes: prev.includes.filter((_, idx) => idx !== i) }));

  return (
    <div style={s.modal.overlay} onClick={onClose}>
      <div style={s.modal.box} onClick={(e) => e.stopPropagation()}>

        {/* Title row */}
        <div style={s.modal.titleRow}>
          <h2 style={s.modal.title}>
            {isEdit ? "Edit" : "Add"} {form.type === "bundle" ? "Bundle" : "Service"}
          </h2>
          <button style={s.modal.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Type toggle (add mode only) */}
        {!isEdit && (
          <div style={s.modal.typeToggle}>
            {["bundle", "service"].map(t => (
              <button
                key={t}
                style={s.modal.typeBtn(form.type === t)}
                onClick={() => setForm(t === "bundle" ? { ...BLANK_BUNDLE } : { ...BLANK_SERVICE })}
              >
                {t === "bundle" ? "📦 Bundle Package" : "🎯 Solo Service"}
              </button>
            ))}
          </div>
        )}

        {/* Name */}
        <div style={s.modal.fieldGap}>
          <label style={s.modal.label}>
            {form.type === "bundle" ? "Package Name" : "Service Name"}
          </label>
          <input
            value={form.name || ""}
            onChange={f("name")}
            placeholder={form.type === "bundle" ? "e.g., Grand Wedding Package" : "e.g., Photography Coverage"}
            style={s.modal.input}
            onFocus={(e) => hover.inputFocus(e.target)}
            onBlur={(e)  => hover.inputBlur(e.target)}
          />
        </div>

        {/* Category */}
        <div style={s.modal.fieldGap}>
          <label style={s.modal.label}>Category</label>
          <select
            value={form.category || ""}
            onChange={f("category")}
            style={{ ...s.modal.input, cursor: "pointer" }}
          >
            {(form.type === "bundle"
              ? CATEGORIES
              : ["Media", "Beauty", "Décor", "Entertainment", "Food", "Lodging", "Other"]
            ).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Price + Duration (service only) */}
        <div style={s.modal.twoCol}>
          <div style={{ marginBottom: 0 }}>
            <label style={s.modal.label}>Price (₱)</label>
            <input
              type="number"
              value={form.price || ""}
              onChange={f("price")}
              style={s.modal.input}
              onFocus={(e) => hover.inputFocus(e.target)}
              onBlur={(e)  => hover.inputBlur(e.target)}
            />
          </div>
          {form.type === "service" && (
            <div style={{ marginBottom: 0 }}>
              <label style={s.modal.label}>Duration (min)</label>
              <input
                type="number"
                value={form.duration || ""}
                onChange={f("duration")}
                style={s.modal.input}
                onFocus={(e) => hover.inputFocus(e.target)}
                onBlur={(e)  => hover.inputBlur(e.target)}
              />
            </div>
          )}
          {form.type === "bundle" && (
            <div style={{ marginBottom: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <label style={{ ...s.modal.label, marginBottom: 10 }}>
                <input
                  type="checkbox"
                  checked={!!form.popular}
                  onChange={(e) => setForm(prev => ({ ...prev, popular: e.target.checked }))}
                  style={{ marginRight: 6 }}
                />
                Mark as Popular
              </label>
            </div>
          )}
        </div>

        {/* Description */}
        <div style={s.modal.fieldGap}>
          <label style={s.modal.label}>Description</label>
          <textarea
            value={form.description || ""}
            onChange={f("description")}
            placeholder="Describe this offering…"
            rows={3}
            style={{ ...s.modal.input, resize: "vertical" }}
            onFocus={(e) => hover.inputFocus(e.target)}
            onBlur={(e)  => hover.inputBlur(e.target)}
          />
        </div>

        {/* Includes (bundle only) */}
        {form.type === "bundle" && (
          <>
            <p style={s.modal.sectionLabel}>What's Included</p>
            <div style={s.modal.includesRow}>
              <input
                value={includeInput}
                onChange={(e) => setInclude(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addInclude()}
                placeholder="e.g., Bridal Hair & Makeup"
                style={s.modal.includesInput}
                onFocus={(e) => hover.inputFocus(e.target)}
                onBlur={(e)  => hover.inputBlur(e.target)}
              />
              <button style={s.modal.addIncludesBtn} onClick={addInclude}>+ Add</button>
            </div>
            <div style={s.modal.includesList}>
              {(form.includes || []).map((item, i) => (
                <div key={i} style={s.modal.includesTag}>
                  {item}
                  <button style={s.modal.removeBtn} onClick={() => removeInclude(i)}>✕</button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Icon (service only) */}
        {form.type === "service" && (
          <>
            <div style={s.modal.fieldGap}>
              <label style={s.modal.label}>Emoji Icon</label>
              <input
                value={form.icon || ""}
                onChange={f("icon")}
                placeholder="e.g., 📷"
                style={{ ...s.modal.input, fontSize: 18, width: 80 }}
                onFocus={(e) => hover.inputFocus(e.target)}
                onBlur={(e)  => hover.inputBlur(e.target)}
              />
            </div>
          </>
        )}

        {/* Actions */}
        <div style={s.modal.actionRow}>
          <button
            onClick={onClose}
            style={s.btn.cancel}
            onMouseEnter={(e) => hover.cancelEnter(e.currentTarget)}
            onMouseLeave={(e) => hover.cancelLeave(e.currentTarget)}
          >
            Cancel
          </button>
          <Btn variant="save" onClick={() => onSave(form)} disabled={loading}>
            {loading ? "Saving…" : isEdit ? "Save Changes" : "Add"}
          </Btn>
        </div>
      </div>
    </div>
  );
};

/* ── Main component ───────────────────────────────────────────── */

const AdminServices = ({
  bundles:   bundlesProp   = SEED_BUNDLES,
  services:  servicesProp  = SEED_SERVICES,
  setBundles:  setBundlesProp,
  setServices: setServicesProp,
}) => {
  // Allow standalone use with internal state if no props provided
  const [_bundles,  _setBundles]  = useState(bundlesProp);
  const [_services, _setServices] = useState(servicesProp);
  const bundles    = setBundlesProp  ? bundlesProp  : _bundles;
  const services   = setServicesProp ? servicesProp : _services;
  const setBundles  = setBundlesProp  || _setBundles;
  const setServices = setServicesProp || _setServices;

  const [tab,     setTab]     = useState("all");
  const [search,  setSearch]  = useState("");
  const [catFilter, setCat]   = useState("all");
  const [modal,   setModal]   = useState(null); // null | "add" | item object
  const [loading, setLoading] = useState(false);

  /* ── Filtered lists ── */
  const filteredBundles = useMemo(() => bundles.filter(b =>
    (catFilter === "all" || b.category === catFilter) &&
    (b.name.toLowerCase().includes(search.toLowerCase()) ||
     b.description.toLowerCase().includes(search.toLowerCase()))
  ), [bundles, catFilter, search]);

  const filteredServices = useMemo(() => services.filter(s =>
    (catFilter === "all" || s.category === catFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) ||
     s.description.toLowerCase().includes(search.toLowerCase()))
  ), [services, catFilter, search]);

  /* ── CRUD ── */
  const handleDelete = async (id, type) => {
    if (!confirm(`Delete this ${type}?`)) return;
    await delay(300);
    if (type === "bundle")  setBundles(prev => prev.filter(b => b.id !== id));
    else                    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleSave = async (form) => {
    if (!form.name) { alert("Please enter a name."); return; }
    setLoading(true);
    await delay(400);

    const isEdit = !!modal?.id;
    const withNums = { ...form, price: Number(form.price), duration: Number(form.duration || 0) };

    if (form.type === "bundle") {
      if (isEdit) setBundles(prev => prev.map(b => b.id === modal.id ? { ...b, ...withNums } : b));
      else        setBundles(prev => [...prev, { ...withNums, id: Date.now() }]);
    } else {
      if (isEdit) setServices(prev => prev.map(s => s.id === modal.id ? { ...s, ...withNums } : s));
      else        setServices(prev => [...prev, { ...withNums, id: Date.now() }]);
    }

    setLoading(false);
    setModal(null);
  };

  /* ── Stats ── */
  const totalRevPotential = [...bundles, ...services].reduce((s, i) => s + Number(i.price), 0);
  const popularCount = bundles.filter(b => b.popular).length;

  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header.wrapper}>
        <div style={s.header.top}>
          <div>
      
            <h1 style={s.header.title}>Services & Packages</h1>
            <p style={s.header.subtitle}>Manage bundles and offers</p>
          </div>
          <button
            style={s.addBtn}
            onClick={() => setModal({ type: "bundle" })}
            onMouseEnter={(e) => hover.btnEnter(e.currentTarget)}
            onMouseLeave={(e) => hover.btnLeave(e.currentTarget)}
          >
            + Add New
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div style={s.statsStrip.wrapper}>
        {[
          { label: "Total Packages",    value: bundles.length,   sub: "bundle offerings" },
          { label: "Solo Services",     value: services.length,  sub: "à la carte items" },
          { label: "Popular Packages",  value: popularCount,     sub: "featured bundles" },
          { label: "Price Range",       value: `₱${(Math.min(...[...bundles,...services].map(i=>i.price))/1000).toFixed(0)}k–₱${(Math.max(...[...bundles,...services].map(i=>i.price))/1000).toFixed(0)}k`, sub: "min to max" },
        ].map((st, i) => (
          <div key={i} style={s.statsStrip.card}>
            <p style={s.statsStrip.label}>{st.label}</p>
            <p style={s.statsStrip.value}>{st.value}</p>
            <p style={s.statsStrip.sub}>{st.sub}</p>
          </div>
        ))}
      </div>

      {/* Tab strip */}
      <div style={s.tabs.wrapper}>
        {[
          { key: "all",     label: "All",     icon: "fa-th" },
          { key: "bundles", label: "Bundles", icon: "fa-box-open" },
          { key: "services",label: "Services",icon: "fa-concierge-bell" },
        ].map(t => (
          <button key={t.key} style={s.tabs.btn(tab === t.key)} onClick={() => setTab(t.key)}>
            <i className={`fas ${t.icon}`} style={{ fontSize: 11, pointerEvents: "none" }} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={s.filters.wrapper}>
        <div style={{ position: "relative", flex: "1 1 220px" }}>
          <i className="fas fa-search" style={{
            position: "absolute", left: 12, top: "50%",
            transform: "translateY(-50%)", fontSize: 11,
            color: "#ccc", pointerEvents: "none",
          }} />
          <input
            placeholder="Search packages or services…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={s.filters.search}
            onFocus={(e) => hover.inputFocus(e.target)}
            onBlur={(e)  => hover.inputBlur(e.target)}
          />
        </div>
        <select
          value={catFilter}
          onChange={(e) => setCat(e.target.value)}
          style={s.filters.select}
        >
          <option value="all">All Categories</option>
          {[...CATEGORIES, "Media", "Beauty", "Décor", "Entertainment", "Food", "Lodging"].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* ── Bundles section ── */}
      {(tab === "all" || tab === "bundles") && (
        <>
          <SectionDivider label={`Bundle Packages — ${filteredBundles.length}`} />
          {filteredBundles.length === 0 ? (
            <div style={{ ...s.empty.wrapper, marginBottom: 28 }}>
              <p style={s.empty.title}>No bundles found</p>
              <p style={s.empty.sub}>Try adjusting your search or add a new bundle</p>
            </div>
          ) : (
            <div style={s.bundle.grid}>
              {filteredBundles.map(b => (
                <BundleCard key={b.id} bundle={b} onEdit={setModal} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Solo services section ── */}
      {(tab === "all" || tab === "services") && (
        <>
          <SectionDivider label={`À La Carte Services — ${filteredServices.length}`} />
          {filteredServices.length === 0 ? (
            <div style={s.empty.wrapper}>
              <p style={s.empty.title}>No services found</p>
              <p style={s.empty.sub}>Try adjusting your search or add a new service</p>
            </div>
          ) : (
            <div style={s.service.grid}>
              {filteredServices.map(sv => (
                <ServiceCard key={sv.id} service={sv} onEdit={setModal} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {modal !== null && (
        <ServiceModal
          item={modal?.id ? modal : null}
          onClose={() => setModal(null)}
          onSave={handleSave}
          loading={loading}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap');
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

export default AdminServices;