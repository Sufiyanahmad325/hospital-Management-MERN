// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

// Auth

// Admin
import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Departments from "../pages/admin/Department";
import Doctors from "../pages/admin/Doctors";
import Patients from "../pages/admin/Patients";
import AdminAppointments from "../pages/admin/Appointments";

// Doctor
import DoctorLayout from "../pages/doctor/DoctorLayout";
import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorProfile from "../pages/doctor/Profile";

// Patient
import PatientLayout from "../pages/patient/PatientLayout";
import PatientDashboard from "../pages/patient/Dashboard";
import PatientAppointments from "../pages/patient/Appointments";
import BookAppointment from "../pages/patient/BookAppointments";
import PatientProfile from "../pages/patient/Profile";
import Login from "../pages/auth/login";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔐 Auth */}

      <Route path="/" element={<Login />} />
      {/* <Route path="/login" element={<Login />} /> */}

      {/* 👑 Admin */}
      <Route
        path="/admin"  element={<ProtectedRoute role="admin"> <AdminLayout /> </ProtectedRoute>}
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="departments" element={<Departments />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="patients" element={<Patients />} />
        <Route path="appointments" element={<AdminAppointments />} />
      </Route>

      {/* 🩺 Doctor */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="profile" element={<DoctorProfile />} />
      </Route>

      {/* 👤 Patient */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute role="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientAppointments />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="profile" element={<PatientProfile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
