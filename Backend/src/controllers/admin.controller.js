import { Appointment } from "../models/appointmentSchema.js";
import { Department } from "../models/departmentSchema.js";
import { Doctor } from "../models/doctorSchema.js";
import { Patient } from "../models/patientSchema.js";
import { User } from "../models/userSchema.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const createDepartment = async (req, res) => {
  try {
    const { nameOfDepartment, description } = req.body;

    if (!nameOfDepartment || nameOfDepartment.trim() === "") {
      return res.status(400).json({ message: "Department name is required" });
    }

    const existingDept = await Department.findOne({ nameOfDepartment });
    if (existingDept) {
      return res.status(409).json({ message: "Department already exists" });
    }

    const department = await Department.create({
      nameOfDepartment,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const addDoctor = async (req, res) => {
  try {
    const { name, email, phone, departmentId, specialization, description, experience, availableDays, availableSlots } = req.body;

    if (
      !name || !email || !phone || !departmentId || !specialization || specialization.trim() === "" || !description || description.trim() === "" || !experience || !Array.isArray(availableDays) || availableDays.length === 0 || !Array.isArray(availableSlots) || availableSlots.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }


    // check department
    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // check user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ message: "Doctor already exists" });
    }

    // 🔐 generate temp password
    const tempPassword = "Doc@" + Math.floor(1000 + Math.random() * 9000);

    // 1️⃣ create login account
    const user = await User.create({
      name,
      email,
      password: tempPassword,
      role: "doctor",
    });

    // 2️⃣ create doctor profile
    const doctor = await Doctor.create({
      user_id: user._id,
      phone,
      description,
      experience: experience,
      specialization: specialization,
      department: departmentId,
      availableDays,
      availableSlots
    });

    return res.status(201).json({
      loginCredentials: {
        email,
        password: tempPassword, // admin doctor ko dega
      },
      doctor,
      message: "Doctor added successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("department", "nameOfDepartment") // doctor me user_id hai doctor ki to kya ham usme se user ka name and email lana chahte hai to ham populate kr skte hai
      .populate("user_id", "name email"); // ye user se name and email le aayega

    res.status(200).json(new ApiResponse(200, { doctors: doctors }, 'All doctor has been fetched'));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();

    res.status(200).json({
      total: patients.length,
      patients,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllDoctorAppointments = asyncHandler(async (req, res) => {
  const { _id } = req.user; // it is coming from verifyJWT middleware
  // 1️⃣ Find doctor profile
  const admin = await User.findOne({ _id: _id });
  if (!admin) {
    return res.status(404).json({ message: "Admin profile not found" });
  }
  // 2️⃣ Get appointments for this doctor
  const appointments = await Appointment.find()
    .populate(
      { path: 'patientId', select: 'name' }
    )
    .populate({
      path: "doctorId", // doctorId me user_id jo User schema ka hai wo populate krna hai or name leke aana hai User schema se
      populate: { path: "user_id", select: "name" },
    })


  if (!appointments || appointments.length === 0) {
    return res.status(404).json({ message: "No appointments found" });
  }

  return res.status(200).json({
    data: appointments,
    message: "Doctor appointments fetched successfully",
  });
});


export const getAllCompleteAppointment = asyncHandler(async (req, res) => {

  const isAvailableAdmin = await User.find({
    _id: req.user._id,
    role: 'admin'
  })

  if (!isAvailableAdmin) {
    return res.status(403).json({ message: 'Access denied , you are not admin' })
  }

  const completeAppointment = await Appointment.find({ status: 'completed' })

  if (!completeAppointment || completeAppointment.length === 0) {
    return res.status(404).json({ message: 'No completed appointment found' })
  }

  return res.status(200).json(
    new ApiResponse(200, 'Completed appointments fetched successfully', completeAppointment)
  )

})



export const getTodayAllAppointments = asyncHandler(async (req, res) => {

  // 📅 Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  // example → "2025-12-29"

  const pendingAppointments = await Appointment.find({
    date: today,
  })
    .populate("patientId", "name email")
    .populate("doctorId", "name email");

  if (pendingAppointments.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No appointments for today"));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      pendingAppointments,
      "Today's appointments fetched successfully",
    )
  );
});


export const getAllDepartments = asyncHandler(async (req, res) => {
  const isAvailableAdmin = await User.find({
    _id: req.user._id,
    role: 'admin'
  })
  if (!isAvailableAdmin) {
    return res.status(403).json({ message: 'Access denied , you are not admin' })
  }
  const departments = await Department.find();
  if (!departments || departments.length === 0) {
    return res.status(404).json(
      new ApiResponse(404, "No departments found")
    );
  }
  return res.status(200).json(
    new ApiResponse(200, departments, "Departments fetched successfully")
  );
});



export const deleteDepartment = asyncHandler(async (req, res) => {
  const { departmentId } = req.params;
  const isAvailableAdmin = await User.find({
    _id: req.user._id,
    role: 'admin'
  })

  if (!isAvailableAdmin) {
    return res.status(403).json({ message: 'Access denied , you are not admin' })
  }

  const department = await Department.findByIdAndDelete(departmentId);

  if (!department) {
    return res.status(404).json(
      new ApiResponse(404, "Department not found")
    );
  }

  return res.status(200).json(
    new ApiResponse(200, "Department deleted successfully", department)
  );
});

export const editDepartmentDetails = asyncHandler(async (req, res) => {
  const { id, nameOfDepartment, description } = req.body

  const user = await User.findById(req.user._id)

  if (!user) {
    throw ApiError(404, 'user does not exists')
  }

  const department = await Department.findById(id)

  if (!department) {
    throw new ApiError(404, 'department does not exists')
  }

  department.nameOfDepartment = nameOfDepartment || department.nameOfDepartment
  department.description = description || department.description

  await department.save({ validateBeforeSave: false })

  const departments = await Department.find()

  if (!departments) {
    throw new ApiError(402, "something went wrong")
  }

  res.status(201).json({
    success: true,
    departments: departments,
    message: 'All departments have been successfully fetched'
  });
})

export const completeAppointmentByAdmin = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;
  const isAvailableAdmin = await User.find({
    _id: req.user._id,
    role: 'admin'
  })

  if (!isAvailableAdmin) {
    return res.status(403).json({ message: 'Access denied , you are not admin' })
  }
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json(
      new ApiResponse(404, "Appointment not found")
    );
  }

  appointment.status = 'completed',
    await appointment.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(200, "Appointment completed successfully by admin", appointment)
  );
});




export const cancelAppointmentByAdmin = asyncHandler(async (req, res) => {
  const { appointmentId } = req.params;

  const isAvailableAdmin = await User.find({
    _id: req.user._id,
    role: 'admin'
  })
  if (!isAvailableAdmin) {
    return res.status(403).json({ message: 'Access denied , you are not admin' })
  }

  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    return res.status(404).json(
      new ApiResponse(404, "Appointment not found")
    );
  }

  appointment.status = 'cancelled by admin',

    await appointment.save({ validateBeforeSave: false });

  const allAppointments = await Appointment.find()

  return res.status(200).json(
    {
      success: true,
      allAppointments,
      message: "Appointment cancelled successfully by admin"
    }
  );
})



export const ChangeDoctorPasswordByAdmin = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;
  console.log('doctorId ===========> ', doctorId)
  const { newPassword } = req.body;

  if (!newPassword || newPassword.trim() === '') {
    return res.status(400).json({ message: 'New password is required' });
  }

  const isAdmin = await User.findById(req.user._id);

  if (!isAdmin || isAdmin.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied, you are not admin' });
  }

  const doctorUser = await Doctor.findById(doctorId);

  if (!doctorUser) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  const userDoctor = await User.findById(doctorUser.user_id)

  if (!userDoctor) {
    return res.status(404).json({ message: 'User associated with doctor not found' });
  }

  userDoctor.password = newPassword;

  await userDoctor.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(200, userDoctor , "Doctor password changed successfully by admin")
  );
});


