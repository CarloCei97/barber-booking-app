// // src/components/dashboard/AppointmentSummary.jsx
// import React from 'react';

// const AppointmentSummary = () => {
//   const appointments = [
//     {
//       id: 1,
//       clientName: 'John Doe',
//       service: 'Haircut',
//       time: '10:00 AM',
//       duration: '30 min'
//     },
//     // More appointments would be fetched from the backend
//   ];

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-lg font-medium mb-4">Upcoming Appointments</h2>
//       <div className="space-y-4">
//         {appointments.map((appointment) => (
//           <div
//             key={appointment.id}
//             className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="font-medium">{appointment.clientName}</p>
//                 <p className="text-sm text-gray-600">{appointment.service}</p>
//               </div>
//               <div className="text-right">
//                 <p className="font-medium">{appointment.time}</p>
//                 <p className="text-sm text-gray-600">{appointment.duration}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AppointmentSummary;


// src/components/dashboard/AppointmentSummary.jsx
import React, { useMemo } from 'react';
import useAppointments from '../../hooks/useAppointments';

const AppointmentSummary = () => {
  const token = localStorage.getItem('auth_token');
  // Use useMemo to ensure the date value is stable and does not trigger re-fetching continuously.
  const currentDate = useMemo(() => new Date(), []);
  
  const { appointments, loading, error } = useAppointments(currentDate, token);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter for upcoming appointments (using startTime)
  const now = new Date();
  const upcomingAppointments = appointments.filter(app => new Date(app.startTime) >= now);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Upcoming Appointments</h2>
      <div className="space-y-4">
        {upcomingAppointments.map((appointment) => {
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
        })}
      </div>
    </div>
  );
};

export default AppointmentSummary;
