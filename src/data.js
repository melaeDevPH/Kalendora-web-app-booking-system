// ─────────────────────────────────────────────
//  MOCK DATA
// ─────────────────────────────────────────────
const today = new Date();
export const fmt = (d) => d.toISOString().split("T")[0];
export const addDays = (d, n) => {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
};

export const SERVICES_DATA = [
  { id: 1, name: "Haircut & Styling", duration: 60, price: 45, category: "Hair", description: "Professional cut and style tailored to your preferences and face shape.", icon: "✂" },
  { id: 2, name: "Deep Tissue Massage", duration: 90, price: 85, category: "Wellness", description: "Targeted muscle relief and stress reduction with deep-pressure techniques.", icon: "💆" },
  { id: 3, name: "Business Consultation", duration: 45, price: 120, category: "Consulting", description: "One-on-one strategy session to grow and optimize your business.", icon: "💼" },
  { id: 4, name: "Facial Treatment", duration: 60, price: 65, category: "Skincare", description: "Rejuvenating facial for cleaner, glowing, and healthier-looking skin.", icon: "✨" },
  { id: 5, name: "Personal Training", duration: 60, price: 75, category: "Fitness", description: "Custom workout session designed around your goals and fitness level.", icon: "🏋" },
  { id: 6, name: "Nail Art Session", duration: 75, price: 55, category: "Beauty", description: "Creative nail designs with premium gel and acrylic materials.", icon: "💅" },
];

export const ALL_SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

export const BOOKINGS_DATA = [
  { id: 1, clientName: "Alice Johnson", clientEmail: "alice@demo.com", serviceId: 1, serviceName: "Haircut & Styling", date: fmt(addDays(today, 1)), time: "10:00", status: "approved", notes: "" },
  { id: 2, clientName: "Bob Smith", clientEmail: "bob@demo.com", serviceId: 2, serviceName: "Deep Tissue Massage", date: fmt(addDays(today, 1)), time: "14:00", status: "pending", notes: "First visit" },
  { id: 3, clientName: "Carol White", clientEmail: "carol@demo.com", serviceId: 3, serviceName: "Business Consultation", date: fmt(addDays(today, 2)), time: "11:00", status: "approved", notes: "" },
  { id: 4, clientName: "David Lee", clientEmail: "david@demo.com", serviceId: 4, serviceName: "Facial Treatment", date: fmt(addDays(today, -1)), time: "09:00", status: "cancelled", notes: "" },
  { id: 5, clientName: "John Client", clientEmail: "john@demo.com", serviceId: 1, serviceName: "Haircut & Styling", date: fmt(addDays(today, 3)), time: "15:00", status: "pending", notes: "" },
  { id: 6, clientName: "John Client", clientEmail: "john@demo.com", serviceId: 3, serviceName: "Business Consultation", date: fmt(today), time: "10:00", status: "approved", notes: "Bring portfolio" },
  { id: 7, clientName: "Emma Wilson", clientEmail: "emma@demo.com", serviceId: 5, serviceName: "Personal Training", date: fmt(addDays(today, 2)), time: "09:00", status: "pending", notes: "" },
  { id: 8, clientName: "Frank Miller", clientEmail: "frank@demo.com", serviceId: 6, serviceName: "Nail Art Session", date: fmt(addDays(today, 4)), time: "13:00", status: "approved", notes: "" },
];

export const MOCK_USERS = [
  { id: 1, name: "Admin User", email: "admin@demo.com", password: "admin", role: "admin" },
  { id: 2, name: "John Client", email: "john@demo.com", password: "john", role: "client" },
];