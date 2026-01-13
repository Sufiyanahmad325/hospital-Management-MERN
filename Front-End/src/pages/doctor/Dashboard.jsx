import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DoctorDashboard = () => {

  const [completedAppointment, setCompletedAppointment] = useState('00')

  const { doctorTodayAllAppointments, doctorTodayPendingAppointments } = useSelector((state) => state.doctorControl)

  useEffect(() => {
    console.log('hahahahhaha', doctorTodayAllAppointments)
    let a = doctorTodayAllAppointments.filter(ele => ele.status === 'completed')
    setCompletedAppointment(a)
  }, [doctorTodayAllAppointments])

  return (
    <div className="min-h-screen bg-green-200 p-6 space-y-6 sm:w-[75vw]">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800">
        Doctor Dashboard
      </h1>

      {/* ================= DOCTOR INFO ================= */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-10">
        <div>
          <p className="text-sm text-gray-500">Doctor Name</p>
          <h2 className="text-lg font-bold text-gray-800">
            Dr. Vk Jhone
          </h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Specialization</p>
          <h2 className="text-lg font-bold text-green-600">
            Cardiologist
          </h2>
        </div>

        <div>
          <p className="text-sm text-gray-500">Department</p>
          <h2 className="text-lg font-bold text-blue-600">
            Cardiology
          </h2>
        </div>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Today's Appointments</p>
          <h2 className="text-2xl font-bold text-green-600">{doctorTodayAllAppointments.length || '00'}</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Today Pending Appointments</p>
          <h2 className="text-2xl font-bold text-yellow-500">{doctorTodayPendingAppointments.length || '00'}</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Today Completed Appointments</p>
          <h2 className="text-2xl font-bold text-blue-600">{completedAppointment.length}</h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">My All Day Appointment</p>
          <h2 className="text-2xl font-bold text-purple-600">50</h2>
        </div>

      </div>

      {/* ================= TODAY APPOINTMENTS ================= */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Today's Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border">

            <thead className="bg-green-100">
              <tr>
                <th className="border p-2">Patient Name</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Mark Complete</th>
              </tr>
            </thead>

            <tbody>
              {
                doctorTodayAllAppointments?.length > 0 && doctorTodayAllAppointments.map((ele, ind) => (
                  <tr className="hover:bg-gray-50">
                    <td className="border p-2">{ele.patientId?.name}</td>
                    <td className="border p-2">{ele.patientId?.address}</td>
                    <td className="border p-2">{ele?.timeSlot}</td>
                    <td className="border p-2 text-yellow-600 font-medium">
                      {ele.status}
                    </td>
                    <td className="border p-2  font-medium flex justify-center">
                      <button className="green px-2 bg-green-300 rounded-md">Mark Completed</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;
