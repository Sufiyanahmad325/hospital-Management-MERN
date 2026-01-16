import express from "express";
import {
  completeAppointmentByDoctor,
  getAllDayAppointment,
  getDoctorDetails,
  getTodayDoctorAppointment,
  getTodayPendingAppointments,
} from "../controllers/doctor.controller.js";

import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { isDoctor } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(verifyJWT, isDoctor);

router.get("/getTodayappointments", getTodayDoctorAppointment);
router.get("/getTodayPendingappointments", getTodayPendingAppointments);
router.get("/getAllDayAppointment", getAllDayAppointment);
router.put("/completeAppointmentByDoctor", completeAppointmentByDoctor);
router.get("/getDoctorDetails", getDoctorDetails);

export default router;
