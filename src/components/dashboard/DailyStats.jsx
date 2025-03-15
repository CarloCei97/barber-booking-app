// src/components/dashboard/DailyStats.jsx
import React, { useMemo } from 'react';
import useAppointments from '../../hooks/useAppointments';
import useDailyStats from '../../hooks/useDailyStats';

const DailyStats = () => {
  const token = localStorage.getItem('auth_token');
  // Use useMemo to create a stable currentDate value so it doesn't change on every render.
  const currentDate = useMemo(() => new Date(), []);
  
  // Fetch appointments using the stable currentDate
  const { appointments, loading, error } = useAppointments(currentDate, token);
  
  // Compute daily statistics using our custom hook
  const { todaysCount, completedCount, upcomingCount, revenue } = useDailyStats(appointments, currentDate);

  if (loading) return <div>Loading daily stats...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const stats = [
    { label: "Today's Appointments", value: todaysCount },
    { label: 'Completed', value: completedCount },
    { label: 'Upcoming', value: upcomingCount },
    { label: "Today's Revenue", value: `€${revenue}` }
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Daily Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-semibold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyStats;
