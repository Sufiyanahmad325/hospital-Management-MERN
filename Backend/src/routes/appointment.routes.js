import express from "express";


import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { isPatient } from "../middlewares/role.middleware.js";
import { bookAppointment, cancelAppointment, getCompleteAppointment, getMyAppointments, getUpComingAppointment } from "../controllers/Appointment.Controller.js";

const router = express.Router();

router.use(verifyJWT, isPatient);

router.post("/bookAppointment", bookAppointment);
router.get("/getMyAppointments", getMyAppointments);
router.get('/getUpComingAppointment' , getUpComingAppointment)
router.get('/getCompleteAppointment' , getCompleteAppointment)
router.put("/:appointmentId/cancelAppointment", cancelAppointment);

export default router;
