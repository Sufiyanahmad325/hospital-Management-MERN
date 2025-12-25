import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/patient.controller.js";

import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

import { isPatient } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(verifyJWT, isPatient);

router.get("/getMyProfile", getMyProfile);
router.put("/updateMyProfile", updateMyProfile);

export default router;
