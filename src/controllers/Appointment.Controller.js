import { Appointment } from "../models/appointmentSchema.js"
import { Doctor } from "../models/doctorSchema.js";
import { Patient } from "../models/patientSchema.js";
import ApiResponse from "../utils/ApiResponse.js";
import { isDateWithin20Days } from "../utils/dateAvailableHelper.js";
import { getDayFromDate } from "../utils/getDayFromDate.js";
import { getNextFreeSlot } from "../utils/getFirstAvailableTimeSlot.js";

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    const patientsId = req.user.id;



    // 1️⃣ Patient
    const patient = await Patient.findOne({ patientId: patientsId });
    if (!patient) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Patient profile not found"));
    }

    // 2️⃣ Doctor
    const doctor = await Doctor.findOne({ doctorId: doctorId });
    if (!doctor) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Doctor not found"));
    }
    console.log('=====================================================')

    // 3️⃣ Day availability check
    const isAvailableDate = await isDateWithin20Days(date);
    if (!isAvailableDate) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "Selected date is not available for booking")
        );
    }
    const appointmentDayName = await getDayFromDate(date);

    if (!doctor.availableDays.includes(appointmentDayName)) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, `Doctor is not available on ${appointmentDayName}s`)
        );
    }

    const isAvailableTime = await getNextFreeSlot(doctor.doctorId, date);

    if (!isAvailableTime) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "No available time slots for the selected date")
        );
    }

    //   ye is doctor ke kitne appointments hain us din ke liye wo do krega
    // isse fayda ye hoga ek doctor ke ek din me kitne appointments hain wo pata chal jayega
    const appointmentCount = await Appointment.countDocuments({
      doctorId,
      date,
      status: "pending",
    }); // ye sirf us din ke liye kitne appointments hain wo dikhayega or 

    if (appointmentCount >= 40) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "Doctor has reached maximum appointments for this day")
        );
    }

    // 5️⃣ Double booking check
    const existingAppointment = await Appointment.findOne({
      patientId: patient.patientId,
      doctorId,
      date,
      dayName: appointmentDayName,
      status: "pending",
    });

    if (existingAppointment) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "You already have an appointment with this doctor on the selected date")
        );
    }

    // 4️⃣ Check if the patient already has an appointment with this doctor on the selected date and time 
    console.log(isAvailableTime)

    const isAnyOneBooked = await Appointment.findOne({
      doctorId,
      date,
      timeSlot: isAvailableTime,
      status: "pending",
    });

    if (isAnyOneBooked) {
      return res
        .status(400)
        .json(
          new ApiResponse(400, null, "Selected time slot is already booked")
        );
    }

    // 6️⃣ Create appointment
    const appointment = await Appointment.create({
      patientId: patient.patientId,
      doctorId,
      timeSlot: isAvailableTime,
      dayName: appointmentDayName,
      date,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, appointment, "Appointment booked successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, error.message));
  }
};












