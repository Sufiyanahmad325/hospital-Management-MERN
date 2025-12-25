import express from "express";


import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { isPatient } from "../middlewares/role.middleware.js";
import { bookAppointment, cancelAppointment, getMyAppointments } from "../controllers/Appointment.Controller.js";

const router = express.Router();

router.use(verifyJWT, isPatient);

router.post("/bookAppointment", bookAppointment);
router.get("/getMyAppointments", getMyAppointments);
router.put("/:appointmentId/cancelAppointment", cancelAppointment);

export default router;
