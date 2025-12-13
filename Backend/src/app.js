import express from "express";

const app = express();
app.use(express.json());

app.get("/ping", (req, res) => {
  return res.status(200).json({ message: "pong" });
});

export default app;

