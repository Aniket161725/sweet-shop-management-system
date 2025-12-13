import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test");
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API - Register User", () => {
  test("should register a new user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("email", "john@example.com");
  });

  test("should NOT register user with duplicate email", async () => {
    await User.create({
      name: "Existing User",
      email: "duplicate@example.com",
      password: "hashedpass",
    });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "duplicate@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already exists");
  });
});
