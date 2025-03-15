// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import AppointmentSummary from "../components/dashboard/AppointmentSummary";
import DailyStats from "../components/dashboard/DailyStats";
import FreeSlotSummary from "../components/dashboard/FreeSlotSummary";
import { getProfile } from "../utils/api";
import useAppointments from "../hooks/useAppointments";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (!token) throw new Error("No auth token found");
      const data = await getProfile(token);
      setUser(data);
      localStorage.setItem("user_data", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  // Use a stable currentDate (using useRef or useMemo)
  const currentDate = useRef(new Date()).current;
  const token = localStorage.getItem("auth_token");

  // Fetch appointments once in Dashboard.
  const { appointments, refreshAppointments } = useAppointments(currentDate, token);

  if (loadingUser) return <div>Loading dashboard...</div>;

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold">
          Welcome, {user?.username || "Guest"}!
        </h1>
        <p className="text-gray-600">
          Manage your appointments and view daily stats below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppointmentSummary
          appointments={appointments}
          currentDate={currentDate}
          refreshAppointments={refreshAppointments}
        />
        <DailyStats token={token} currentDate={currentDate} />
      </div>

      <div className="mt-6">
        <FreeSlotSummary
          appointments={appointments}
          currentDate={currentDate}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
