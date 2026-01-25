import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelledAppointmentByAdmin, getAllDoctorAppointments } from '../../reduxtollkit/hospitalManagementSlice';

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("today"); // today or all

  const dispatch = useDispatch()

  const { totalDoctorsAppointments } = useSelector((state) => state.hospitalManagement)

  console.log(totalDoctorsAppointments)
  // Delete/Cancel Function
  const cancelAppointment = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      let res = await dispatch(cancelledAppointmentByAdmin(id)).unwrap()
      if(res.success){
        dispatch(getAllDoctorAppointments())
      }
    }
  };

  // Logic for Filtering and Searching
  const filteredAppointments = totalDoctorsAppointments.filter(app => { 
    const matchesSearch = app._id.includes(searchTerm.toLowerCase()); 
    const isToday = app.date === new Date().toISOString().split("T")[0]; // Real app mein new Date() use hoga ye line kab chalega

    if (filter === "today") return matchesSearch && isToday;
    return matchesSearch;
  });




  return (
    <div className="h-screen bg-gray-50 p-6 w-full sm:w-[75vw] overflow-y-auto">

      {/* HEADER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
          <p className="text-sm text-gray-500">Manage daily schedules and bookings</p>
        </div>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Appointment ID (e.g. APP-101)"
            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* TABS / FILTERS */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setFilter("today")}
          className={`pb-2 px-4 font-medium transition-all ${filter === "today" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
        >
          Today's Appointments
        </button>
        <button
          onClick={() => setFilter("all")}
          className={`pb-2 px-4 font-medium transition-all ${filter === "all" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
        >
          All Appointments
        </button>
      </div>

      {/* APPOINTMENT CARDS LIST (Doctor Wise Grouping UI) */}
      <div className="space-y-6">
        {filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppointments.map((app) => (
              <div key={app.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full uppercase tracking-wider">
                      {app._id}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 mt-2">{app.patientId.name}</h3>
                    <h3 className="text-lg font-bold text-gray-800 mt-2">{app.state}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">{app.timeSlot}</p>
                    <p className="text-xs text-gray-400">{app.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    👨‍⚕️
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Doctor</p>
                    <p className="text-sm font-medium text-gray-700">{app.doctorId.user_id.name}</p>
                  </div>
                </div>

                <div className="flex gap-2">

                  {
                    app.status =='pending' ? (
                        <button
                    onClick={() => cancelAppointment(app._id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                  >
                    Cancel
                  </button>
                    ):
                    <>
                    <button
                    disabled={true}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                  >
                    {app.status}
                  </button></>
                  }
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed">
            <p className="text-gray-400 font-medium">No appointments found.</p>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Appointments;