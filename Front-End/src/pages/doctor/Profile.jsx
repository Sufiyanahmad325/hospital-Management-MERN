import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {

  const {doctorsDetails} = useSelector((state) => state.doctorControl)

  return (
    <div className="min-h-screen bg-green-100 p-6 sm:w-[75vw] space-y-6">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        My Profile
      </h1>

      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row gap-6">

        {/* PROFILE IMAGE */}
        <div className="flex flex-col items-center sm:items-start">
          <div className="w-32 h-32 rounded-full bg-green-200 flex items-center justify-center text-4xl font-bold text-green-700">
            DR
          </div>
          <button className="mt-3 text-sm text-green-600 hover:underline">
            Change Photo
          </button>
        </div>

        {/* BASIC INFO */}
        <div className="flex-1 space-y-4">

          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-semibold text-gray-800">
              {doctorsDetails[0]?.user_id.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-700">
              {doctorsDetails[0]?.user_id.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-gray-700">
              {doctorsDetails[0]?.mob || "0000000000"}
            </p>
          </div>

        </div>
      </div>

      {/* ================= PROFESSIONAL DETAILS ================= */}
      <div className="bg-white rounded-xl  p-6 space-y-4">

        <h2 className="text-lg font-bold text-green-700">
          Professional Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <p className="text-sm text-gray-500">Specialization</p>
            <p className="font-medium text-gray-800">
              Cardiologist
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium text-gray-800">
              {doctorsDetails[0]?.specialization }
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Experience</p>
            <p className="font-medium text-gray-800">
             {doctorsDetails[0]?.experience}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          </div>

        </div>
      </div>

      {/* ================= AVAILABLE DAYS ================= */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <h2 className="text-lg font-bold text-green-700">
          Available Days
        </h2>

        <div className="flex flex-wrap gap-3">
          {doctorsDetails[0]?.availableDays.map((day) => (
            <span
              key={day}
              className="px-4 py-1 rounded-full bg-green-200 text-green-800 text-sm font-medium"
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      

    </div>
  );
};

export default Profile;
