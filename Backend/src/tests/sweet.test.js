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

describe("Sweet API - Get All Sweets", () => {
  test("should return all sweets for authenticated users", async () => {
    const res = await request(app)
      .get("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.sweets)).toBe(true);
  });

  test("should block unauthenticated users", async () => {
    const res = await request(app).get("/api/sweets");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });
});


describe("Sweet API - Search Sweets", () => {
  test("should search sweets by name", async () => {
    // create sample sweets
    await Sweet.create([
      { name: "Gulab Jamun", category: "Indian", price: 100, quantity: 20 },
      { name: "Rasgulla", category: "Indian", price: 80, quantity: 15 }
    ]);

    const res = await request(app)
      .get("/api/sweets/search?name=Gulab")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBe(1);
    expect(res.body.sweets[0].name).toBe("Gulab Jamun");
  });

  test("should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search?category=Indian")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweets.length).toBeGreaterThan(0);
  });

  test("should search sweets by price range", async () => {
    const res = await request(app)
      .get("/api/sweets/search?minPrice=70&maxPrice=90")
      .set("Authorization", `Bearer ${adminToken}`);

    // Rasgulla = 80 → should match
    expect(res.statusCode).toBe(200);
    expect(res.body.sweets[0].price).toBe(80);
  });

  test("should block unauthenticated users from searching", async () => {
    const res = await request(app).get("/api/sweets/search?name=Gulab");
    expect(res.statusCode).toBe(401);
  });
});


describe("Sweet API - Update Sweet", () => {

  let sweetId;

  beforeAll(async () => {
    // create a sweet to update
    const sweet = await Sweet.create({
      name: "Old Barfi",
      category: "Indian",
      price: 100,
      quantity: 20,
    });

    sweetId = sweet._id;
  });

  test("should NOT allow normal users to update sweet", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ name: "New Barfi" });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin access only");
  });

  test("should update sweet for admin user", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "New Barfi",
        category: "Indian",
        price: 120,
        quantity: 50,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.name).toBe("New Barfi");
    expect(res.body.sweet.price).toBe(120);
  });

  test("should return 404 if sweet not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/sweets/${invalidId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ name: "Does Not Matter" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Sweet not found");
  });

});


describe("Sweet API - Delete Sweet", () => {
  let sweetId;

  beforeAll(async () => {
    // Create a sweet to delete
    const sweet = await Sweet.create({
      name: "Delete Laddu",
      category: "Indian",
      price: 60,
      quantity: 10,
    });
    sweetId = sweet._id;
  });

  test("should NOT allow normal user to delete sweet", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin access only");
  });

  test("should delete sweet for admin user", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet deleted successfully");
  });

  test("should return 404 if sweet not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/sweets/${invalidId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Sweet not found");
  });
});

describe("Sweet API - Purchase Sweet", () => {
  let purchaseSweetId;

  beforeAll(async () => {
    const sweet = await Sweet.create({
      name: "Choco Bite",
      category: "Western",
      price: 30,
      quantity: 2,
    });
    purchaseSweetId = sweet._id;
  });

  test("should NOT allow unauthenticated users to purchase", async () => {
    const res = await request(app).post(`/api/sweets/${purchaseSweetId}/purchase`);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  test("should successfully purchase sweet and decrease quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${purchaseSweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(1); // First purchase reduces from 2 -> 1
  });

  test("should throw out-of-stock error when quantity reaches zero", async () => {
    // Second purchase (1 -> 0)
    await request(app)
      .post(`/api/sweets/${purchaseSweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    // Third purchase should fail (0 -> error)
    const res = await request(app)
      .post(`/api/sweets/${purchaseSweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Out of stock");
  });

  test("should return 404 if sweet not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/sweets/${invalidId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Sweet not found");
  });
});


describe("Sweet API - Restock Sweet", () => {
  let restockSweetId;

  beforeAll(async () => {
    const sweet = await Sweet.create({
      name: "Milk Cake",
      category: "Indian",
      price: 120,
      quantity: 5,
    });

    restockSweetId = sweet._id;
  });

  test("should NOT allow normal users to restock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${restockSweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ amount: 10 });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin access only");
  });

  test("should restock sweet for admin user", async () => {
    const res = await request(app)
      .post(`/api/sweets/${restockSweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 10 });

    expect(res.statusCode).toBe(200);
    expect(res.body.sweet.quantity).toBe(15); // 5 + 10
  });

  test("should return 400 if restock amount is invalid", async () => {
    const res = await request(app)
      .post(`/api/sweets/${restockSweetId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: -5 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid restock amount");
  });

  test("should return 404 if sweet not found", async () => {
    const invalidId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .post(`/api/sweets/${invalidId}/restock`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ amount: 5 });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Sweet not found");
  });
});
