import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const allowedOrigins = ["http://localhost:3000"];

import userRoutes from "./routes/user.route.js";





app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, 
  })
);

const app = express();
app.use(express.json());
connectDB();


app.use("/api/auth", userRoutes);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

// Test protected route for TDD
app.get("/test-protected", authMiddleware, (req, res) => {
  return res.status(200).json({ message: "Access granted" });
});

export default app;

