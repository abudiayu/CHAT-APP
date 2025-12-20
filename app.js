const express = require("express");
const app = express();
const port = 5500;

app.use(express.json());

// user middleware
const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);

// question middleware
const questionRoutes = require("./routes/questionRoute");
app.use("/api/questions", questionRoutes);

// answer middleware
const answerRoutes = require("./routes/answerRoute");
app.use("/api/answers", answerRoutes);

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`🚀 Server running on http://localhost:${port}`);
  }
});
