
import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import Sweet from "../models/sweet.model.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sweetshop_test_api");
  await Sweet.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("GET /api/sweets should return list of sweets", async () => {
  // Arrange: add 1 sweet manually
  await Sweet.create({
    name: "Gulab Jamun",
    category: "Milk Based",
    price: 120,
    quantity: 20,
    image: "img.jpg",
  });

  // Act
  const res = await request(app).get("/api/sweets");

  // Assert
  expect(res.statusCode).toBe(200);
  expect(res.body.sweets.length).toBeGreaterThan(0);
  expect(res.body.sweets[0].name).toBe("Gulab Jamun");
});
