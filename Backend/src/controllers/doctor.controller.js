import { Doctor } from "../models/doctorSchema.js";
import { Appointment } from "../models/appointmentSchema.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";



export const getTodayDoctorAppointment = asyncHandler(async (req, res) => {
  const { doctorId } = req.user._id

  let todayDate = new Date().toISOString().split("T")[0];

  const user = await Doctor.find({ doctorId: doctorId })

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'only doctor can Access'
    })
  }

  const TodayAppointments = await Appointment.find({
    doctorid: doctorId,
    date: todayDate,
    // status: 'pending' || 'completed' 
    status: { $in: ['pending', 'completed'] } // i doing this becouse i have to filter completed and pending appointment in frontend that how much appointment has been completed and pending
  }).sort({ createdAt: 1 })
    .populate({ path: 'patientId', select: "name address" })


  return res.status(201).json(
    new ApiResponse(201, TodayAppointments, 'Today Appointments fetch successfully')
  )
})


export const getTodayPendingAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    let todayDate = new Date().toISOString().split("T")[0];

    // 1️⃣ Find doctor profile
    const doctor = await Doctor.findOne({ user_id: userId });
    if (!doctor || doctor <= 0) {
      throw new ApiError(401, 'doctor not found ')

    }
    // 2️⃣ Get appointments for this doctor
    const appointments = await Appointment.find({
      doctorId: doctor._id,
      date: todayDate,
      status: 'pending'
    })
      // is this nexted populate correct? yes it is 
      .populate({
        path: "patientId",
        populate: { path: "user_id", select: "name email" },
      })
      .sort({ createdAt: 1 }); // it will sort by ascending order of creation time means older appointment will come first

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          appointments,
          "Doctor appointments fetched successfully"
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, error.message));
  }
};



export const getAllDayAppointment = asyncHandler(async (req, res) => {
  const Id = req.user._id;

  const doctor = await Doctor.findOne({
    user_id: Id
  })

  // 👉 aaj ki date string
  const today = new Date().toISOString().split("T")[0];

  const appointments = await Appointment.find({
    doctorId: doctor._id,
    date: { $gte: today }, // ✅ today + future
    status: { $in: ['pending', 'completed'] }
  }).sort({ createdAt: 1 })
  .populate({
    path:"patientId" , select:"name"
  })

  if (!appointments.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "No upcoming appointments found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, appointments, "Appointments fetched successfully"));
});




export const completeAppointmentByDoctor = asyncHandler(async (req, res) => {
  const { appointmentId } = req.body

  const date = new Date().toISOString().split('T')[0]

  const appointment = await Appointment.findOne({ _id: appointmentId, date: date, status: 'pending' })

  if (!appointment) {
    throw new ApiError(401, "Appointment does not exist")
  }

  appointment.status = "completed"

  await appointment.save({ validateBeforeSave: false })


  return res.status(200).json(
    new ApiResponse(200, null, "Appointment has been completed")
  );


})





