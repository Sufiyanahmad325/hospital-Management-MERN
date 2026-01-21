
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





export const logoutPatient = asyncHandler(async (req, res) => {
  const id = req.user._id
  const user = await User.findOne({ _id: id })

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'user does not exist'
    })
  }

  const cookiesOptions = {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day  // maine schema me { expiresIn: "7d" }) de diya hai to kya yaha dena jaruri hai == haan kyuki yaha cookie ki expiry set kr rhe hai aur schema me token ki expiry set kr rhe hai dono alag cheeze hai or dono same honi chahiye taaki cookie expire hone ke baad token bhi expire ho jaye
  };

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "Strict",
    path: "/",
  });

  return res.status(200).json(
    new ApiResponse(true, [], 'You are logged out successfully')
  );


})
