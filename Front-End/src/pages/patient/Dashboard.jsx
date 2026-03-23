import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const {
    upComingAppointment,
    completedAppointment,
    userDetails,
    cancelledAppointment,
  } = useSelector((state) => state.patientControl);

  const [doctorVisited, setdoctorVisited] = useState([]);

  // here i am filtering how many doctor have i visited ?
  useEffect(() => {
    let hello = [];
    completedAppointment?.filter((data) => {
      if (!hello.includes(data.doctorId)) {
        hello.push(data.doctorId);
      }
    });
    setdoctorVisited(hello);
  }, [completedAppointment]);

  return (
    <div className="h-screen sm:w-[75vw] bg-gradient-to-br from-sky-100 via-white to-blue-100 p-4 sm:p-6 space-y-6 sm:overflow-y-auto">
      
      {/* PAGE TITLE */}
      <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-6">
        <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here is your health summary
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-5 hover:shadow-lg transition-all">
          <p className="text-sm text-gray-500">Upcoming Appointments</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {upComingAppointment?.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-green-100 p-5 hover:shadow-lg transition-all">
          <p className="text-sm text-gray-500">Completed Visits</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {completedAppointment?.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-yellow-100 p-5 hover:shadow-lg transition-all">
          <p className="text-sm text-gray-500">Cancelled Appointment</p>
          <h2 className="text-3xl font-bold text-yellow-500 mt-2">
            {cancelledAppointment?.length}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-5 hover:shadow-lg transition-all">
          <p className="text-sm text-gray-500">Total Doctors Visited</p>
          <h2 className="text-3xl font-bold text-purple-600 mt-2">
            {doctorVisited?.length}
          </h2>
        </div>
      </div>

      {/* ================= NEXT APPOINTMENT ================= */}
      <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-6">
          <h2 className="text-xl font-bold text-blue-700 mb-4">
          Next Appointment
        </h2>
        {
          upComingAppointment.length > 0 ? <>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gradient-to-r from-blue-50 to-sky-50 p-4 rounded-2xl border border-blue-100">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Doctor</p>
            <p className="font-semibold text-gray-800 mt-1">
              {upComingAppointment[0]?.doctorId?.user_id?.name} (
              {upComingAppointment[0]?.doctorId?.specialization})
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-800 mt-1">
              {upComingAppointment[0]?.date}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold text-gray-800 mt-1">
              {upComingAppointment[0]?.timeSlot}
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <p className="text-sm text-gray-500">Status</p>
            <span className="inline-block mt-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {upComingAppointment[0]?.status}
            </span>
          </div>
        </div>
          </>:
          <>
          <div>There is not any Upcoming Appointment</div>
          </>
        }
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">Quick Actions</h2>

        <div className="flex flex-wrap gap-4">
          <NavLink
            to={"/patient/book-appointment"}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl shadow-sm transition-all"
          >
            Book Appointment
          </NavLink>

          <NavLink
            to={"/patient/appointments"}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl shadow-sm transition-all"
          >
            View Appointments
          </NavLink>

          <NavLink
            to={"/patient/update-profile"}
            className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-3 rounded-xl shadow-sm transition-all"
          >
            Update Profile
          </NavLink>
        </div>
      </div>

      {/* ================= HEALTH SUMMARY ================= */}
      <div className="bg-white rounded-3xl shadow-md border border-blue-100 p-6">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          Health Summary
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-5 rounded-2xl border border-blue-100">
            <p className="text-sm text-gray-500">Last Visit</p>
            <p className="font-semibold text-gray-800 mt-2">
              {completedAppointment[completedAppointment?.length - 1]?.date}
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-5 rounded-2xl border border-pink-100">
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold text-gray-800 mt-2">O+</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-2xl border border-purple-100">
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-semibold text-gray-800 mt-2">
              {userDetails?.age}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;