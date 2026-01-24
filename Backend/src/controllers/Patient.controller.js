
import { Appointment } from "../models/appointmentSchema.js";
import { Patient } from "../models/patientSchema.js";
import { User } from "../models/userSchema.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"






export const getMyProfile = asyncHandler(async (req, res) => {
  const patientId = req.user._id;

  const patient = await Patient.findOne({ user_id: req.user._id })
    .populate("user_id", "name email");

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  res.status(200).json(
    new ApiResponse(201, patient, 'patient has been successfully fetched')
  );
})






export const updateMyProfile = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { name, phone, age, address, gender } = req.body;

    const patient = await Patient.findOne({ user_id: patientId })
      .populate("user_id", "name email");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Only allowed fields
    if (name) patient.name = name || patient.name;
    if (phone) patient.phone = phone || patient.phone;
    if (age) patient.age = age || patient.age;
    if (address) patient.address = address || patient.address;
    if (gender) patient.gender = gender || patient.gender;

    await patient.save(); // yaha validateBeforesave true nhi kiya to ye field update kayse ho rha hai 

    res.status(201).json(
      new ApiResponse(201, patient, 'Profile updated successfully')
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






