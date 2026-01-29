import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, getAllDepartments } from "../../reduxtollkit/hospitalManagementSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

const availableDaysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const allSlots = [
    "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
    "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM", "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
    "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM", "04:00 PM"
];

const ChangeDoctorDetails = () => {
    const dispatch = useDispatch();
    const { doctorId } = useParams();
    const [doctorsDetails, setDoctorsDetails] = useState({})
    const { totalDoctors, totalDepartments } = useSelector((state) => state.hospitalManagement);

    const [selectedDoctorId, setSelectedDoctorId] = useState("");
    const [form, setForm] = useState({
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



    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChangeDetails = async (id) => {
        console.log("first====> ", id)
        if (!selectedDoctorId) {
            alert("Please select a doctor.");
            return;
        }
    }




    useEffect(() => {
        dispatch(getAllDoctors());
        dispatch(getAllDepartments());
    }, [dispatch]);


    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/hospital/admin/getDoctorDetailsByAdmin/${doctorId}`);
                setDoctorsDetails(res.data);
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
                    <select
                        value={selectedDoctorId}
                        onChange={(e) => setSelectedDoctorId(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="">-- Choose doctor --</option>
                        {totalDoctors?.map((doc) => (
                            <option key={doc._id} value={doc._id}>
                                {doc.user_id?.name} — {doc.user_id?.email}
                            </option>
                        ))}
                    </select>
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
                            onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full border p-2 rounded"
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
                            value={form.departmentId}
                            onChange={(e) => setForm(prev => ({ ...prev, departmentId: e.target.value }))}
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
                                <input type="checkbox" className="mr-2" />
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
                                <input type="checkbox" className="mr-1" />
                                {slot}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={(e) => handleChangeDetails(doc._id)}
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
                        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Change Password</button>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default ChangeDoctorDetails;
