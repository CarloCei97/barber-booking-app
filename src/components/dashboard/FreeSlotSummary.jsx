// src/components/dashboard/FreeSlotSummary.jsx
import React, { useMemo } from 'react';
import useAppointments from '../../hooks/useAppointments';
import SummaryCard from './SummaryCard';

const FreeSlotSummary = () => {
  const token = localStorage.getItem('auth_token');
  // Use useMemo to create a stable "today" value.
  const today = useMemo(() => new Date(), []);
  
  // Fetch appointments using the custom hook.
  const { appointments, loading, error } = useAppointments(today, token);

  if (loading) return <div>Loading free slots...</div>;
  if (error) return <div>Error: {error}</div>;

  // Define working hours for today (for example, 9:00 AM to 5:00 PM).
  const workingStart = new Date(today);
  workingStart.setHours(9, 0, 0, 0);
  const workingEnd = new Date(today);
  workingEnd.setHours(17, 0, 0, 0);

  const now = new Date();
  // Use the later of now or the start of working hours.
  const freeStart = now > workingStart ? now : workingStart;

  // Filter today's appointments.
  const todaysAppointments = appointments
    .filter(appointment => {
      const appStart = new Date(appointment.startTime);
      return (
        appStart.getDate() === today.getDate() &&
        appStart.getMonth() === today.getMonth() &&
        appStart.getFullYear() === today.getFullYear()
      );
    })
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  // Calculate free time slots between appointments.
  const freeSlots = [];
  let currentTime = freeStart;
  todaysAppointments.forEach(appointment => {
    const appStart = new Date(appointment.startTime);
    const appEnd = new Date(appointment.endTime);
    if (appStart > currentTime) {
      freeSlots.push({ start: new Date(currentTime), end: new Date(appStart) });
    }
    if (appEnd > currentTime) {
      currentTime = new Date(appEnd);
    }
  });
  if (currentTime < workingEnd) {
    freeSlots.push({ start: new Date(currentTime), end: new Date(workingEnd) });
  }

  return (
    <SummaryCard title="Today's Upcoming Free Slots">
      {freeSlots.length > 0 ? (
        freeSlots.map((slot, index) => {
          const start = slot.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const end = slot.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div
              key={index}
              className="border-l-4 border-green-500 bg-green-50 p-4 rounded"
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">
                  {start} - {end}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No upcoming free slots available today.</div>
      )}
    </SummaryCard>
  );
};

export default FreeSlotSummary;
