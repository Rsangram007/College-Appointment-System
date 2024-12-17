const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const professorRoutes = require("./routes/professorRoutes");
const studentRoutes = require("./routes/studentRoutes");

dotenv.config();
const app = express();


app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/professor", professorRoutes);
app.use("/api/student", studentRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

 
module.exports = app;