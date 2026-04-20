import { useState, useCallback, useEffect } from "react";

// AUTH PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";

// CLIENT PAGES
import ServicesPage from "./pages/client/Services";
import MyBookings from "./pages/client/Bookings";
import BookingForm from "./pages/client/BookForm";

// ADMIN PAGES
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBookings from "./pages/admin/Bookings";
import AdminServices from "./pages/admin/Services";
import AdminSchedule from "./pages/admin/Schedule";

// LAYOUT
import Layout from "./components/Layout";

// MOCK DATA
import { SERVICES_DATA, BOOKINGS_DATA } from "./data";

export default function App() {
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState("login");
  const [page, setPage] = useState("");

  const [services, setServices] = useState(SERVICES_DATA);
  const [bookings, setBookings] = useState(BOOKINGS_DATA);
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedService, setSelectedService] = useState(null);

  // ✅ RESTORE USER ON REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setPage(parsed.role === "admin" ? "admin.dashboard" : "client.services");
    }
  }, []);

  // ✅ AUTH
  const login = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u)); // save
    setPage(u.role === "admin" ? "admin.dashboard" : "client.services");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // clear
    setAuthView("login");
    setPage("");
  };

  // ✅ CLIENT ACTIONS
  const onBook = useCallback((service) => {
    setSelectedService(service);
    setPage("client.book");
  }, []);

  const onConfirmBooking = useCallback((data) => {
    setBookings((p) => [
      ...p,
      {
        id: Date.now(),
        clientName: user.name,
        clientEmail: user.email,
        ...data,
        status: "pending",
      },
    ]);
  }, [user]);

  const onCancelBooking = useCallback((id) => {
    setBookings((p) =>
      p.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
    );
  }, []);

  const onReschedule = useCallback((id, date, time) => {
    setBookings((p) =>
      p.map((b) =>
        b.id === id ? { ...b, date, time, status: "pending" } : b
      )
    );
  }, []);

  // ✅ AUTH VIEW
  if (!user) {
    return authView === "login" ? (
      <Login
        onLogin={login}
        goRegister={() => setAuthView("register")}
      />
    ) : (
      <Register goLogin={() => setAuthView("login")} />
    );
  }

  // ✅ PAGE RENDERER
  const renderPage = () => {
    switch (page) {
      case "client.services":
        return <ServicesPage services={services} onBook={onBook} />;

      case "client.book":
        return (
          <BookingForm
            service={selectedService}
            bookings={bookings}
            availableSlots={availableSlots}
            onConfirm={onConfirmBooking}
            onCancel={() => setPage("client.services")}
          />
        );

      case "client.bookings":
        return (
          <MyBookings
            bookings={bookings}
            user={user}
            onCancel={onCancelBooking}
            onReschedule={onReschedule}
          />
        );

      case "admin.dashboard":
        return <AdminDashboard bookings={bookings} services={services} />;

      case "admin.bookings":
        return (
          <AdminBookings
            bookings={bookings}
            setBookings={setBookings}
          />
        );

      case "admin.services":
        return (
          <AdminServices
            services={services}
            setServices={setServices}
          />
        );

      case "admin.schedule":
        return (
          <AdminSchedule
            availableSlots={availableSlots}
            setAvailableSlots={setAvailableSlots}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Layout user={user} page={page} setPage={setPage} onLogout={logout}>
      {renderPage()}
    </Layout>
  );
}