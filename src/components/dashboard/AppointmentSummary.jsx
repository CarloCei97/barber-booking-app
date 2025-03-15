// src/components/dashboard/AppointmentSummary.jsx
import React, { useMemo } from 'react';
import useAppointments from '../../hooks/useAppointments';
import SummaryCard from './SummaryCard';

const AppointmentSummary = () => {
  const token = localStorage.getItem('auth_token');
  // Use useMemo to create a stable "today" value so that it doesn't trigger repeated fetches.
  const today = useMemo(() => new Date(), []);
  
  // Fetch appointments using the custom hook.
  const { appointments, loading, error } = useAppointments(today, token);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error}</div>;

  const now = new Date();
  // Filter for appointments scheduled today with a startTime later than now.
  const todaysUpcomingAppointments = appointments.filter((appointment) => {
    const startTime = new Date(appointment.startTime);
    return (
      startTime.getDate() === now.getDate() &&
      startTime.getMonth() === now.getMonth() &&
      startTime.getFullYear() === now.getFullYear() &&
      startTime > now
    );
  });

  return (
    <SummaryCard title="Today's Upcoming Appointments">
      {todaysUpcomingAppointments.length > 0 ? (
        todaysUpcomingAppointments.map((appointment) => {
          const clientName = appointment.client ? appointment.client.username : appointment.clientName;
          const serviceName = appointment.service?.name || '';
          const time = new Date(appointment.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const duration = appointment.service?.duration ? `${appointment.service.duration} min` : '';
          
          return (
            <div
              key={appointment.id}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{clientName}</p>
                  <p className="text-sm text-gray-600">{serviceName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{time}</p>
                  <p className="text-sm text-gray-600">{duration}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No more upcoming appointments for today.</div>
      )}
    </SummaryCard>
  );
};

export default AppointmentSummary;
