import React from "react";
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <div className="min-h-screen bg-blue-100 p-6 sm:w-[75vw] space-y-6 sm:h-screen sm:overflow-y-auto">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        My Profile
      </h1>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row gap-6">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="w-32 h-32 rounded-full bg-blue-200 flex items-center justify-center text-4xl font-bold text-blue-700">
            PA
          </div>
          <button className="mt-3 text-sm text-blue-600 hover:underline">
            Change Photo
          </button>
        </div>

        {/* BASIC INFO */}
        <div className="flex-1 space-y-4">

          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold text-gray-800">
              Noman Khan
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-700">
              noman@gmail.com
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-700">
              +91 98765 43210
            </p>
          </div>

        </div>
      </div>

      {/* ================= PERSONAL DETAILS ================= */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <h2 className="text-lg font-bold text-blue-700">
          Personal Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <p className="text-sm text-gray-500">Age</p>
            <p className="font-medium text-gray-800">
              26 Years
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Gender</p>
            <p className="font-medium text-gray-800">
              Male
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-medium text-gray-800">
              O+
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-800">
              New Delhi, India
            </p>
          </div>

        </div>
      </div>

      {/* ================= MEDICAL INFO ================= */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <h2 className="text-lg font-bold text-blue-700">
          Medical Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Last Visit</p>
            <p className="font-semibold text-gray-800">
              20 Dec 2025
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Visits</p>
            <p className="font-semibold text-gray-800">
              8
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Reports</p>
            <p className="font-semibold text-gray-800">
              Available
            </p>
          </div>

        </div>
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="flex gap-4">
        <NavLink to={'/patient/update-profile'} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded">
          Edit Profile
        </NavLink>

        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
          Change Password
        </button>
      </div>

    </div>
  );
};

export default Profile;
