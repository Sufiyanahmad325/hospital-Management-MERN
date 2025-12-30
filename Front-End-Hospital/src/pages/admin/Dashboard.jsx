import { FaUsers, FaCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";


const Dashboard = () => {
  return (
    <div className="space-y-6 w-[80vw] p-6 bg-blue-400">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:flex-wrap sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        
        {/* Total Appointments */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaCalendarCheck className="text-4xl text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Today Appointments</p>
            <h2 className="text-2xl font-bold">72</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaCalendarCheck className="text-4xl text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Appointments</p>
            <h2 className="text-2xl font-bold">72</h2>
          </div>
        </div>

        {/* Total Doctors */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaUserDoctor className="text-4xl text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Doctors</p>
            <h2 className="text-2xl font-bold">21</h2>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaUsers className="text-4xl text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Patients</p>
            <h2 className="text-2xl font-bold">80</h2>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <MdLocalHospital className="text-4xl text-red-600" />
          <div>
            <p className="text-gray-500 text-sm">Departments</p>
            <h2 className="text-2xl font-bold">8</h2>
          </div>
        </div>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-4">
          Recent Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Patient</th>
                <th className="p-3">Doctor</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="p-3">Rahul Kumar</td>
                <td className="p-3">Dr. Smith</td>
                <td className="p-3">12 Aug 2025</td>
                <td className="p-3 text-green-600 font-semibold">
                  Completed
                </td>
              </tr>

              <tr className="border-b">
                <td className="p-3">Amit Sharma</td>
                <td className="p-3">Dr. John</td>
                <td className="p-3">13 Aug 2025</td>
                <td className="p-3 text-orange-500 font-semibold">
                  Pending
                </td>
              </tr>

              <tr>
                <td className="p-3">Neha Singh</td>
                <td className="p-3">Dr. Watson</td>
                <td className="p-3">14 Aug 2025</td>
                <td className="p-3 text-red-500 font-semibold">
                  Cancelled
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
