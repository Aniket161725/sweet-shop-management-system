import request from "supertest";
import app from "../app.js";
import jwt from "jsonwebtoken";

describe("Admin Middleware", () => {
  const createToken = (role) =>
    jwt.sign({ id: "123", email: "admin@test.com", role }, "secretkey");

  test("should block non-admin users", async () => {
    const token = createToken("user");

    const res = await request(app)
      .get("/admin-only")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin access only");
  });

  test("should allow admin users", async () => {
    const token = createToken("admin");

    const res = await request(app)
      .get("/admin-only")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Admin access granted");
  });
});
