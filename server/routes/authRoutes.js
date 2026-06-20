// #Contains only authentication routes
// To keep the project modular and maintainable. Authentication-related routes are separated from other features. This prevents server.js from becoming too large and follows Express best practices."

const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;