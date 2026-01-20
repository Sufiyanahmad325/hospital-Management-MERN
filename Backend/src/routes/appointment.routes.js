import express from "express";


import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { isPatient } from "../middlewares/role.middleware.js";
import { bookAppointment, cancelAppointment, getAllDoctor, getCompleteAppointment, getMyAppointments, getUpComingAppointment, totalCancelledAppointment } from "../controllers/Appointment.Controller.js";

const router = express.Router();

router.use(verifyJWT, isPatient);

router.post("/bookAppointment", bookAppointment);
router.get("/getMyAppointments", getMyAppointments);
router.get('/getUpComingAppointment' , getUpComingAppointment)
router.get('/getCompleteAppointment' , getCompleteAppointment)
router.get('/getAllCancelledAppointment' , totalCancelledAppointment)
router.put("/cancelAppointment/:appointmentId", cancelAppointment);
router.get("/getAllDoctor", getAllDoctor);
export default router;
