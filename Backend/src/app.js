import express from "express";

import cors from "cors";

import { authMiddleware } from "./middlewares/user.middleware.js";
import { adminOnly } from "./middlewares/role.middleware.js";



import userRoutes from "./routes/user.route.js";
import sweetRoutes from "./routes/sweet.route.js";

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://192.168.1.4:3000"   // allow local network React app
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);



app.use(express.json());

app.get("/test-protected", authMiddleware, (req, res) => {
  return res.status(200).json({ message: "Access granted" });
});


app.get("/admin-only", authMiddleware, adminOnly, (req, res) => {
  res.status(200).json({ message: "Admin access granted" });
});





app.use("/api/auth", userRoutes);
app.use("/api/sweets", sweetRoutes);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

// Test protected route for TDD


export default app;

