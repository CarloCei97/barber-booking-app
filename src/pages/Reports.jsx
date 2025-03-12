// src/pages/Reports.jsx
import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const Reports = () => {
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });

  const stats = {
    totalAppointments: 156,
    totalRevenue: 3900,
    averagePerDay: 520,
    topServices: [
      { name: 'Haircut', count: 85, revenue: 2125 },
      { name: 'Beard Trim', count: 45, revenue: 675 },
      { name: 'Styling', count: 26, revenue: 1100 }
    ]
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Date Range</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Total Appointments</h3>
            <p className="text-3xl font-bold">{stats.totalAppointments}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold">€{stats.totalRevenue}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-2">Average Daily Revenue</h3>
            <p className="text-3xl font-bold">€{stats.averagePerDay}</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Top Services</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.topServices.map((service, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{service.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">€{service.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;