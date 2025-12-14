import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Sweet from "../models/sweet.model.js";
import dotenv from "dotenv";
dotenv.config(); 

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Sweet.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

// Generate tokens
const adminToken = jwt.sign(
  { id: "1", role: "admin", email: "admin@test.com" },
  "secretkey"
);
const userToken = jwt.sign(
  { id: "2", role: "user", email: "user@test.com" },
  "secretkey"
);

describe("Sweet API - Add Sweet", () => {
  test("should NOT allow normal user to add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Ladoo",
        category: "Indian",
        price: 50,
        quantity: 100,
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin access only");
  });

  test("should allow admin to add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 100,
        quantity: 50,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.sweet).toHaveProperty("name", "Barfi");
    expect(res.body.sweet).toHaveProperty("price", 100);
  });
});
