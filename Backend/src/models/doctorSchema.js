import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    phone: {
      type: String,
    },

    specialization: {
      type: String,
      required: true,
      enum: [
        // ❤️ Heart
        "Interventional Cardiology",
        "Pediatric Cardiology",
        "Electrophysiology",
        "Heart Failure Specialist",
        "Preventive Cardiology",

        // 🧠 Brain
        "Neurologist",
        "Neurosurgeon",
        "Neurocritical Care Specialist",

        // 🍽️ Stomach
        "Gastroenterologist",
        "Hepatologist",
        "Gastrointestinal Surgeon",
      ],
    },


    description: {
      type: String,
      required: true,
      maxLength: 500,
    },

    availableDays: {
      type: [String],
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      default: [],
    },

    availableSlots: {
      type: [String],
      enum: ['11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM'],
      default: [],
      required: true,
    },
  },
  { timestamps: true } 
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
