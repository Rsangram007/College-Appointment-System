const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  professor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  timeSlot: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "booked", "cancelled"],
    default: "available",
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
