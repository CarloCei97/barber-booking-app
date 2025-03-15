// src/hooks/useDailyStatsData.js
import { useState, useEffect, useMemo } from "react";
import { getAppointments, getServices } from "../utils/api";

// Helper to check if two dates are on the same day.
const isSameDay = (d1, d2) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const useDailyStatsData = (token, currentDate) => {
  const [stats, setStats] = useState({
    todaysCount: 0,
    completedCount: 0,
    upcomingCount: 0,
    revenue: "0.00"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a stable current date with useMemo if not already stable.
  const stableDate = useMemo(() => currentDate, [currentDate]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch appointments and services concurrently.
        const [appointments, services] = await Promise.all([
          getAppointments(token),
          getServices(token)
        ]);

        const now = new Date();
        // Filter appointments for today based on stableDate.
        const todaysAppointments = appointments.filter((app) => {
          const startTime = new Date(app.startTime);
          return isSameDay(startTime, stableDate);
        });

        const todaysCount = todaysAppointments.length;
        const completedCount = todaysAppointments.filter(
          (app) => app.status === "COMPLETED"
        ).length;
        const upcomingCount = todaysAppointments.filter(
          (app) => new Date(app.startTime) > now
        ).length;

        // Calculate revenue by summing prices of completed appointments.
        const revenue = todaysAppointments
          //.filter((app) => app.status === "COMPLETED")
          .reduce((acc, app) => {
            // Get the price from the joined service if available,
            // otherwise look up from services list using serviceId.
            let price = app.service?.price;
            if ((!price || price === 0) && app.serviceId && services.length > 0) {
              const found = services.find((s) => s.id === app.serviceId);
              price = found ? found.price : 1;
            }
            return acc + Number(price || 1);
          }, 0)
          .toFixed(2);

        setStats({
          todaysCount,
          completedCount,
          upcomingCount,
          revenue,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token, stableDate]);

  return { stats, loading, error };
};

export default useDailyStatsData;
