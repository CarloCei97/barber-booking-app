// // src/components/calendar/AppointmentList.jsx
// import React from 'react';

// const AppointmentList = ({ appointments, selectedDate, onEdit, onDelete }) => {
//   // Filter appointments for the selected day based on the appointment date
//   const dayAppointments = appointments.filter(appointment => {
//     const appointmentDate = new Date(appointment.date);
//     return (
//       appointmentDate.getDate() === selectedDate.getDate() &&
//       appointmentDate.getMonth() === selectedDate.getMonth() &&
//       appointmentDate.getFullYear() === selectedDate.getFullYear()
//     );
//   });

//   return (
//     <div className="overflow-y-auto max-h-64">
//       {dayAppointments.length > 0 ? (
//         dayAppointments.map((appt, index) => (
//           <div key={index} className="p-2 border-b flex justify-between items-center">
//             <div>
//               <p className="text-sm font-bold">Client: {appt.clientName}</p>
//               <p className="text-sm">Service: {appt.service}</p>
//               <p className="text-sm">Time: {appt.timeSlot}</p>
//             </div>
//             <div className="flex gap-2">
//               <button
//                 onClick={() => onEdit(appt)}
//                 className="text-blue-600 hover:text-blue-800 text-sm"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => onDelete(appt.id)}
//                 className="text-red-600 hover:text-red-800 text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-500">No appointments for this day.</p>
//       )}
//     </div>
//   );
// };

// export default AppointmentList;

// src/components/calendar/AppointmentList.jsx
import React from 'react';

const AppointmentList = ({ appointments, selectedDate, onEdit, onDelete }) => {
  // Filter appointments for the selected day based on the appointment's startTime
  const dayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.startTime);
    return (
      appointmentDate.getDate() === selectedDate.getDate() &&
      appointmentDate.getMonth() === selectedDate.getMonth() &&
      appointmentDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="overflow-y-auto max-h-64">
      {dayAppointments.length > 0 ? (
        dayAppointments.map((appt, index) => {
          // Compute a display time (e.g., HH:mm) from startTime
          const timeSlot = new Date(appt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
            <div key={index} className="p-2 border-b flex justify-between items-center">
              <div>
                <p className="text-sm font-bold">
                  Client: {appt.client ? appt.client.username : appt.clientName}
                </p>
                <p className="text-sm">Service: {appt.service?.name}</p>
                <p className="text-sm">Time: {timeSlot}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(appt)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(appt.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-gray-500">No appointments for this day.</p>
      )}
    </div>
  );
};

export default AppointmentList;
