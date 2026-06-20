const express = require("express");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const slideRoutes = require("./routes/slideRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/slides", slideRoutes);

app.get("/", (req, res) => {
  res.send("CaseVault Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});