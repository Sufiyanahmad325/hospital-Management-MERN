import { User } from "../../models/userSchema.js";
import { Patient } from "../../models/patientSchema.js";
import ApiResponse from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js";

export const registerPatient = asyncHandler(async (req, res) => {
  const { name, email, password, age, gender, phone, address } = req.body;

  if([name, email, password, age, gender, address].some(field => field?.trim() ==="")){
    return res.status(400).json(new ApiResponse(400 , null , "All fields except phone are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json(new ApiResponse(409 , null , "User with this email already exists"));
  }


  const user = await User.create({
    name,
    email,
    password,
    role: "patient",
  });

  const patientData = await Patient.create({ 
    userId: user._id ,
    name,
    age,
    gender ,
   phone: phone || "",
    address,
  });

  res.status(201).json( new ApiResponse(201 , {user , patientData} , "Patient registered successfully") );
});







export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  let isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const userData = await User.findOne({ email }).select("-password");

  res.status(200).json(
    new ApiResponse(200, {
      userData,
      token: user.generateToken(),
      role: user.role,
    }, "Login successful")
  )
};
