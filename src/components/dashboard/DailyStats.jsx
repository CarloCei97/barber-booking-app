// src/components/dashboard/DailyStats.jsx
import React, { useMemo } from "react";
import useDailyStatsData from "../../hooks/useDailyStatsData";

const DailyStats = () => {
  const token = localStorage.getItem("auth_token");
  // Use useMemo to create a stable current date.
  const currentDate = useMemo(() => new Date(), []);
  
  const { stats, loading, error } = useDailyStatsData(token, currentDate);

  if (loading) return <div>Loading daily stats...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const statItems = [
    { label: "Today's Appointments", value: stats.todaysCount },
    { label: "Completed", value: stats.completedCount },
    { label: "Upcoming", value: stats.upcomingCount },
    { label: "Today's Revenue", value: `€${stats.revenue}` },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Daily Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((stat) => (
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
