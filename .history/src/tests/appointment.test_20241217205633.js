const request = require("supertest");
const app = require("../app");



const mongoose = require("mongoose");
 ;

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

// Sample test for booking flow
describe("Appointment System", () => {
  it("should allow a student to book and cancel an appointment", async () => {
    // Register and login as professor
    await request(app).post("/api/auth/register").send({
      name: "Prof P1",
      email: "professor1@example.com",
      password: "password",
      role: "professor",
    });
    const profLogin = await request(app).post("/api/auth/login").send({
      email: "professor1@example.com",
      password: "password",
    });
    const profToken = profLogin.body.token;

    // Set availability
    await request(app)
      .post("/api/professor/availability")
      .set("Authorization", `Bearer ${profToken}`)
      .send({ timeSlots: ["2024-12-18T10:00", "2024-12-18T11:00"] });

    // Register and login as student
    await request(app).post("/api/auth/register").send({
      name: "Student A1",
      email: "student1@example.com",
      password: "password",
      role: "student",
    });
    const studentLogin = await request(app).post("/api/auth/login").send({
      email: "student1@example.com",
      password: "password",
    });
    const studentToken = studentLogin.body.token;

    // Book an appointment
    const booking = await request(app)
      .post("/api/student/book/professor1Id")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({ timeSlot: "2024-12-18T10:00" });

    expect(booking.status).toBe(200);
    expect(booking.body.message).toBe("Appointment booked successfully");

    // Cancel appointment
    const cancel = await request(app)
      .patch(`/api/professor/appointment/${booking.body.appointment._id}`)
      .set("Authorization", `Bearer ${profToken}`);

    expect(cancel.status).toBe(200);
    expect(cancel.body.message).toBe("Appointment cancelled successfully");
  });
});
