const Slide = require("../models/Slide");

const getSlides = async (req, res) => {
  try {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    let query = {};

    if (req.query.search) {
      query.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    let sortOption = {};

    if (req.query.sort === "latest") {
      sortOption = { createdAt: -1 };
    }

    const slides = await Slide.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalSlides = await Slide.countDocuments(query);

    res.status(200).json({
      slides,
      totalSlides,
      currentPage: page,
      totalPages: Math.ceil(totalSlides / limit),
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createSlide = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const slide = await Slide.create({
      title,
      description,
      tags: tags ? tags.split(",") : [],
      previewImage: req.files.previewImage[0].path,
      slideFile: req.files.slideFile[0].path,
      uploadedBy: req.user._id,
    });

    res.status(201).json(slide);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateSlide = async (req, res) => {
  try {

    const slide = await Slide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({
        message: "Slide not found",
      });
    }

    slide.title = req.body.title || slide.title;
    slide.description =
      req.body.description || slide.description;

    slide.tags =
      req.body.tags
        ? req.body.tags.split(",")
        : slide.tags;

    const updatedSlide = await slide.save();

    res.status(200).json(updatedSlide);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const deleteSlide = async (req, res) => {
  try {

    const slide = await Slide.findById(req.params.id);

    if (!slide) {
      return res.status(404).json({
        message: "Slide not found",
      });
    }

    await slide.deleteOne();

    res.status(200).json({
      message: "Slide deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSlides,
  createSlide,
  updateSlide,
  deleteSlide,
};