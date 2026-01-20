import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelAppointment, getAllCancelledAppointment, getUpComingAppointment } from "../../reduxtollkit/patientControlSlice";

const Appointments = () => {

  const [category, setCategory] = useState('upcoming')
  const [filterData, setFilterData] = useState([])

  const { upComingAppointment, cancelledAppointment, completedAppointment } = useSelector((state) => state.patientControl)
  const dispatch = useDispatch()

  useEffect(() => {
    if (category == "upcoming" && upComingAppointment.length !== 0) {
      setFilterData(upComingAppointment)
    }
    if (category == 'cancelled' && cancelledAppointment.length !== 0) {
      setFilterData(cancelledAppointment)
    }
    if (category == 'completed' && completedAppointment.length !== 0) {
      setFilterData(completedAppointment)
    }
  }, [upComingAppointment, cancelledAppointment, completedAppointment, category])


  const handleCancelledAppointment =async(id)=>{
    console.log(id)
     let res = await dispatch(cancelAppointment(id)).unwrap()
     console.log("kay sir =====> ",res)
     if(res.success){
        dispatch(getUpComingAppointment())
        dispatch(getAllCancelledAppointment())
     }
  }


  return (
    <div className="h-screen bg-blue-100 p-6 sm:w-[75vw] space-y-6 sm:overflow-y-auto">

      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          My Appointments
        </h1>
        <p className="text-sm text-gray-500">
          View your upcoming and past appointments
        </p>
      </div>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex gap-4">
        <button
          onClick={() => setCategory('upcoming')}
          className={`${category === 'upcoming' ? 'bg-blue-500 text-white ' : 'text-black bg-white'} border px-4 py-2 rounded`}>
          Upcoming
        </button>

        <button
          onClick={() => setCategory('completed')}
          className={`${category === 'completed' ? 'bg-blue-500 text-white ' : 'text-black bg-white'} border px-4 py-2 rounded`}>
          Completed
        </button>

        <button
          onClick={() => setCategory('cancelled')}
          className={`${category === 'cancelled' ? 'bg-blue-500 text-white ' : 'text-black bg-white'} border  px-4 py-2 rounded`}>
          Cancelled
        </button>
      </div>

      {/* ================= APPOINTMENT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

        {/* CARD 1 */}
        {
          filterData?.map((ele) => (
            <div key={ele?._id} className="bg-white rounded-xl shadow p-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                  Upcoming {ele._id}
                </span>
                <span className="text-sm text-gray-500">
                  {ele?.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-800">
                {ele.doctorId.user_id.name}
              </h3>

              <p className="text-sm text-gray-500">
                {ele?.doctorId?.specialization}
              </p>

              <div className="flex justify-between text-sm text-gray-600">
                <span>⏰ {ele.timeSlot}</span>
                <span>📍 Room 203</span>
              </div>

              {
                ele.status === "pending" && (
                  <button onClick={()=>handleCancelledAppointment(ele._id)} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
                Cancel Appointment
              </button>
                )
              }
            </div>
          ))
        }



      </div>

    </div>
  );
};

export default Appointments;
