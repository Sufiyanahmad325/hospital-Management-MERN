import React from "react";

const Appointments = () => {
  return (
    <div className="min-h-screen bg-blue-100 p-6 sm:w-[75vw] space-y-6">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Appointments
        </h1>
        <p className="text-sm text-gray-500">
          View your upcoming and past appointments
        </p>
      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Upcoming
        </button>

        <button className="bg-white border px-4 py-2 rounded">
          Completed
        </button>

        <button className="bg-white border px-4 py-2 rounded">
          Cancelled
        </button>
      </div>

      {/* ================= APPOINTMENT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* CARD 1 */}
        <div className="bg-white rounded-xl shadow p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
              Upcoming
            </span>
            <span className="text-sm text-gray-500">
              31 Dec 2025
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-800">
            Dr. Rahul Sharma
          </h3>

          <p className="text-sm text-gray-500">
            Cardiology Department
          </p>

          <div className="flex justify-between text-sm text-gray-600">
            <span>⏰ 10:30 AM</span>
            <span>📍 Room 203</span>
          </div>

          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
            Cancel Appointment
          </button>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-xl shadow p-5 space-y-3">
          <div className="flex justify-between">
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
              Completed
            </span>
            <span className="text-sm text-gray-500">
              20 Dec 2025
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-800">
            Dr. Neha Singh
          </h3>

          <p className="text-sm text-gray-500">
            Neurology Department
          </p>

          <div className="flex justify-between text-sm text-gray-600">
            <span>⏰ 11:00 AM</span>
            <span>📍 Room 101</span>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
            View Details
          </button>
        </div>

      </div>

    </div>
  );
};

export default Appointments;
