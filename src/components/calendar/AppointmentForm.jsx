// // src/components/calendar/AppointmentForm.jsx
// import React, { useState } from 'react';

// const AppointmentForm = ({ selectedDate, onSubmit, onClose }) => {
//   const [formData, setFormData] = useState({
//     clientName: '',
//     service: '',
//     timeSlot: ''
//   });

//   // Available time slots from 9 AM to 5 PM
//   const timeSlots = [
//     '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
//     '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
//     '15:00', '15:30', '16:00', '16:30', '17:00'
//   ];

//   // Available services
//   const services = [
//     'Haircut',
//     'Beard Trim',
//     'Hair Styling',
//     'Hair Coloring',
//     'Shave',
//     'Hair Treatment'
//   ];

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({
//       ...formData,
//       date: selectedDate
//     });
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Book Appointment</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             ✕
//           </button>
//         </div>

//         <div className="mb-4">
//           <p className="text-gray-600">
//             Selected Date: {selectedDate.toLocaleDateString()}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               name="clientName"
//               value={formData.clientName}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Service
//             </label>
//             <select
//               name="service"
//               value={formData.service}
//               onChange={handleChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             >
//               <option value="">Select a service</option>
//               {services.map((service) => (
//                 <option key={service} value={service}>
//                   {service}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Time Slot
//             </label>
//             <select
//               name="timeSlot"
//               value={formData.timeSlot}
//               onChange={handleChange}
//               className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               required
//             >
//               <option value="">Select a time slot</option>
//               {timeSlots.map((slot) => (
//                 <option key={slot} value={slot}>
//                   {slot}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             >
//               Book Appointment
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AppointmentForm;


import React, { useState, useEffect } from 'react';

const AppointmentForm = ({ selectedDate, initialData, onSubmit, onClose }) => {
  // Initialize formData using initialData if provided
  const [formData, setFormData] = useState({
    clientName: initialData?.clientName || '',
    service: initialData?.service || '',
    timeSlot: initialData?.timeSlot || ''
  });

  // Available time slots from 9 AM to 5 PM
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  // Available services
  const services = [
    'Haircut',
    'Beard Trim',
    'Hair Styling',
    'Hair Coloring',
    'Shave',
    'Hair Treatment'
  ];

  useEffect(() => {
    // Update state if initialData changes (for editing)
    if (initialData) {
      setFormData({
        clientName: initialData.clientName,
        service: initialData.service,
        timeSlot: initialData.timeSlot
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: selectedDate.toISOString() //cast to make sure it matches the backend 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initialData ? "Edit Appointment" : "Book Appointment"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Selected Date: {selectedDate.toLocaleDateString()}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Service
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a service</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time Slot
            </label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a time slot</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {initialData ? "Save Changes" : "Book Appointment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;