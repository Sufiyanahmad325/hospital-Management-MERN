import {Doctor} from "../models/doctorSchema.js";
import {Appointment} from "../models/appointmentSchema.js";
import  ApiResponse from "../utils/ApiResponse.js";
/**
 * ✅ Doctor → Get My Appointments
 * GET /doctor/appointments
 */
export const getDoctorAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    // 1️⃣ Find doctor profile
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Doctor profile not found"));
    }

    // 2️⃣ Get appointments for this doctor
    const appointments = await Appointment.find({
      doctorId: doctor._id,
    })
      .populate({
        path: "patientId",
        populate: { path: "userId", select: "name email" },
      })
      .sort({ date: 1 });

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

/**
 * ✅ Doctor → Update Appointment Status
 * PUT /doctor/appointments/:id
 */
export const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body; // completed | cancelled
    const userId = req.user.id;

    if (!["completed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid status value"));
    }

    // 1️⃣ Find doctor
    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Doctor profile not found"));
    }

    // 2️⃣ Find appointment
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      doctorId: doctor._id,
    });

    if (!appointment) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Appointment not found"));
    }

    if (appointment.status !== "pending") {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            "Only pending appointments can be updated"
          )
        );
    }

    // 3️⃣ Update status
    appointment.status = status;
await appointment.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          appointment,
          `Appointment ${status} successfully`
        )
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, error.message));
  }
};
