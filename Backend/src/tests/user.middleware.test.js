import request from "supertest";
import app from "../app.js";
import jwt from "jsonwebtoken";

describe("Auth Middleware", () => {

  test("should block request when no token provided", async () => {
    const res = await request(app).get("/test-protected");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Unauthorized");
  });

  test("should allow request when valid token provided", async () => {
    const token = jwt.sign({ id: "123", email: "test@example.com" }, "secretkey");

    const res = await request(app)
      .get("/test-protected")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Access granted");
  });

});
