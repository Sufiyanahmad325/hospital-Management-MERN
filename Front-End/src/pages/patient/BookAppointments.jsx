import React from "react";

const BookAppointment = () => {
  return (
    <div className="min-h-screen bg-blue-100 p-6 sm:w-[75vw]">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Book Appointment
      </h1>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow p-6 max-w-xl">

        <form className="space-y-5">

          {/* DOCTOR SELECT */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Select Doctor
            </label>

            <select
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Choose Doctor</option>
              <option value="doctorId1">
                Dr. Rahul Sharma (Cardiology)
              </option>
              <option value="doctorId2">
                Dr. Neha Singh (Neurology)
              </option>
            </select>
          </div>

          {/* DATE SELECT */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Select Date
            </label>

            <input
              type="date"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* INFO BOX */}
          <div className="bg-blue-50 p-4 rounded text-sm text-blue-700">
            ✔ Appointments can be booked up to next 20 days  
            <br />
            ✔ Time slot will be assigned automatically  
            <br />
            ✔ Only one appointment per doctor per day
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium"
          >
            Book Appointment
          </button>

        </form>
      </div>

    </div>
  );
};

export default BookAppointment;
