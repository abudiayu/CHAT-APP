const express = require("express");
const router = express.Router();

const {
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// get all questions
router.get("/all-question", getAllQuestions);

// get single question
router.get("/:id", getSingleQuestion);

module.exports = router;
