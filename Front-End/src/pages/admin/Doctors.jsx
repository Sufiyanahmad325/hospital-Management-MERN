import { useEffect, useState } from "react";

const Doctors = () => {
  return (
    /* 1. h-screen: Puri screen ki height fix kar di.
       2. overflow-y-auto: Jab content lamba hoga, sirf ye div scroll hoga.
    */
    <div className="h-screen bg-blue-400 text-gray-800 overflow-y-auto w-full sm:w-[75vw] p-6 custom-scrollbar">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold mb-4 text-white">
        Doctors Management
      </h1>

      {/* ================= ADD DOCTOR FORM ================= */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">
          Add New Doctor
        </h2>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Doctor Name" className="border p-2 rounded focus:outline-blue-400" />
          <input placeholder="Email" className="border p-2 rounded focus:outline-blue-400" />
          <input placeholder="Phone Number" className="border p-2 rounded focus:outline-blue-400" />
          <input placeholder="Department Name" className="border p-2 rounded focus:outline-blue-400" />
          <input placeholder="Specialization" className="border p-2 rounded focus:outline-blue-400" />
        </div>

        {/* EXPERIENCE */}
        <div className="mt-4">
          <p className="mb-1 font-medium">Experience (Years)</p>
          <input placeholder="Experience" className="border p-2 rounded w-full focus:outline-blue-400" />
        </div>

        {/* SPECIALIZATION DROPDOWN */}
        <div className="mt-4">
          <p className="mb-1 font-medium">Specialization</p>
          <select className="border p-2 rounded w-full focus:outline-blue-400">
            <option>Select Specialization</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Pediatrics</option>
          </select>
        </div>

        {/* AVAILABLE DAYS */}
        <div className="mt-4">
          <p className="font-medium mb-2">Available Days</p>
          <div className="flex flex-wrap gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <label key={day} className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" className="w-4 h-4" /> {day}
              </label>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4">
          <p className="mb-1 font-medium">Description</p>
          <textarea
            placeholder="Doctor Description"
            className="border p-2 rounded w-full h-24 focus:outline-blue-400"
          />
        </div>

        <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition-all">
          Add Doctor
        </button>
      </div>

      {/* ================= DOCTORS LIST ================= */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-lg font-semibold text-green-600 mb-4">
          All Doctors
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Department</th>
                <th className="border p-2 text-left">Specialization</th>
                <th className="border p-2 text-left">Experience</th>
                <th className="border p-2 text-left">Days</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Dr. Rahul Sharma", email: "rahul@gmail.com", dept: "Cardiology", spec: "Heart Specialist", exp: "5 Years", days: "Mon, Wed, Fri" },
                { name: "Dr. Neha Singh", email: "neha@gmail.com", dept: "Neurology", spec: "Brain Specialist", exp: "3 Years", days: "Tue, Thu" },
                { name: "Dr. Amit Verma", email: "amit@gmail.com", dept: "Pediatrics", spec: "Child Specialist", exp: "8 Years", days: "Mon, Sat" }
              ].map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="border p-2">{doc.name}</td>
                  <td className="border p-2">{doc.email}</td>
                  <td className="border p-2">{doc.dept}</td>
                  <td className="border p-2">{doc.spec}</td>
                  <td className="border p-2">{doc.exp}</td>
                  <td className="border p-2">{doc.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Doctors;