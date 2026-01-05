
import { Patient } from "../models/patientSchema.js";



export const getMyProfile = async (req, res) => {
  try {
    const patientId = req.user._id;

    const patient = await Patient.findOne({ user_id: req.user._id })
    .populate("user_id", "email");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({
      patient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






export const updateMyProfile = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { name, phone ,age , address , gender } = req.body;

    const patient = await Patient.findOne({ user_id: patientId });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Only allowed fields
    if (name) patient.name = name || patient.name;
    if (phone) patient.phone = phone || patient.phone;
    if( age ) patient.age = age || patient.age;
    if( address ) patient.address = address || patient.address;
    if( gender ) patient.gender = gender || patient.gender;

    await patient.save(); // yaha validateBeforesave true nhi kiya to ye field update kayse ho rha hai 

    res.status(200).json({
      message: "Profile updated successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
