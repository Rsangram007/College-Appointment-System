const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to authenticate any user
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ error: "Invalid authentication token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid authentication token" });
  }
};

// Middleware to authenticate professors only
const authenticateProfessor = async (req, res, next) => {
  await authenticateUser(req, res, async () => {
    if (req.user.role !== "professor") {
      return res.status(403).json({ error: "Access denied. Professors only." });
    }
    next();
  });
};

// Middleware to authenticate students only
const authenticateStudent = async (req, res, next) => {
  await authenticateUser(req, res, async () => {
    if (req.user.role !== "student") {
      return res.status(403).json({ error: "Access denied. Students only." });
    }
    next();
  });
};

module.exports = {
  authenticateUser,
  authenticateProfessor,
  authenticateStudent,
};
