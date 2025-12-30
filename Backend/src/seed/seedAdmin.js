import { User } from "../models/userSchema.js";

export const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    await User.create({
      name: "Super Admin",
      email: "admin@hospital.com",
      password: "Admin@123",
      role: "admin",
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Admin seed failed:", error.message);
  }
};
