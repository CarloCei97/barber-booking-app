// src/components/calendar/CalendarGrid.jsx
import React from 'react';

const CalendarGrid = ({ currentDate, appointments, onDayClick }) => {
  // Get the first day of the month and calculate empty cells before the first day.
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDay = firstDayOfMonth.getDay();

  // Get the last day of the month.
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  // Create calendar grid cells.
  const totalDays = [];
  const today = new Date();

  // Add empty cells for days before the first of the month.
  for (let i = 0; i < startingDay; i++) {
    totalDays.push(
      <div key={`empty-${i}`} className="p-4 border border-gray-200"></div>
    );
  }

  // Add the actual days.
  for (let day = 1; day <= lastDayOfMonth; day++) {
    const isToday =
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear();

    // Filter appointments for this day using startTime
    const dayAppointments = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.startTime);
      return (
        appointmentDate.getDate() === day &&
        appointmentDate.getMonth() === currentDate.getMonth() &&
        appointmentDate.getFullYear() === currentDate.getFullYear()
      );
    });

    // Determine cell background: if today, use special styling; if not today and there are appointments, highlight them.
    let cellBackground = 'bg-white';
    if (isToday) {
      cellBackground = 'bg-blue-100 font-bold';
    }

    totalDays.push(
      <div 
        key={day}
        className={`p-4 border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors ${cellBackground}`}
        onClick={() => onDayClick(day)}
      >
        <div className="flex flex-col min-h-[80px]">
          <span className="mb-1">{day}</span>
          {dayAppointments.length > 0 && (
            <div className="text-s bg-green-100 text-green-800 px-2 py-1 rounded">
              {dayAppointments.length} {dayAppointments.length !== 1 ? '' : ''}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-7 gap-0">
      {/* Weekday headers */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <div key={day} className="p-4 text-center font-semibold bg-gray-50">
          {day}
        </div>
      ))}
      {totalDays}
    </div>
  );
};

export default CalendarGrid;
