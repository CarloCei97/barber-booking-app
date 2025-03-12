// src/components/calendar/Calendar.jsx
import React, { useState } from 'react';

const Calendar = () => {
  const [view, setView] = useState('day'); // 'day' or 'week'
  const [currentDate, setCurrentDate] = useState(new Date());

  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM

  const renderTimeSlots = () => {
    return hours.map(hour => (
      <div key={hour} className="grid grid-cols-1 gap-2">
        <div className="p-2 border-t">
          <span className="text-sm text-gray-500">
            {hour}:00 {hour < 12 ? 'AM' : 'PM'}
          </span>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium">Calendar</h2>
          <p className="text-sm text-gray-600">
            {currentDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 rounded ${
              view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 rounded ${
              view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Week
          </button>
        </div>
      </div>
      <div className="mt-4 overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
        {renderTimeSlots()}
      </div>
    </div>
  );
};

export default Calendar;