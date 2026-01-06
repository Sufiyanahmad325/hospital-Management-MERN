import { useCookies } from "react-cookie";
import { FaUsers, FaCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalHospital } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllDepartments, getAllDoctorAppointments, getAllDoctors, getAllPatients, todayAllAppointments } from "../../reduxtollkit/hospitalManagementSlice";
import { useEffect } from "react";


const Dashboard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const dispatch = useDispatch();


  const { totalDoctors, todayPendingCompletedAppointments, totalDoctorsAppointments, totalPatients, totalDepartments, } = useSelector((state) => state.hospitalManagement);


  console.log('all total totalDoctorsAppointments====>', totalDoctorsAppointments)



  useEffect(() => {
    if (cookies.accessToken) {
      // Fetch dashboard data here
      dispatch(getAllDoctors());
      dispatch(todayAllAppointments());
      dispatch(getAllDoctorAppointments());
      dispatch(getAllPatients());
      dispatch(getAllDepartments());

    }
  }, [cookies.accessToken, dispatch]);


  return (
    <div className="w-[100vw] sm:space-y-6 sm:w-[75vw] p-6 bg-blue-400 sm:h-screen overflow-y-auto">
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
            <h2 className="text-2xl font-bold">{todayPendingCompletedAppointments.length || '00'}</h2>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaCalendarCheck className="text-4xl text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Appointments</p>
            <h2 className="text-2xl font-bold">{totalDoctorsAppointments.length || '00'}</h2>
          </div>
        </div>

        {/* Total Doctors */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaUserDoctor className="text-4xl text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Doctors</p>
            <h2 className="text-2xl font-bold">{totalDoctors.length || '00'}</h2>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaUsers className="text-4xl text-purple-600" />
          <div>
            <p className="text-gray-500 text-sm">Total Patients</p>
            <h2 className="text-2xl font-bold">{totalPatients.length || '00'}</h2>
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <MdLocalHospital className="text-4xl text-red-600" />
          <div>
            <p className="text-gray-500 text-sm">Departments</p>
            <h2 className="text-2xl font-bold">{totalDepartments.length || '00'}</h2>
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

              {
                totalDoctorsAppointments?.length > 0 ? (
                  totalDoctorsAppointments?.map((ele, ind) => (
                    <tr key={ind} className="border-b">
                      <td className="p-3">{ele.patientId.name}</td>
                      <td className="p-3">{ele.doctorId.user_id.name}</td>
                      <td className="p-3">{ele.date}</td>
                      <td className={`p-3 font-bold
                        ${ele.status === "pending" ? 'text-yellow-400' : ele.status == 'completed' ? 'text-green-500' : 'text-red-600 font-semibold'}`}>
                      {ele.status}
                    </td>
                    </tr>
            ))
            ) :
            (
            <div>Please login your Account</div>
            )
              }

          </tbody>
        </table>
      </div>
    </div>
    </div >
  );
};

export default Dashboard;
