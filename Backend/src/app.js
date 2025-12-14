import express from "express";

import cors from "cors";

import { authMiddleware } from "./middlewares/user.middleware.js";

const allowedOrigins = ["http://localhost:3000"];

import userRoutes from "./routes/user.route.js";
const app = express();



app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, 
  })
);


app.use(express.json());

app.get("/test-protected", authMiddleware, (req, res) => {
  return res.status(200).json({ message: "Access granted" });
});




app.use("/api/auth", userRoutes);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

// Test protected route for TDD


export default app;

