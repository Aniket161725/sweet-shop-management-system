import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();  

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
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


describe("Auth API - Login User", () => {
  test("should login with correct credentials and return token", async () => {
    // create a user manually for login test
    const userData = {
      name: "Login User",
      email: "login@example.com",
      password: "password123",
    };

    await request(app).post("/api/auth/register").send(userData);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("login@example.com");
  });

  test("should NOT login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "login@example.com",
        password: "wrongpass",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });

  test("should NOT login with unregistered email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "no-account@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });
});
