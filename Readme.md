# Hospital Management System (MERN Stack)

This is a **Full-Stack Hospital Management System** built using **React.js**, **Node.js**, **Express.js**, and **MongoDB**, designed to digitize hospital workflows and support multi-role access for **Admin**, **Doctor**, and **Patient**. The system includes secure login, appointment booking, department management, and role-specific dashboards.

---

## 🌐 Live Demo & GitHub

**Frontend Repository:** [Link](https://github.com/Sufiyanahmad325/hospital-Management-MERN.git)
**Backend Repository:** [Link](https://github.com/Sufiyanahmad325/hospital-Management-MERN.git)

> Note: Clone both frontend and backend, then run concurrently. Environment variables required.

---

## 🔐 User Roles and Features

### Admin Features

- Login with secure JWT + HttpOnly Cookie authentication.
- Add/Edit/Delete **Departments**.
- Onboard **Doctors** with:

  - Auto-generated password.
  - Assign departments, available days, and 15-minute time slots (e.g., 11:00 AM - 04:00 PM).

- Edit doctor details and reset passwords.
- View all **Patients**, delete accounts if needed.
- Access appointment dashboard:

  - View by status (pending, completed, cancelled).
  - Filter by today’s or future dates.
  - Cancel or mark appointments as complete.

### Doctor Features

- Login with credentials shared by admin.
- View & update profile (name, email, phone, etc.).
- Check today’s appointments (pending & completed).
- See all upcoming appointments.
- Mark appointments as **completed** after consultation.

### Patient Features

- Self-registration and login.
- Browse doctors by **department**.
- Book appointments based on doctor availability:

  - Only available slots (15-min spacing) are shown.
  - Max 40 appointments per doctor/day.
  - Prevents duplicate or double-booking.

- View upcoming, completed, and cancelled appointment history.
- Update personal profile.
-change Patient Password

---

## 🖥️ Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Token-based authentication)
- Cookie-parser for secure HttpOnly cookies

### Folder Structure Highlights

- `controllers/` – All business logic per role/module
- `middlewares/` – Role and token validations
- `models/` – MongoDB schemas: User, Doctor, Patient, Appointment, Department
- `routes/` – Express routers divided by role
- `utils/` – Reusable handlers and API response wrappers

---

## ✅ Real-World Features Simulated

- Time-slot based scheduling with automatic blocking (e.g., after a patient books 11:00 AM, the next slot is 11:15 AM).
- Role-based protected routes (with JWT + Role check).
- Responsive design for desktop and mobile.
- Error handling with custom messages and status codes.
- Token validation, session protection with HttpOnly cookies.

---

## 🛠️ Setup Instructions

### Backend Setup

```bash
git clone https://github.com/Sufiyanahmad325/hospital-Management-MERN.git
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
git clone https://github.com/Sufiyanahmad325/hospital-Management-MERN.git
cd frontend
npm install
npm run dev
```

Add a `.env` file for backend:

```
MONGODB_URL=your_mongodb_connection_string
CORS_ORIGIN=*
PORT=8000

ACCESS_TOKEN_SECRET=your_jwt_secret_key
ACCESS_TOKEN_EXPIRY=7d               

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

---

## 👤 Author

**Sufiyan Ahmad**
Full-Stack Web Developer | JavaScript | MERN Stack
📧 [mdsufiyanahamad325@gmail.com](mailto:mdsufiyanahamad325@gmail.com)
📍 Gopalganj, Bihar
🔗 [GitHub Profile](https://github.com/Sufiyanahmad325)

---

## 📌 Note

This project is best suited for **beginner to intermediate developers** who want to understand full-stack role-based authentication, real-time scheduling, and scalable MERN architecture.