export const deletePatientWithUser = asyncHandler(async (req, res) => {
  const { id } = req.body

  if (!id) {
    throw new ApiError(401, 'user Id required')
  }

  const isAdmin = await User.findById(req.user._id)

  if (!isAdmin || isAdmin.role != 'admin') {
    res.status(401).json(
      {
        success: false,
        message: 'only admin can access'
      }
    )
  }

  const patient = await Patient.findById(id)

  if (!patient) {
    res.status(401).json(
      {
        success: false,
        message: 'patient does not exists'
      }
    )
  }

  const user = await User.findById(patient.user_id)
  if (!patient) {
    res.status(401).json(
      {
        success: false,
        message: 'user does not exists'
      }
    )
  }


  const PatientUser = await User.findByIdAndDelete(patient.user_id)
  const remove = await Patient.findByIdAndDelete(patient._id)


  const patients = await Patient.find()

  res.status(201).json({
    success: true,
    patients,
    message: 'patient has been remove successfully'
  })


})




export const getDoctorDetailsByAdmin = asyncHandler(async (req, res) => {
  const { doctorId } = req.params;

  const isAvailableAdmin = await User.find({
    _id: req.user._id,
    role: 'admin'
  })

  if (!isAvailableAdmin) {
    return res.status(403).json({ message: 'Access denied, you are not admin' });
  }

  const doctor = await Doctor.findById(doctorId)
    .populate({ path: "user_id", select: "name email" });

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }


  return res.status(200).json(
    new ApiResponse(200, doctor, "Doctor details retrieved successfully")
  );
});




export const editDoctorDetailsByAdmin = asyncHandler(async (req, res) => {
  const { name, phone, department, specialization, description, experience, availableDays, availableSlots } = req.body;
  const { doctorId } = req.params;

  const doctor = await Doctor.findById(doctorId)

  if (!doctor) {
    return res.status(404).json({ message: "Doctor not found" });
  }


  const userDoctor = await User.findById(doctor.user_id._id);

  if (!userDoctor) {
    return res.status(404).json({ message: 'User associated with doctor not found' });
  }

  // Update user details
  userDoctor.name = name || userDoctor.name;


  // Update doctor profile details
  doctor.phone = phone || doctor.phone;
  doctor.department = department || doctor.department;
  doctor.specialization = specialization || doctor.specialization;
  doctor.description = description || doctor.description;
  doctor.experience = experience || doctor.experience;
  doctor.availableDays = availableDays || doctor.availableDays;
  doctor.availableSlots = availableSlots || doctor.availableSlots;

  try {
    await userDoctor.save({ validateBeforeSave: false });
    await doctor.save({ validateBeforeSave: false });
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }



  return res.status(200).json(
    new ApiResponse(200, "Doctor details updated successfully by admin", { userDoctor, doctor })
  );




});