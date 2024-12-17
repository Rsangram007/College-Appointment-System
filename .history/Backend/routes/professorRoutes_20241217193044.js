const express = require("express");
const {
  setAvailability,
  cancelAppointment,
} = require("../controllers/professorController");
const router = express.Router();
const { authenticateProfessor } = require("../middlewares/authMiddleware");

router.post("/availability", authenticateProfessor, setAvailability);
router.patch(
  "/appointment/:appointmentId",
  authenticateProfessor,
  cancelAppointment
);

module.exports = router;
