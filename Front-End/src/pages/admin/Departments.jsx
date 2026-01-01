import React from 'react'

const Departments = () => {
  return (
    <div className="min-h-screen bg-blue-400 p-6 space-y-6 sm:w-[75vw] sm:overflow-y-auto sm:h-screen">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        Department Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ================= ADD DEPARTMENT ================= */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-blue-600 mb-4">
            Add New Department
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                Department Name
              </label>
              <input
                placeholder="Enter department name"
                className="border p-2 rounded w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Description
              </label>
              <textarea
                placeholder="Enter department description"
                className="border p-2 rounded w-full"
              />
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Department
            </button>
          </div>
        </div>

        {/* ================= ALL DEPARTMENTS ================= */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-green-600 mb-4">
            All Departments
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border">

              <thead className="bg-green-100">
                <tr>
                  <th className="border p-2">Department Name</th>
                  <th className="border p-2">Description</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-2">Cardiology</td>
                  <td className="border p-2">
                    Heart related treatments
                  </td>
                  <td className="border p-2 text-center">
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="border p-2">Neurology</td>
                  <td className="border p-2">
                    Brain and nervous system
                  </td>
                  <td className="border p-2 text-center">
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="border p-2">Orthopedics</td>
                  <td className="border p-2">
                    Bone and joint care
                  </td>
                  <td className="border p-2 text-center">
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-gray-50">
                  <td className="border p-2">Pediatrics</td>
                  <td className="border p-2">
                    Child healthcare
                  </td>
                  <td className="border p-2 text-center">
                    <button className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Departments;
