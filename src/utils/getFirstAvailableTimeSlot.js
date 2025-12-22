import { Doctor } from "../models/doctorSchema.js";
import { Appointment } from "../models/appointmentSchema.js";

 export const getNextFreeSlot = async (doctorId, date) => {
  // doctor find karo
  const doctor = await Doctor.findOne({doctorId: doctorId});
  if (!doctor) return null;

  // us date ke booked appointments
  const appointments = await Appointment.find({
    doctorId,
    date,
    status: "pending",
  });
  // booked slots list
  const bookedSlots = appointments.map(app => app.timeSlot);

  // pehla free slot
  const freeSlot = doctor.availableSlots.find(
    slot => !bookedSlots.includes(slot)
  );

  return freeSlot || null;
};


// bar bar 11:00 AM hi q reutn kr rha hai jab k 11:00 AM booked hai