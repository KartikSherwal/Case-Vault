const express = require("express");
const router = express.Router();

const {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide,
} = require("../controllers/slideController");

const protect = require("../middleware/authMiddleware");
const upload = require("../config/multer");

router.get("/", getSlides);

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "previewImage",
      maxCount: 1,
    },
    {
      name: "slideFile",
      maxCount: 1,
    },
  ]),
  createSlide
);

router.put("/:id", protect, updateSlide);

router.delete("/:id", protect, deleteSlide);
module.exports = router;