import React from "react";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-green-200 p-6 space-y-6 sm:w-[75vw]">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        Doctor Dashboard
      </h1>

      {/* ================= DOCTOR INFO ================= */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-10">
        <div>
          <p className="text-sm text-gray-500">Doctor Name</p>
          <h2 className="text-lg font-bold text-gray-800">
            Dr. Vk Jhone
          </h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Specialization</p>
          <h2 className="text-lg font-bold text-green-600">
            Cardiologist
          </h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Department</p>
          <h2 className="text-lg font-bold text-blue-600">
            Cardiology
          </h2>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Today's Appointments</p>
          <h2 className="text-2xl font-bold text-green-600">12</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Pending Appointments</p>
          <h2 className="text-2xl font-bold text-yellow-500">5</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Completed Appointments</p>
          <h2 className="text-2xl font-bold text-blue-600">20</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Patients</p>
          <h2 className="text-2xl font-bold text-purple-600">50</h2>
        </div>

      </div>

      {/* ================= TODAY APPOINTMENTS ================= */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Today's Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">

            <thead className="bg-green-100">
              <tr>
                <th className="border p-2">Patient Name</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border p-2">Noman</td>
                <td className="border p-2">10:30 AM</td>
                <td className="border p-2 text-yellow-600 font-medium">
                  Pending
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2">Sajida</td>
                <td className="border p-2">11:00 AM</td>
                <td className="border p-2 text-green-600 font-medium">
                  canceled
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border p-2">Sufiyan</td>
                <td className="border p-2">12:15 PM</td>
                <td className="border p-2 text-blue-600 font-medium">
                  Completed
                </td>
              </tr>
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;
