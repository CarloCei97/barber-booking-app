// src/pages/Calendar.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import AppointmentForm from '../components/calendar/AppointmentForm';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // Get the first day of the month
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDay = firstDayOfMonth.getDay();
  
  // Get the last day of the month
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Get month name
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  // Navigation functions
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Handle appointment booking
  const handleDateClick = (day) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setShowAppointmentForm(true);
  };

  const handleAppointmentSubmit = (appointmentData) => {
    setAppointments([...appointments, appointmentData]);
    setShowAppointmentForm(false);
    // Show success message
    alert('Appointment booked successfully!');
  };

  // Get appointments for a specific day
  const getAppointmentsForDay = (day) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === day &&
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  // Create calendar grid
  const createCalendarGrid = () => {
    const totalDays = [];
    const today = new Date();

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDay; i++) {
      totalDays.push(<div key={`empty-${i}`} className="p-4 border border-gray-200"></div>);
    }

    // Add the actual days
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const isToday = 
        day === today.getDate() && 
        currentDate.getMonth() === today.getMonth() && 
        currentDate.getFullYear() === today.getFullYear();

      const dayAppointments = getAppointmentsForDay(day);

      totalDays.push(
        <div 
          key={day} 
          className={`p-4 border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors
            ${isToday ? 'bg-blue-100 font-bold' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          <div className="flex flex-col min-h-[80px]">
            <span className="mb-1">{day}</span>
            {dayAppointments.length > 0 && (
              <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                {dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      );
    }

    return totalDays;
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
              <button
                onClick={previousMonth}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                ←
              </button>
              <button
                onClick={nextMonth}
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                →
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0">
            {/* Weekday headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-4 text-center font-semibold bg-gray-50">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {createCalendarGrid()}
          </div>
        </div>

        {/* Appointment Form Modal */}
        {showAppointmentForm && selectedDate && (
          <AppointmentForm
            selectedDate={selectedDate}
            onSubmit={handleAppointmentSubmit}
            onClose={() => setShowAppointmentForm(false)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Calendar;