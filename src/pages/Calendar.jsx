// // src/pages/Calendar.jsx
// import React, { useState, useEffect } from 'react';
// import DashboardLayout from '../components/dashboard/DashboardLayout';
// import CalendarGrid from '../components/calendar/CalendarGrid';
// import AppointmentModal from '../components/calendar/AppointmentModal';
// import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '../utils/api';

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [modalView, setModalView] = useState("list"); // "list", "create", or "edit"
//   const [appointments, setAppointments] = useState([]);
//   const [editingAppointment, setEditingAppointment] = useState(null);

//   const monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"];
//   const currentMonthName = monthNames[currentDate.getMonth()];
//   const currentYear = currentDate.getFullYear();

//   // Assume token is stored in localStorage under "auth_token"
//   const token = localStorage.getItem("auth_token");

//   // Load appointments for the authenticated user (for the current month or a specific day)
//   const fetchAppointments = async () => {
//     try {
//       const data = await getAppointments(token);
//       setAppointments(data);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAppointments();
//   }, [currentDate]);

//   const previousMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
//   };

//   const nextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
//   };

//   const handleDayClick = (day) => {
//     const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
//     setSelectedDate(clickedDate);
//     setModalView("list");
//     setShowModal(true);
//     setEditingAppointment(null);
//   };

//   // Handle appointment submission for both creating and editing
//   const handleAppointmentSubmit = async (appointmentData) => {
//     try {
//       if (modalView === "create") {
//         // Call the backend to create an appointment
//         const newAppointment = await createAppointment({
//           ...appointmentData,
//           date: selectedDate, // ensure the backend receives a valid date
//         }, token);
//         setAppointments([...appointments, newAppointment]);
//         alert('Appointment booked successfully!');
//       } else if (modalView === "edit" && editingAppointment) {
//         // Call the backend to update the appointment
//         const updated = await updateAppointment(editingAppointment.id, appointmentData, token);
//         setAppointments(appointments.map(appt => appt.id === editingAppointment.id ? updated : appt));
//         alert('Appointment updated successfully!');
//         setEditingAppointment(null);
//       }
//     } catch (error) {
//       console.error("Error saving appointment:", error);
//       alert('Error saving appointment');
//     } finally {
//       setModalView("list");
//       setShowModal(false);
//       // Optionally refresh appointments
//       fetchAppointments();
//     }
//   };

//   const handleDeleteAppointment = async (appointmentId) => {
//     if (window.confirm("Are you sure you want to delete this appointment?")) {
//       try {
//         await deleteAppointment(appointmentId, token);
//         setAppointments(appointments.filter(appt => appt.id !== appointmentId));
//         alert('Appointment deleted successfully');
//       } catch (error) {
//         console.error("Error deleting appointment:", error);
//         alert('Error deleting appointment');
//       }
//     }
//   };

//   const handleEditAppointment = (appointment) => {
//     setEditingAppointment(appointment);
//     setModalView("edit");
//     setShowModal(true);
//   };

//   return (
//     <DashboardLayout>
//       <div className="container mx-auto p-6">
//         <div className="bg-white rounded-lg shadow">
//           {/* Calendar Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <h2 className="text-xl font-semibold">
//               {currentMonthName} {currentYear}
//             </h2>
//             <div className="flex space-x-2">
//               <button onClick={previousMonth} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
//                 ←
//               </button>
//               <button onClick={nextMonth} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
//                 →
//               </button>
//             </div>
//           </div>

//           {/* Calendar Grid */}
//           <CalendarGrid 
//             currentDate={currentDate} 
//             appointments={appointments} 
//             onDayClick={handleDayClick}
//           />
//         </div>

//         {/* Appointment Modal Popup */}
//         {showModal && selectedDate && (
//           <AppointmentModal
//             selectedDate={selectedDate}
//             modalView={modalView === "edit" ? { mode: "edit", editData: editingAppointment } : modalView}
//             appointments={appointments}
//             onClose={(view = "list") => {
//               setModalView(view);
//               setShowModal(false);
//             }}
//             onNew={() => setModalView("create")}
//             onSubmit={handleAppointmentSubmit}
//             onEdit={handleEditAppointment}
//             onDelete={handleDeleteAppointment}
//             editingAppointment={editingAppointment}
//           />
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Calendar;

// src/pages/Calendar.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import CalendarGrid from '../components/calendar/CalendarGrid';
import AppointmentModal from '../components/calendar/AppointmentModal';
import { createAppointment, updateAppointment, deleteAppointment } from '../utils/api';
import useAppointments from '../hooks/useAppointments';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalView, setModalView] = useState("list"); // "list", "create", or "edit"
  const [editingAppointment, setEditingAppointment] = useState(null);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Assume token is stored in localStorage under "auth_token"
  const token = localStorage.getItem("auth_token");

  // Use custom hook to fetch appointments
  const { appointments, loading, error, refreshAppointments } = useAppointments(currentDate, token);

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setModalView("list");
    setShowModal(true);
    setEditingAppointment(null);
  };

  // Handle appointment submission for both creating and editing
  const handleAppointmentSubmit = async (appointmentData) => {
    try {
      if (modalView === "create") {
        // Call the backend to create an appointment
        await createAppointment({
          ...appointmentData,
          date: selectedDate, // ensure the backend receives a valid date
        }, token);
        alert('Appointment booked successfully!');
      } else if (modalView === "edit" && editingAppointment) {
        // Call the backend to update the appointment
        await updateAppointment(editingAppointment.id, appointmentData, token);
        alert('Appointment updated successfully!');
        setEditingAppointment(null);
      }
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert('Error saving appointment');
    } finally {
      setModalView("list");
      setShowModal(false);
      // Refresh appointments to get the updated data
      refreshAppointments();
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        await deleteAppointment(appointmentId, token);
        alert('Appointment deleted successfully');
        // Refresh appointments to get the updated data
        refreshAppointments();
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert('Error deleting appointment');
      }
    }
  };

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setModalView("edit");
    setShowModal(true);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">
              {currentMonthName} {currentYear}
            </h2>
            <div className="flex space-x-2">
              <button onClick={previousMonth} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                ←
              </button>
              <button onClick={nextMonth} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                →
              </button>
            </div>
          </div>

          {/* Display loading/error messages */}
          {loading && <div className="p-4">Loading appointments...</div>}
          {error && <div className="p-4 text-red-500">Error: {error}</div>}

          {/* Calendar Grid */}
          {!loading && !error && (
            <CalendarGrid 
              currentDate={currentDate} 
              appointments={appointments} 
              onDayClick={handleDayClick}
            />
          )}
        </div>

        {/* Appointment Modal Popup */}
        {showModal && selectedDate && (
          <AppointmentModal
            selectedDate={selectedDate}
            modalView={modalView === "edit" ? { mode: "edit", editData: editingAppointment } : modalView}
            appointments={appointments}
            onClose={(view = "list") => {
              setModalView(view);
              setShowModal(false);
            }}
            onNew={() => setModalView("create")}
            onSubmit={handleAppointmentSubmit}
            onEdit={handleEditAppointment}
            onDelete={handleDeleteAppointment}
            editingAppointment={editingAppointment}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Calendar;

