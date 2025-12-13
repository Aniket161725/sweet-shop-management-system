import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

export default app;

