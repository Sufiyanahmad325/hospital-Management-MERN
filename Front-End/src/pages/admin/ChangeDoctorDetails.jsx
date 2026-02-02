import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, getAllDepartments, getDoctorDetailsByAdmin, editDoctorDetailsByAdmin, changeDoctorPasswordByAdmin } from "../../reduxtollkit/hospitalManagementSlice";
import { useNavigate, useParams } from "react-router-dom";

const availableDaysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const allSlots = [
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
    "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM", "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
    "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM", "04:00 PM"
];

const ChangeDoctorDetails = () => {
    const dispatch = useDispatch();
    const { doctorId } = useParams();
    const navigate = useNavigate()
    const {totalDepartments} = useSelector((state) => state.hospitalManagement);
    

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        specialization: "",
        description: "",
        experience: "",
        availableDays: [],
        availableSlots: []
    });
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const handleChangeDetails = async (id) => {
                if (!doctorId) {
            alert("Please select a doctor.");
            return;
        }

        try {
            const res = await dispatch(editDoctorDetailsByAdmin({ doctorId, doctorDetails: form })).unwrap()
            if (res.success) {
                dispatch(getAllDoctors())
                alert("Doctor details updated successfully!")
                
                navigate(-1)
            }
        } catch (error) {
            
            alert(error.response?.message || 'something went wrong')
        }
    }



    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
                try {
            const res = await dispatch(changeDoctorPasswordByAdmin({ doctorId, newPassword })).unwrap();
            if (res.success) {
                alert("Password changed successfully!");
                
                setNewPassword("");
                setConfirmPassword("");
                navigate(-1);
            }
        } catch (error) {
            
            alert("Failed to change password. Please try again.");
        }
    }




    useEffect(() => {
        dispatch(getAllDoctors());
        dispatch(getAllDepartments());
    }, [dispatch]);


    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const res = await dispatch(getDoctorDetailsByAdmin(doctorId)).unwrap();
                setForm({
                    name: res.data.user_id.name,
                    email: res.data.user_id.email,
                    phone: res.data.phone || "N/A",
                    department: res.data.department,
                    specialization: res.data.specialization,
                    description: res.data.description || "the doctor has not added description",
                    experience: res.data.experience,
                    availableDays: res.data.availableDays,
                    availableSlots: res.data.availableSlots
                })
                console.log("Doctor details fetched:", res.data);
            } catch (error) {
                console.error("Error fetching doctor details:", error);
            }
        };
        fetchDoctorDetails();

    }, [doctorId]);



    return (
        <div className="p-6 sm:p-10 sm:w-[75vw] bg-blue-200 h-screen overflow-y-auto ">

            <div className="sm:w-full mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Edit Doctor Details & Change Password</h2>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Doctor</label>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full border p-2 rounded"
                            placeholder="Doctor name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            value={form.email}
                            disabled={true}
                            className="w-full border p-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed  disabled:text-gray-600"
                            placeholder="Doctor email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Phone</label>
                        <input
                            value={form.phone}
                            onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full border p-2 rounded"
                            placeholder="Phone"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Department</label>
                        <select
                            value={form.department}
                            onChange={(e) => setForm(prev => ({ ...prev, department: e.target.value }))}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select department</option>
                            {totalDepartments?.map((d) => (
                                <option key={d._id} value={d._id}>
                                    {d.nameOfDepartment}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Specialization</label>
                        <input
                            value={form.specialization}
                            onChange={(e) => setForm(prev => ({ ...prev, specialization: e.target.value }))}
                            className="w-full border p-2 rounded"
                            placeholder="e.g. Cardiologist"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Experience (years)</label>
                        <input
                            type="number"
                            value={form.experience}
                            onChange={(e) => setForm(prev => ({ ...prev, experience: Number(e.target.value) }))}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                            className="w-full border p-2 rounded"
                            rows={3}
                            placeholder="Short description"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Available Days</p>
                    <div className="flex flex-wrap gap-3">
                        {availableDaysList.map((day) => (
                            <label key={day} className="cursor-pointer px-3 py-1 rounded border">
                                <input type="checkbox" checked={form.availableDays.includes(day)}
                                    onChange={() => setForm(prev => ({
                                        ...prev, availableDays: form.availableDays.includes(day)
                                            ? form.availableDays.filter(d => d !== day) : [...form.availableDays, day]
                                    }))}
                                    className="mr-2" />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Available Slots (select multiple)</p>
                    <div className="flex flex-wrap gap-2">
                        {allSlots.map((slot) => (
                            <label key={slot} className="cursor-pointer px-2 py-1 rounded border">
                                <input type="checkbox" checked={form.availableSlots.includes(slot)}
                                    onChange={() => setForm(prev => ({
                                        ...prev, availableSlots: form.availableSlots.includes(slot) ? form.availableSlots.filter(formSlot => formSlot != slot) : [...form.availableSlots, slot]
                                    }))}
                                    className="mr-1" />
                                {slot}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={(e) => handleChangeDetails()}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Save Changes
                </button>

                <hr className="my-6" />

                <div>
                    <h3 className="text-lg font-medium mb-3">Change Doctor Password</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder="Enter new password"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full border p-2 rounded"
                                placeholder="Confirm new password"
                            />
                        </div>
                        <button
                            onClick={() => handleChangePassword()}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Change Password</button>
                    </div>


                </div>

            </div>

        </div>
    );
};

export default ChangeDoctorDetails;
