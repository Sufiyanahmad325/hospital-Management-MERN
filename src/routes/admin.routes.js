import express from "express";
import {
  createDepartment,
  addDoctor,
  getAllDoctors,
  getAllPatients,
} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

// 🔐 Admin only
router.use(verifyJWT, isAdmin); // is it middleware  == yes // ye kab run hoga == jab bhi koi request aayegi to ye pehle run hoga example = agar koi department create krna chahta hai to pehle ye middleware run hoga and check krega ki kya wo admin hai agar hai to hi aage jaega agr nhi hai to error de dega


// router.post("/department",verifyJWT , isAdmin, createDepartment); //yaha aysa banaya ja skta hai = yes likin upar hi krna better hai 


router.post("/addDepartment", createDepartment);
router.post("/addDoctor", addDoctor);
router.get("/getAllDoctors", getAllDoctors);
router.get("/getAllPatients", getAllPatients);

export default router;
