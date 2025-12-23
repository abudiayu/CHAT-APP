const express = require("express");
const router = express.Router();

const {
  createAnswer,
  getAnswersByQuestion,
} = require("../controller/answerController");

// post answer to a question
router.post("/:questionid", createAnswer);

// get answers for a question
router.get("/:questionid", getAnswersByQuestion);

module.exports = router;
