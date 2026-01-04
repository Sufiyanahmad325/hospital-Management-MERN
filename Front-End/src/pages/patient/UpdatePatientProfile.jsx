import React from "react";

const UpdatePatientProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 p-6 sm:w-[75vw]">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Update Profile
        </h1>
        <p className="text-sm text-gray-600">
          Keep your personal information up to date
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-3xl">

        {/* PROFILE TOP */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">

          <div className="w-28 h-28 rounded-full bg-blue-300 flex items-center justify-center text-3xl font-bold text-white">
            PA
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Patient Profile
            </h2>
            <p className="text-sm text-gray-500">
              Update your basic details
            </p>
          </div>

        </div>

        {/* FORM */}
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* NAME */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* AGE */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter age"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Gender
            </label>
            <select
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* ADDRESS */}
          <div className="sm:col-span-2">
            <label className="block text-sm text-gray-600 mb-1">
              Address
            </label>
            <textarea
              rows="3"
              placeholder="Enter your address"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          {/* BUTTON */}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg font-medium transition"
            >
              Save Changes
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default UpdatePatientProfile;
