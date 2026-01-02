import {Doctor} from "../models/doctorSchema.js";
import {Appointment} from "../models/appointmentSchema.js";
import  ApiResponse from "../utils/ApiResponse.js";




export const getDoctorAppointments = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const {date} = req.body; // expected format: 'YYYY-MM-DD'

    console.log(date)

    // 1️⃣ Find doctor profile
    const doctor = await Doctor.findOne({ user_id:userId });
    if (!doctor || doctor <= 0) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Doctor profile not found"));

        console.log("=============== >" ,doctor)
    }
    // 2️⃣ Get appointments for this doctor
    const appointments = await Appointment.find({
      doctorId: doctor._id,
      date:date,
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





export const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status } = req.body; // completed | cancelled
    const userId = req.user.id;

    console.log( 'appointmentId :', appointmentId , 'status: ' ,status , 'userId : ' , userId )

    if (!["completed", "cancelled"].includes(status)) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, "Invalid status value"));
    }

    // 1️⃣ Find doctor
    const doctor = await Doctor.findOne({ user_id: userId });
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
