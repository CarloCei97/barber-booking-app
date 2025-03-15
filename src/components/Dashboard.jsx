// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logoutUser, getCurrentUser } from "../utils/auth";

// const Dashboard = ({ setAuth }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // ✅ Add loading state

//   useEffect(() => {
//     const currentUser = getCurrentUser();
//     console.log("[DEBUG] Current user data:", currentUser);
//     setUser(currentUser);
//     setLoading(false); // ✅ Mark loading as false when user is set
//   }, []);

//   const handleLogout = () => {
//     console.log("[DEBUG] Logging out...");
//     logoutUser();
//     setAuth(false);
//     navigate("/login");
//   };

//   // ✅ Show a loading message until user data is loaded
//   if (loading) {
//     return <div>Loading dashboard...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex-shrink-0">
//               <h1 className="text-xl font-bold">Lato Barber Shop</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <span className="text-gray-700">Welcome, {user.name}!</span>
//               ) : (
//                 <span className="text-gray-700">Error loading user</span>
//               )}
//               <button
//                 onClick={handleLogout}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
//             <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//             <p className="text-gray-600">
//               Welcome to your dashboard. This is a protected route that can only be accessed after login.
//             </p>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { logoutUser, /*getCurrentUser*/ } from "../utils/auth";
// import DashboardLayout from "./dashboard/DashboardLayout";
// import AppointmentSummary from "./dashboard/AppointmentSummary";
// import DailyStats from "./dashboard/DailyStats";
// import FreeSlotSummary from "./dashboard/FreeSlotSummary"; // New import

// //-- with backend ---------------------------------------------------------
// import { getProfile } from "../utils/api"; // Import the API function
// //-------------------------------------------------------------------------

// const Dashboard = ({ setAuth }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // ✅ Add loading state

//   // handler for testing without backend
//   // useEffect(() => {
//   //   const currentUser = getCurrentUser();
//   //   //console.log("[DEBUG] Current user data:", currentUser);
//   //   setUser(currentUser);
//   //   setLoading(false); // ✅ Mark loading as false when user is set
//   // }, []);

//   //-- with backend ---------------------------------------------------------
  
//    // Fetch updated user data from the backend
//    const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem("auth_token");
//       console.log("🔍 Token found:", token);
//       if (!token) {
//         throw new Error("No auth token found");
//       }
//       const data = await getProfile(token);
//       setUser(data);
//       localStorage.setItem("user_data", JSON.stringify(data));
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       // If token is missing or fetching fails, force logout:
//       //logoutUser();
//       //setAuth(false);
//       //navigate("/login");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);
//   //-------------------------------------------------------------------------
//   const handleLogout = () => {
//     //console.log("[DEBUG] Logging out...");
//     logoutUser();
//     setAuth(false);
//     navigate("/login");
//   };

//   // ✅ Show a loading message until user data is loaded
//   if (loading) {
//     return <div>Loading dashboard...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <nav className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex-shrink-0">
//               <h1 className="text-xl font-bold">Lato Barber Shop</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               {user ? (
//                 <span className="text-gray-700">Welcome, {user.username}!</span>
//               ) : (
//                 <span className="text-gray-700">Error loading user</span>
//               )}
//               <button
//                 onClick={handleLogout}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <DashboardLayout>
//           <div className="mb-6">
//             <h1 className="text-2xl font-bold">
//               Welcome, {user?.username || "Guest"}!
//             </h1>
//             <p className="text-gray-600">
//               Manage your appointments and view daily stats below.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <AppointmentSummary />
//             <DailyStats />
//           </div>

//           {/* New section for FreeSlotSummary */}
//           <div className="mt-6">
//             <FreeSlotSummary />
//           </div>
//         </DashboardLayout>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

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
import useServices from "../hooks/useServices";

const Dashboard = ({ setAuth }) => {
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
    setAuth(false);
    navigate("/login");
  };

  // Use a ref to create a stable currentDate
  const currentDate = useRef(new Date()).current;
  const token = localStorage.getItem("auth_token");

  // Fetch appointments and services once in Dashboard
  const { appointments, refreshAppointments } = useAppointments(currentDate, token);
  const { services } = useServices(token);

  if (loadingUser) return <div>Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold">Lato Barber Shop</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <span className="text-gray-700">Welcome, {user.username}!</span>
              ) : (
                <span className="text-gray-700">Error loading user</span>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <DashboardLayout>
          <div className="mb-6">
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
            <DailyStats
              appointments={appointments}
              services={services}
              currentDate={currentDate}
            />
          </div>

          <div className="mt-6">
            <FreeSlotSummary
              appointments={appointments}
              currentDate={currentDate}
            />
          </div>
        </DashboardLayout>
      </main>
    </div>
  );
};

export default Dashboard;
