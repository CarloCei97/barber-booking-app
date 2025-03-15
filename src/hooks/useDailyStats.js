// src/hooks/useDailyStats.js
const isSameDay = (d1, d2) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

const useDailyStats = (appointments, services = [], currentDate = new Date()) => {
  const now = new Date();
  const todaysAppointments = appointments.filter((app) => {
    const startTime = new Date(app.startTime);
    return isSameDay(startTime, currentDate);
  });

  const todaysCount = todaysAppointments.length;
  const completedCount = todaysAppointments.filter(app => app.status === 'COMPLETED').length;
  const upcomingCount = todaysAppointments.filter(app => new Date(app.startTime) > now).length;
  
  const revenue = todaysAppointments
    .filter(app => app.status === 'COMPLETED')
    .reduce((acc, app) => {
      // Try to get the price from the appointment's joined service
      let price = app.service?.price;
      // If not available or 0, try to find it from the global services list using serviceId
      if ((!price || price === 0) && app.serviceId && services.length > 0) {
        const found = services.find(s => s.id === app.serviceId);
        price = found ? found.price : 0;
      }
      return acc + Number(price || 0);
    }, 0)
    .toFixed(2);

  return {
    todaysCount,
    completedCount,
    upcomingCount,
    revenue,
  };
};

export default useDailyStats;
