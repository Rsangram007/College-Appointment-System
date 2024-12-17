const Appointment = require("../models/Appointment");

const viewAvailability = async (req, res) => {
  try {
    const { professorId } = req.params;
    const slots = await Appointment.find({
      professor: professorId,
      status: "available",
    });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const { timeSlot } = req.body;
    const student = req.user.id;
    const professor = req.params.professorId;

    const appointment = await Appointment.findOneAndUpdate(
      { professor, timeSlot, status: "available" },
      { student },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ error: "Slot not available" });
    }

    res
      .status(200)
      .json({ message: "Appointment booked successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { viewAvailability, bookAppointment };
