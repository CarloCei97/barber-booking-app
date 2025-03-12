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

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../utils/auth";
import DashboardLayout from "./dashboard/DashboardLayout";
import AppointmentSummary from "./dashboard/AppointmentSummary";
import DailyStats from "./dashboard/DailyStats";

const Dashboard = ({ setAuth }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  useEffect(() => {
    const currentUser = getCurrentUser();
    //console.log("[DEBUG] Current user data:", currentUser);
    setUser(currentUser);
    setLoading(false); // ✅ Mark loading as false when user is set
  }, []);

  const handleLogout = () => {
    //console.log("[DEBUG] Logging out...");
    logoutUser();
    setAuth(false);
    navigate("/login");
  };

  // ✅ Show a loading message until user data is loaded
  if (loading) {
    return <div>Loading dashboard...</div>;
  }

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
                <span className="text-gray-700">Welcome, {user.name}!</span>
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
        <h1 className="text-2xl font-bold">Welcome, {user?.name || "Guest"}!</h1>
        <p className="text-gray-600">Manage your appointments and view daily stats below.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppointmentSummary />
        <DailyStats />
      </div>
    </DashboardLayout>
      </main>
    </div>
  );
};

export default Dashboard;