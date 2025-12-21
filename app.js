const express = require("express");
const app = express();
const port = 5500;

// to connect to our db

const dbConnection = require("./db/dbConfig");

// json middleware

app.use(express.json());

// user middleware

const userRoutes = require("./routes/userRoute");
app.use("/api/users", userRoutes);

// question middleware
// const questionRoutes = require("./routes/questionRoute");
// app.use("/api/answers", answerRoutes);

// answer middleware
// const answerRoutes = require("./routes/answerRoute");

// app.use("/api/answers", answerRoutes);




async function start() {
  try {
    // test database connection
    const result = await dbConnection.execute("Select 'test'");
    console.log("DB test result:",result);
    app.listen(port)
      console.log("database connection established");
      console.log(`listening on port ${port}`);
  } catch (err) {
    console.error( err.message);
  }
}

start();
