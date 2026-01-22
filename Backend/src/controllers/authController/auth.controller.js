import { User } from "../../models/userSchema.js";
import { Patient } from "../../models/patientSchema.js";
import ApiResponse from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js";

export const registerPatient = asyncHandler(async (req, res) => {
  const { name, email, password, age, gender, phone, address } = req.body;

  if ([name, email, password, age, gender, address].some(field => field?.trim() === "")) {
    return res.status(400).json(new ApiResponse(400, null, "All fields except phone are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json(new ApiResponse(409, null, "User with this email already exists"));
  }


  const user = await User.create({
    name,
    email,
    password,
    role: "patient",
  });

  let patientData;
  try {
    patientData = await Patient.create({
      user_id: user._id,
      name,
      age,
      gender,
      phone: phone,
      address,
    });
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    return res.status(500).json(new ApiResponse(500, null, "Error creating patient profile: " + error.message));
  }



  res.status(201).json(new ApiResponse(201, { user, patientData }, "Patient registered successfully"));
});







export const login = asyncHandler(async (req, res) => {
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

  const cookiesOptions = {
    httpOnly: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day  // maine schema me { expiresIn: "7d" }) de diya hai to kya yaha dena jaruri hai == haan kyuki yaha cookie ki expiry set kr rhe hai aur schema me token ki expiry set kr rhe hai dono alag cheeze hai or dono same honi chahiye taaki cookie expire hone ke baad token bhi expire ho jaye
  };

  const token = user.generateToken();


  res.status(200).cookie("accessToken", token, cookiesOptions).json(
    new ApiResponse(200, {
      userData,
      token: token,
      role: user.role,
    }, "Login successful")
  )
}
);

export const getMe = asyncHandler(async (req, res) => {
  return res.status(201).json(
    new ApiResponse(201, req.user, "you are fetched successfully")
  )
})