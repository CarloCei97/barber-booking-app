// src/components/dashboard/DailyStats.jsx
import React from 'react';

const DailyStats = () => {
  const stats = [
    { label: "Today's Appointments", value: 12 },
    { label: 'Completed', value: 5 },
    { label: 'Upcoming', value: 7 },
    { label: "Today's Revenue", value: '€350' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Daily Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyStats;