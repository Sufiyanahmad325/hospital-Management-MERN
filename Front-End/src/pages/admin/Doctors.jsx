import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor, getAllDoctors } from "../../reduxtollkit/hospitalManagementSlice";

const Doctors = () => {

  const specialization = ["Interventional Cardiology",

    "Pediatric Cardiology",

    "Electrophysiology",

    "Heart Failure Specialist",

    "Preventive Cardiology",



    // 🧠 Brain

    "Neurologist",

    "Neurosurgeon",

    "Neurocritical Care Specialist",



    // 🍽️ Stomach

    "Gastroenterologist",

    "Hepatologist",

  ]
  const [doctorLoginDetails, setDoctorLoginDetails] = useState({})
  const slots = [
    "11:00 AM",
    "11:15 AM",
    "11:30 AM",
    "11:45 AM",
    "12:00 PM",
    "12:15 PM",
    "12:30 PM",
    "12:45 PM",
    "01:00 PM",
    "01:15 PM",
    "01:30 PM",
    "01:45 PM",
    "02:00 PM",
    "02:15 PM",
    "02:30 PM",
    "02:45 PM",
    "03:00 PM",
    "03:15 PM",
    "03:30 PM",
    "03:45 PM",
    "04:00 PM"
  ]
  const { totalDepartments } = useSelector((state) => state.hospitalManagement)
  const [addSuccessfullyDoctor, setAddSuccessfullyDoctor] = useState(true)
  const [doctorFrom, setDoctorFrom] = useState({
    name: "",
    email: "",
    phone: "",
    departmentId: "",
    specialization: "",
    description: "",
    experience: "",
    availableDays: [],
    availableSlots: []
  })
  const { totalDoctors } = useSelector(state => state.hospitalManagement)

  const dispatch = useDispatch()

  const handleAddDoctor = async () => {
    // 🔴 BASIC VALIDATION
    if (!doctorFrom.name.trim()) {
      alert("Doctor name is required");
      return;
    }

    if (!doctorFrom.email.trim()) {
      alert("Email is required");
      return;
    }

    if (!doctorFrom.phone.trim()) {
      alert("Phone number is required");
      return;
    }

    if (!doctorFrom.departmentId) {
      alert("Please select department");
      return;
    }

    if (!doctorFrom.specialization) {
      alert("Please select specialization");
      return;
    }

    if (!doctorFrom.experience || doctorFrom.experience <= 0) {
      alert("Experience must be greater than 0");
      return;
    }

    if (doctorFrom.availableDays.length === 0) {
      alert("Please select available days");
      return;
    }

    if (doctorFrom.availableSlots.length === 0) {
      alert("Please select available slots");
      return;
    }

    // 🟢 API CALL
    try {
      const response = await dispatch(addDoctor(doctorFrom)).unwrap();
      console.log("Doctor added:", response);

      setAddSuccessfullyDoctor(true);

      setDoctorLoginDetails(response.loginCredentials)

      dispatch(getAllDoctors())
      // 🔄 RESET FORM
      setDoctorFrom({
        name: "",
        email: "",
        phone: "",
        departmentId: "",
        specialization: "",
        description: "",
        experience: "",
        availableDays: [],
        availableSlots: []
      });

    } catch (error) {
      console.log("Add doctor failed:", error);
      alert(error?.message || "Something went wrong");
    }
  };

  return (

    <div className="h-screen bg-blue-400 text-gray-800 overflow-y-auto w-full sm:w-[75vw] p-6 custom-scrollbar">

      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold mb-4 text-white">
        Doctors Management
      </h1>

      {/* ================= ADD DOCTOR FORM ================= */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-blue-600 mb-4">
          Add New Doctor
        </h2>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input onChange={(e) => setDoctorFrom(prev => ({ ...prev, name: e.target.value }))} placeholder="Doctor Name" className="border p-2 rounded focus:outline-blue-400" />
          <input onChange={(e) => setDoctorFrom(prev => ({ ...prev, email: e.target.value }))} placeholder="Email" className="border p-2 rounded focus:outline-blue-400" />
          <input onChange={(e) => setDoctorFrom(prev => ({ ...prev, phone: e.target.value }))} placeholder="Phone Number" className="border p-2 rounded focus:outline-blue-400" />

        </div>

        {/* // Department */}

        <div className="mt-4">
          <p className="p-1 font-medium">Departments</p>
          <select name="" id="" onChange={(e) => setDoctorFrom(prev => ({ ...prev, departmentId: e.target.value }))} className="border border-black w-full p-2 rounded-md focus:outline-blue-400">
            <option value="">Departments</option>
            {
              totalDepartments?.map((ele, ind) => (
                <option className="bg-green-200" key={ind} value={ele._id}>{ele.nameOfDepartment}</option>
              ))
            }
          </select>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-4">
          <p className="mb-1 font-medium">Experience (Years)</p>
          <input placeholder="Experience" onChange={(e) =>
            setDoctorFrom(prev => ({ ...prev, experience: Number(e.target.value) }))
          } className="border p-2 rounded w-full focus:outline-blue-400" />
        </div>

        {/* SPECIALIZATION DROPDOWN */}
        <div className="mt-4">
          <p className="mb-1 font-medium">Specialization</p>
          <select onChange={(e) => setDoctorFrom(prev => ({ ...prev, specialization: e.target.value }))} className="  border p-2 rounded w-full focus:outline-blue-400">
            <option value="">specialization</option>
            {
              specialization?.map((option, ind) => (
                <option className="bg-green-200" value={option} key={ind}>{option}</option>
              ))
            }
          </select>
        </div>

        {/* AVAILABLE DAYS */}
        <div className="mt-4">
          <p className="font-medium mb-2">Available Days</p>
          <div className="flex flex-wrap gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <label key={day} className="flex items-center gap-1 cursor-pointer">
                <input
                  value={day}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDoctorFrom((prev) => ({
                        ...prev, availableDays: [...prev.availableDays, day]
                      }))
                    } else {
                      let a = doctorFrom.availableDays.filter(ele => ele != day)
                      setDoctorFrom(prev => ({ ...prev, availableDays: [...a] }))
                    }

                  }}

                  type="checkbox" className="w-4 h-4" /> {day}
              </label>
            ))}
          </div>
        </div>

        {/* //  AvailableTimeSlots */}
        <div className="mt-4">
          <p>Available Time Slots</p>
          <div className=" w-full flex gap-4 flex-wrap">
            {
              slots.map((time, ind) => (
                <label key={ind} id={ind} className="flex items-center justify-center bg-gray-100" >
                  <input
                    value={time} type="checkbox" id={ind}
                    className="w-4 h-4"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDoctorFrom(prev => ({
                          ...prev, availableSlots: [...prev.availableSlots, time]
                        }))
                      } else {
                        let a = doctorFrom.availableSlots.filter(ele => ele != time)
                        setDoctorFrom(prev => ({ ...prev, availableSlots: [...a] }))
                      }
                    }}
                  />
                  {time}
                </label>
              ))
            }
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4">
          <p className="mb-1 font-medium">Description</p>
          <textarea
            placeholder="Doctor Description"
            value={doctorFrom.description}
            onChange={(e) =>
              setDoctorFrom(prev => ({ ...prev, description: e.target.value }))
            }

            className="border p-2 rounded w-full h-24 focus:outline-blue-400"
          />
        </div>

        <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition-all" onClick={(e) => handleAddDoctor()}>
          Add Doctor
        </button>
      </div>

      {/* =================   DOCTORS LIST  ================================================ */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-10">
        <h2 className="text-lg font-semibold text-green-600 mb-4">
          All Doctors
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Email</th>
                <th className="border p-2 text-left">Department</th>
                <th className="border p-2 text-left">Specialization</th>
                <th className="border p-2 text-left">Experience</th>
                <th className="border p-2 text-left">Days</th>
              </tr>
            </thead>
            <tbody>
              {totalDoctors?.map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="border p-2">{doc.user_id.name}</td>
                  <td className="border p-2">{doc.user_id.email}</td>
                  <td className="border p-2">{doc.department.nameOfDepartment}</td>
                  <td className="border p-2">{doc.specialization}</td>
                  <td className="border p-2">{doc.experience}</td>
                  <td className="border p-2">{doc.availableDays.join(',')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {
        addSuccessfullyDoctor && (
          <div className="fixed inset-0  flex items-center justify-center z-50">

            <div className="bg-green-200 w-[90%] sm:w-[30%] p-6 rounded-lg shadow-lg text-center">

              <h2 className="text-xl font-bold text-green-800 mb-3">
                Doctor has been Added Successfully
              </h2>
              <h2 className="text-md font-bold text-green-800 mb-3">
                Doctor email {doctorLoginDetails.email}
              </h2>
              <h2 className="text-md font-bold text-green-800 mb-3">
                Doctor password {doctorLoginDetails.password}
              </h2>

              <button
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
                onClick={(e) => setAddSuccessfullyDoctor(false)}
              >
                OK
              </button>

            </div>
          </div>
        )
      }

    </div>
  );
};

export default Doctors;