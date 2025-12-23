const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

// get all questions (related to users)
async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbConnection.query(
      "SELECT q.questionid, q.title, q.description, q.tag, q.created_at, u.userid, u.username \
       FROM questions q \
       JOIN users u ON q.userid = u.userid \
       ORDER BY q.created_at DESC"
    );

    return res.status(StatusCodes.OK).json({ questions });

  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

// get single question (related to users)
async function getSingleQuestion(req, res) {
  const { id } = req.params;

  try {
    const [question] = await dbConnection.query(
      "SELECT q.questionid, q.title, q.description, q.tag, q.created_at, u.userid, u.username \
       FROM questions q \
       JOIN users u ON q.userid = u.userid \
       WHERE q.questionid = ?",
      [id]
    );

    if (question.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found" });
    }

    return res.status(StatusCodes.OK).json({ question: question[0] });

  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
}

module.exports = {
  getAllQuestions,
  getSingleQuestion,
};
