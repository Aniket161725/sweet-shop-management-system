import request from "supertest";
import app from "../app.js";

describe("Ping API", () => {
  test("GET /ping should return { message: 'pong' }", async () => {
    const res = await request(app).get("/ping");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("pong");
  });
});

