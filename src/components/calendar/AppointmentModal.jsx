// src/components/calendar/AppointmentModal.jsx
import React from 'react';
import AppointmentList from './AppointmentList';
import AppointmentForm from './AppointmentForm';

const AppointmentModal = ({
  selectedDate,
  modalView,
  appointments,
  onClose,
  onNew,         // NEW: callback to switch to create mode
  onSubmit,
  onEdit,
  onDelete,
  editingAppointment
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 max-h-full overflow-y-auto">
        {modalView === "list" ? (
          <>
            <h2 className="text-xl font-bold mb-4">
              Appointments for {selectedDate.toLocaleDateString()}
            </h2>
            <AppointmentList 
              appointments={appointments} 
              selectedDate={selectedDate} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={onNew}  // Use the new callback here
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                New Appointment
              </button>
              <button
                onClick={() => onClose("list")}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <AppointmentForm
              selectedDate={selectedDate}
              initialData={modalView === "edit" ? editingAppointment : null}
              onSubmit={onSubmit}
              onClose={() => onClose("list")}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => onClose("list")}
                className="px-4 py-2 bg-gray-300 text-black rounded"
              >
                Back to Appointments
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentModal;
