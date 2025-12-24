import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    nameOfDepartment: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);