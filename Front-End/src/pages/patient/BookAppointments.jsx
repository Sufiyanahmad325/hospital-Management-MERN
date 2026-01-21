import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment, getAllDoctor, getUpComingAppointment } from "../../reduxtollkit/patientControlSlice";

const BookAppointment = () => {

  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')

  const dispatch = useDispatch()
  const { doctors } = useSelector((state) => state.patientControl)

  const handleBookAppointment = async (e) => {
    e.preventDefault()
    console.log('id:', doctorId, " date: ", date)
    try {
      const res = await dispatch(bookAppointment({ doctorId: doctorId, date: date })).unwrap()
      if (res.success) {
        // alert(res.message  , '\n This is your Appointment Id : ' , res?.data?._id) // it will get only one string so here is only show res.message 
        alert(`${res.message}\nThis is your Appointment Id: ${res?.data?._id}`) // this is one string

        dispatch(getUpComingAppointment())
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    dispatch(getAllDoctor())
  }, [])

  console.log('this is doctors ====> ', doctors)

  return (
    <div className="min-h-screen bg-blue-100 p-6 sm:w-[75vw]">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Book Appointment
      </h1>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow p-6 max-w-xl">

        <form className="space-y-5">

          {/* DOCTOR SELECT */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Select Doctor
            </label>

            <select
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Choose Doctor</option>
              {
                doctors?.map((ele) => (
                  <option key={ele?._id} value={ele?._id}>{ele?.user_id?.name} ({ele?.specialization})</option>
                ))
              }
            </select>
          </div>

          {/* DATE SELECT */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Select Date
            </label>

            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* INFO BOX */}
          <div className="bg-blue-50 p-4 rounded text-sm text-blue-700">
            ✔ Appointments can be booked up to next 20 days
            <br />
            ✔ Time slot will be assigned automatically
            <br />
            ✔ Only one appointment per doctor per day
          </div>

          {/* SUBMIT BUTTON */}
          <button
            onClick={(e) => handleBookAppointment(e)}
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-medium"
          >
            Book Appointment
          </button>

        </form>
      </div>

    </div>
  );
};

export default BookAppointment;
