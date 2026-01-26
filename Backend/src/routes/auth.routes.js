import express from "express";
import {registerPatient,login, getMe, logoutUser} from "../controllers/authController/auth.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = express.Router();



router.post("/registerPatient", registerPatient); // patient register
router.post("/login", login);               // all roles login
router.get("/getMe",verifyJWT, getMe);               // all roles login
router.get("/logoutUser",verifyJWT, logoutUser);


export default router;
