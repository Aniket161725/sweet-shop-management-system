import app from "./app.js";
import { connectDB } from "./config/db.config.js";
const PORT = 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log("Database connected successfully");