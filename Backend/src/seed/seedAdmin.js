import { User } from "../models/userSchema.js";

export const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    await User.create({
      name: process.env.ADMIN_NAME ,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",  
    });

    console.log("Admin created successfully");
  } catch (error) {
    console.error("Admin seed failed:", error.message);
  }
};
