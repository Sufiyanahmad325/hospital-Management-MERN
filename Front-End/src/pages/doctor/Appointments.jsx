import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeAppointment, getAllDayAppointment, getAllTodayAppointments, getTodayAllPendingAppointment } from "../../reduxtollkit/doctorControlSlice";

const Appointments = () => {

  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);

  const dispatch = useDispatch()

  console.log(today)

  const [filter, setFilter] = useState("today");

  const { doctorAllDayTotalAppointments } = useSelector((state) => state.doctorControl)



  // ✅ Complete appointment
  const handleUpdate = async (id) => {
    let res = await dispatch(completeAppointment(id)).unwrap()
    if (res.success) {
      dispatch(getTodayAllPendingAppointment())
      dispatch(getAllTodayAppointments())
      dispatch(getAllDayAppointment())
    }
  };

  // ✅ Filter logic (easy)
  const filteredAppointments = doctorAllDayTotalAppointments.filter((app) => {
    if (filter === "today") {
      return app.date === today && app.status === "pending";
    }
    if (filter === "completed") {
      return app.date === today && app.status === "completed";
    }
    return true; // all
  });

  return (
    <div className="min-h-screen bg-green-200 p-6 space-y-6 sm:w-[75vw]">

      {/* TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Appointments
        </h1>
        <p className="text-sm text-gray-500">
          Manage today and completed appointments
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-3">
        {["today", "completed", "all"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
              ${filter === type
                ? "bg-green-500 text-white"
                : "bg-white border"
              }`}
          >
            {type === "today" && "Today"}
            {type === "completed" && "Today Completed"}
            {type === "all" && "All"}
          </button>
        ))}
      </div>

      {/* APPOINTMENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAppointments.length === 0 ? (
          <div className="col-span-full text-center bg-white p-8 rounded shadow">
            <p className="text-gray-400">
              No appointments found
            </p>
          </div>
        ) : (
          filteredAppointments.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl shadow p-5 space-y-3 hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  {app._id}
                </span>
                <span className="text-sm text-gray-500">
                  {app.time}
                </span>
              </div>

              {/* PATIENT */}
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <h3 className="text-lg font-bold text-gray-800">
                  {app.patientId?.name}
                </h3>
              </div>

              {/* DATE */}
              <p className="text-sm text-gray-500">
                Date: {app.date}
              </p>

              {/* STATUS */}
              <div className="flex justify-between items-center">
                {app.status === "completed" ? (
                  <span className="text-blue-600 font-medium">
                    ✅ Completed
                  </span>
                ) : (
                  <span className="text-yellow-600 font-medium">
                    ⏳ Pending
                  </span>
                )}

                {app.status === "pending" && filter === "today" && (
                  <button
                    onClick={() => handleUpdate(app._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
                  >
                    Mark Completed
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Appointments;
