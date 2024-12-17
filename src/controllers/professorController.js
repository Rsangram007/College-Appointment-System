const Appointment = require("../models/Appointment");

const setAvailability = async (req, res) => {
  try {
    const { timeSlots } = req.body;
    const professor = req.user.id;
    const slots = timeSlots.map((slot) => ({ professor, timeSlot: slot }));
    await Appointment.insertMany(slots);
    res.status(200).json({ message: "Availability set successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await Appointment.findOneAndUpdate(
      { _id: appointmentId, professor: req.user.id },
      { status: "cancelled" },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { setAvailability, cancelAppointment };
