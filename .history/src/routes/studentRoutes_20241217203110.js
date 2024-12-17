const express = require("express");
const {
  viewAvailability,
  bookAppointment,
  getStudentAppointments,
} = require("../controllers/studentController");
const router = express.Router();
const { authenticateStudent } = require("../middlewares/authMiddleware");

router.get("/availability/:professorId", authenticateStudent, viewAvailability);
router.post("/book/:professorId", authenticateStudent, bookAppointment);

module.exports = router;
