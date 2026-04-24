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
  { id: 1, name: "Wedding", duration: 480, price: 50000, category: "Formal Event", description: "Full wedding event planning and coordination.", icon: "💍" },
  { id: 2, name: "Birthday Party", duration: 240, price: 15000, category: "Celebration", description: "Fun and customized birthday celebration setup.", icon: "🎂" },
  { id: 3, name: "Debut", duration: 360, price: 30000, category: "Formal Event", description: "18th debut event planning and styling.", icon: "👑" },
  { id: 4, name: "Baby Shower", duration: 180, price: 12000, category: "Family Event", description: "Warm and memorable baby shower event.", icon: "🍼" },
  { id: 5, name: "Anniversary / Date", duration: 120, price: 8000, category: "Private Event", description: "Romantic setup for couples.", icon: "❤️" },
  { id: 6, name: "Corporate Party", duration: 300, price: 40000, category: "Corporate", description: "Professional company event and gatherings.", icon: "🏢" },
];
export const ALL_SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

export const BOOKINGS_DATA = [
  {
    id: 1,
    clientName: "Alice Johnson",
    clientEmail: "alice@demo.com",
    serviceId: 1,
    serviceName: "Wedding",
    date: fmt(addDays(today, 5)),
    time: "13:00",
    status: "approved",
    notes: "Garden wedding, 150 guests"
  },
  {
    id: 2,
    clientName: "Bob Smith",
    clientEmail: "bob@demo.com",
    serviceId: 2,
    serviceName: "Birthday Party",
    date: fmt(addDays(today, 2)),
    time: "15:00",
    status: "pending",
    notes: "Kids party, superhero theme"
  },
  {
    id: 3,
    clientName: "Carol White",
    clientEmail: "carol@demo.com",
    serviceId: 3,
    serviceName: "Debut",
    date: fmt(addDays(today, 7)),
    time: "18:00",
    status: "approved",
    notes: "Formal ballroom setup"
  },
  {
    id: 4,
    clientName: "David Lee",
    clientEmail: "david@demo.com",
    serviceId: 4,
    serviceName: "Baby Shower",
    date: fmt(addDays(today, 1)),
    time: "10:00",
    status: "cancelled",
    notes: "Family-only event"
  },
  {
    id: 5,
    clientName: "Emma Wilson",
    clientEmail: "emma@demo.com",
    serviceId: 5,
    serviceName: "Anniversary / Date",
    date: fmt(addDays(today, 3)),
    time: "19:00",
    status: "approved",
    notes: "Romantic dinner setup"
  },
  {
    id: 6,
    clientName: "Frank Miller",
    clientEmail: "frank@demo.com",
    serviceId: 6,
    serviceName: "Corporate Party",
    date: fmt(addDays(today, 6)),
    time: "17:00",
    status: "pending",
    notes: "Company year-end party"
  },
  {
    id: 7,
    clientName: "Grace Tan",
    clientEmail: "grace@demo.com",
    serviceId: 2,
    serviceName: "Birthday Party",
    date: fmt(today),
    time: "14:00",
    status: "approved",
    notes: "18th birthday, pastel theme"
  },
  {
    id: 8,
    clientName: "Henry Cruz",
    clientEmail: "henry@demo.com",
    serviceId: 1,
    serviceName: "Wedding",
    date: fmt(addDays(today, 10)),
    time: "15:00",
    status: "pending",
    notes: "Beach wedding"
  },
  {
    id: 9,
    clientName: "Isabel Garcia",
    clientEmail: "isabel@demo.com",
    serviceId: 4,
    serviceName: "Baby Shower",
    date: fmt(addDays(today, 4)),
    time: "11:00",
    status: "approved",
    notes: "Gender reveal included"
  },
  {
    id: 10,
    clientName: "Jake Fernandez",
    clientEmail: "jake@demo.com",
    serviceId: 6,
    serviceName: "Corporate Party",
    date: fmt(addDays(today, 8)),
    time: "18:00",
    status: "pending",
    notes: "Product launch event"
  },
  {
    id: 11,
    clientName: "Karen Reyes",
    clientEmail: "karen@demo.com",
    serviceId: 3,
    serviceName: "Debut",
    date: fmt(addDays(today, 12)),
    time: "17:00",
    status: "approved",
    notes: "Elegant gold theme"
  },
  {
    id: 12,
    clientName: "Leo Martinez",
    clientEmail: "leo@demo.com",
    serviceId: 5,
    serviceName: "Anniversary / Date",
    date: fmt(addDays(today, 2)),
    time: "20:00",
    status: "cancelled",
    notes: "Client rescheduled"
  }
];
export const MOCK_USERS = [
  { id: 1, name: "Admin User", email: "admin@demo.com", password: "admin", role: "admin" },
  { id: 2, name: "John Client", email: "john@demo.com", password: "john", role: "client" },
];