import express from "express";


import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

import { isPatient } from "../middlewares/role.middleware.js";
import { getMyProfile, updateMyProfile } from "../controllers/Patient.controller.js";

const router = express.Router();

router.use(verifyJWT, isPatient);




router.get("/getMyProfile", getMyProfile)
router.put("/updateMyProfile", updateMyProfile);

export default router;
