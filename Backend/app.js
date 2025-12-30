import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';

import authRoutes from "./src/routes/auth.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import doctorRoutes from "./src/routes/doctor.routes.js";
import patientRoutes from "./src/routes/patient.routes.js";
import appointmentRoutes from "./src/routes/appointment.routes.js";

const app = express();


app.use(express.json()); // it is user to parse json body
app.use(express.urlencoded({ extended: true })); // it is used to parse urlencoded body
app.use(express.static('public')); // it is used to serve static files from public folder exmaple: images, css, js files

app.use(cookieParser()); // it is used to parse cookies

app.use(cors({origin: process.env.CORS_ORIGIN || "http://localhost:3000" , credentials: true})); // it is used to enable cors such as accessing api from different domain , creadentials: it is used to send cookies from client to server



app.use("/hospital/auth", authRoutes);
app.use("/hospital/admin", adminRoutes);
app.use("/hospital/doctor", doctorRoutes);
app.use("/hospital/patient", patientRoutes);
app.use("/hospital/appointments", appointmentRoutes);




app.get('/', (req ,res)=>{
    res.send('Hello World!');
})


export default app;