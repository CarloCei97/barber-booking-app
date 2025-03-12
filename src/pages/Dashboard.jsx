// src/pages/Dashboard.jsx
import React from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import AppointmentSummary from '../components/dashboard/AppointmentSummary';
import DailyStats from '../components/dashboard/DailyStats';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyStats />
        <AppointmentSummary />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;