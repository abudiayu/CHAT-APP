const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// create answer
async function createAnswer(req, res) {
  const { answer } = req.body;
  const { questionid } = req.params;
  const { userid } = req.user;

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Answer is required" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (answer, userid, questionid) VALUES (?, ?, ?)",
      [answer, userid, questionid]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer posted successfully" });

  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

// get answers by question
async function getAnswersByQuestion(req, res) {
  const { questionid } = req.params;

  try {
    const [answers] = await dbConnection.query(
      `SELECT a.answerid, a.answer, a.created_at, u.username
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.created_at ASC`,
      [questionid]
    );

    return res.status(StatusCodes.OK).json({ answers });

  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

module.exports = {
  createAnswer,
  getAnswersByQuestion,
};
