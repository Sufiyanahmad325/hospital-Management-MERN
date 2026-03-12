import { useCookies } from "react-cookie";
import { FaUsers, FaCalendarCheck, FaRegClock } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// Import actions (Keep them for when you uncomment useEffect)
import { getAllDepartments, getAllDoctorAppointments, getAllDoctors, getAllPatients, todayAllAppointments } from "../../reduxtollkit/hospitalManagementSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { 
    totalDoctors, 
    todayPendingCompletedAppointments, 
    totalDoctorsAppointments, 
    totalPatients, 
    totalDepartments 
  } = useSelector((state) => state.hospitalManagement);

  return (
    // Main Container: Height and Width preserved
    <div className="w-[100vw] sm:w-[75vw] p-6 bg-[#b3d4f6] sm:h-screen overflow-y-auto custom-scrollbar">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">Overview of your hospital's performance</p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-600">{new Date().toDateString()}</p>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
        
        {/* Card Component Helper */}
        {[
          { label: "Today Appointment", value: todayPendingCompletedAppointments.length, icon: <FaRegClock />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Total Appointment", value: totalDoctorsAppointments.length, icon: <FaCalendarCheck />, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Total Doctors", value: totalDoctors.length, icon: <FaUserDoctor />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Patients", value: totalPatients.length, icon: <FaUsers />, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Departments", value: totalDepartments.length, icon: <MdLocalHospital />, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className={`${item.bg} ${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">{item.label}</p>
              <h2 className="text-2xl font-black text-gray-800">{item.value || '00'}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Recent Appointments
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/50 text-left">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Patient</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Doctor</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {totalDoctorsAppointments?.length > 0 ? (
                totalDoctorsAppointments.map((ele, ind) => (
                  <tr key={ind} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600">
                          {ele.patientId.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-gray-700">{ele.patientId.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">
                      Dr. {ele.doctorId.user_id.name}
                    </td>
                    <td className="p-4 text-gray-500 text-sm italic">
                      {ele.date}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tighter
                          ${ele.status === "pending" ? "bg-yellow-100 text-yellow-700" : 
                            ele.status === "completed" ? "bg-green-100 text-green-700" : 
                            "bg-red-100 text-red-700"}`}>
                          {ele.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400">
                    <div className="flex flex-col items-center gap-2">
                      <FaCalendarCheck className="text-4xl text-gray-200" />
                      <p>No recent appointments found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;