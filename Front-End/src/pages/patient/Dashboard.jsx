import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen bg-blue-100 p-6 sm:w-[75vw] space-y-6 sm:overflow-y-auto">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Patient Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back! Here is your health summary
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Upcoming Appointments</p>
          <h2 className="text-2xl font-bold text-blue-600">2</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Completed Visits</p>
          <h2 className="text-2xl font-bold text-green-600">8</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Pending Reports</p>
          <h2 className="text-2xl font-bold text-yellow-500">1</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-sm text-gray-500">Total Doctors Visited</p>
          <h2 className="text-2xl font-bold text-purple-600">4</h2>
        </div>

      </div>

      {/* ================= NEXT APPOINTMENT ================= */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Next Appointment
        </h2>

        <div className="flex flex-col sm:flex-row justify-between gap-4 bg-blue-50 p-4 rounded-lg">

          <div>
            <p className="text-sm text-gray-500">Doctor</p>
            <p className="font-semibold text-gray-800">
              Dr. Rahul Sharma (Cardiology)
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-800">
              31 Dec 2025
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold text-gray-800">
              10:30 AM
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              Pending
            </span>
          </div>

        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <NavLink to={'/patient/book-appointment'} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded">
            Book Appointment
          </NavLink>

          <NavLink to={'/patient/appointments'} className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded">
            View Appointments
          </NavLink>

          <NavLink to={'/patient/update-profile'} className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded">
            Update Profile
          </NavLink>
        </div>
      </div>

      {/* ================= HEALTH SUMMARY ================= */}
      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-lg font-bold text-blue-700 mb-4">
          Health Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Visit</p>
            <p className="font-semibold text-gray-800">
              15 Dec 2025
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold text-gray-800">
              O+
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-semibold text-gray-800">
              26 Years
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Dashboard;
