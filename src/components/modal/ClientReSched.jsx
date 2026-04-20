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

export default ClientRescheduleModal;