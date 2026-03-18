import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDoctor, getAllDoctors } from "../../reduxtollkit/hospitalManagementSlice";
import { NavLink } from "react-router-dom";
import { FaUserMd, FaTable, FaUserPlus } from "react-icons/fa";

const Doctors = () => {
  const specialization = [
    "Interventional Cardiology", "Pediatric Cardiology", "Electrophysiology", "Heart Failure Specialist", "Preventive Cardiology",
    "Neurologist", "Neurosurgeon", "Neurocritical Care Specialist",
    "Gastroenterologist", "Hepatologist",
  ];

  const [doctorLoginDetails, setDoctorLoginDetails] = useState({});
  const slots = [
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12:00 PM", "12:15 PM",
    "12:30 PM", "12:45 PM", "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
    "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM", "03:00 PM", "03:15 PM",
    "03:30 PM", "03:45 PM", "04:00 PM"
  ];

  const { totalDepartments, totalDoctors } = useSelector((state) => state.hospitalManagement);
  const [addSuccessfullyDoctor, setAddSuccessfullyDoctor] = useState(false);
  const [doctorFrom, setDoctorFrom] = useState({
    name: "", email: "", phone: "", departmentId: "", specialization: "",
    description: "", experience: "", availableDays: [], availableSlots: []
  });

  const dispatch = useDispatch();

  const handleAddDoctor = async () => {
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

    try {
      const response = await dispatch(addDoctor(doctorFrom)).unwrap();
      setAddSuccessfullyDoctor(true);
      setDoctorLoginDetails(response.loginCredentials);
      dispatch(getAllDoctors());
      setDoctorFrom({
        name: "", email: "", phone: "", departmentId: "", specialization: "",
        description: "", experience: "", availableDays: [], availableSlots: []
      });
    } catch (error) {
      alert(error?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen bg-[#b3d4f6] text-gray-800 overflow-y-auto w-full sm:w-[75vw] p-6 custom-scrollbar">
      
      {/* PAGE TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <FaUserMd className="text-3xl text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Doctors Management
        </h1>
      </div>

      {/* ================= ADD DOCTOR FORM ================= */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h2 className="text-lg font-bold text-blue-600 mb-5 flex items-center gap-2">
          <FaUserPlus /> Add New Doctor
        </h2>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input value={doctorFrom.name} onChange={(e) => setDoctorFrom(prev => ({ ...prev, name: e.target.value }))} placeholder="Doctor Name" className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 transition-all" />
          <input value={doctorFrom.email} onChange={(e) => setDoctorFrom(prev => ({ ...prev, email: e.target.value }))} placeholder="Email" className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 transition-all" />
          <input value={doctorFrom.phone} onChange={(e) => setDoctorFrom(prev => ({ ...prev, phone: e.target.value }))} placeholder="Phone Number" className="border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 transition-all" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
          {/* Department */}
          <div>
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Department</label>
            <select value={doctorFrom.departmentId} onChange={(e) => setDoctorFrom(prev => ({ ...prev, departmentId: e.target.value }))} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 mt-1">
              <option value="">Select Department</option>
              {totalDepartments?.map((ele, ind) => (
                <option key={ind} value={ele._id}>{ele.nameOfDepartment}</option>
              ))}
            </select>
          </div>

          {/* Specialization */}
          <div>
            <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Specialization</label>
            <select value={doctorFrom.specialization} onChange={(e) => setDoctorFrom(prev => ({ ...prev, specialization: e.target.value }))} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 mt-1">
              <option value="">Select Specialization</option>
              {specialization?.map((option, ind) => (
                <option key={ind} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* EXPERIENCE */}
        <div className="mt-4">
          <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Experience (Years)</label>
          <input type="number" value={doctorFrom.experience} placeholder="Years of Experience" onChange={(e) => setDoctorFrom(prev => ({ ...prev, experience: Number(e.target.value) }))} className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 mt-1" />
        </div>

        {/* AVAILABLE DAYS */}
        <div className="mt-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <p className="font-bold text-blue-700 text-sm mb-3">Available Days</p>
          <div className="flex flex-wrap gap-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <label key={day} className="flex items-center gap-2 cursor-pointer group">
                <input
                  checked={doctorFrom.availableDays.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDoctorFrom((prev) => ({ ...prev, availableDays: [...prev.availableDays, day] }))
                    } else {
                      setDoctorFrom(prev => ({ ...prev, availableDays: prev.availableDays.filter(ele => ele !== day) }))
                    }
                  }}
                  type="checkbox" className="w-4 h-4 accent-blue-600" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">{day}</span>
              </label>
            ))}
          </div>
        </div>

        {/* AVAILABLE TIME SLOTS */}
        <div className="mt-6 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
          <p className="font-bold text-indigo-700 text-sm mb-3">Available Time Slots</p>
          <div className="flex gap-2 flex-wrap max-h-32 overflow-y-auto p-1 custom-scrollbar">
            {slots.map((time, ind) => (
              <label key={ind} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all cursor-pointer ${doctorFrom.availableSlots.includes(time) ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-400'}`}>
                <input
                  checked={doctorFrom.availableSlots.includes(time)}
                  value={time} type="checkbox" 
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDoctorFrom(prev => ({ ...prev, availableSlots: [...prev.availableSlots, time] }))
                    } else {
                      setDoctorFrom(prev => ({ ...prev, availableSlots: prev.availableSlots.filter(ele => ele !== time) }))
                    }
                  }}
                />
                <span className="text-[10px] font-bold">{time}</span>
              </label>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-6">
          <label className="text-xs font-bold text-gray-400 ml-1 uppercase">Doctor Bio / Description</label>
          <textarea
            placeholder="Tell us about the doctor's background..."
            value={doctorFrom.description}
            onChange={(e) => setDoctorFrom(prev => ({ ...prev, description: e.target.value }))}
            className="w-full border border-gray-200 p-3 rounded-xl h-24 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 mt-1 transition-all"
          />
        </div>

        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95" onClick={handleAddDoctor}>
          Register Doctor
        </button>
      </div>

      {/* ================= DOCTORS LIST ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-10">
        <div className="p-5 border-b border-gray-50 flex items-center gap-2 bg-gray-50/50">
          <FaTable className="text-green-600" />
          <h2 className="text-lg font-bold text-gray-700">All Registered Doctors</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-white text-left border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Doctor Info</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Department</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Specialization</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {totalDoctors?.map((doc, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{doc.user_id.name}</span>
                      <span className="text-xs text-gray-400">{doc.user_id.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-600">{doc.department.nameOfDepartment}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 rounded text-[10px] font-bold text-gray-500 uppercase">{doc.specialization}</span>
                  </td>
                  <td className="p-4 text-center">
                    <NavLink to={`/admin/change-doctor-details/${doc._id}`} className="inline-block bg-blue-50 text-blue-600 px-5 py-2 rounded-lg font-bold text-xs hover:bg-blue-600 hover:text-white transition-all">
                      Edit
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUCCESS MODAL (CREDENTIALS) */}
      {addSuccessfullyDoctor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl text-center border border-green-100">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserPlus size={30} />
            </div>
            <h2 className="text-xl font-black text-gray-800 mb-4">Doctor Registered!</h2>
            <div className="bg-gray-50 p-4 rounded-2xl text-left space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Email:</span>
                <span className="font-bold text-gray-700">{doctorLoginDetails.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Password:</span>
                <span className="font-bold text-gray-700 font-mono">{doctorLoginDetails.password}</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all" onClick={() => setAddSuccessfullyDoctor(false)}>
              Got it, Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;