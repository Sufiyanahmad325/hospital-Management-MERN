import React, { useState } from "react";

const Appointments = () => {
  
  const [today, setToday] = useState(new Date().toISOString().split("T")[0]);

  console.log(today)

  const [filter, setFilter] = useState("today");

  const [appointments, setAppointments] = useState([
    {
      id: "APP-101",
      patientName: "Noman",
      date: "2025-12-31",
      time: "10:30 AM",
      status: "pending",
    },
    {
      id: "APP-103",
      patientName: "Sufiyan",
      date: "2026-01-01",
      time: "12:15 PM",
      status: "pending",
    },
    {
      id: "APP-102",
      patientName: "Sajida",
      date: "2025-12-31",
      time: "11:00 AM",
      status: "completed",
    },
    {
      id: "APP-201",
      patientName: "Amit",
      date: "2026-01-02",
      time: "09:00 AM",
      status: "pending",
    },
  ]);

  // ✅ Complete appointment
  const completeAppointment = (id) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status: "completed" } : app
      )
    );
  };

  // ✅ Filter logic (easy)
  const filteredAppointments = appointments.filter((app) => {
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
              ${
                filter === type
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
              key={app.id}
              className="bg-white rounded-xl shadow p-5 space-y-3 hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                  {app.id}
                </span>
                <span className="text-sm text-gray-500">
                  {app.time}
                </span>
              </div>

              {/* PATIENT */}
              <div>
                <p className="text-sm text-gray-500">Patient</p>
                <h3 className="text-lg font-bold text-gray-800">
                  {app.patientName}
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

                {app.status === "pending" && (
                  <button
                    onClick={() => completeAppointment(app.id)}
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
