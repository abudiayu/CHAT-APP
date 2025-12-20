const mysql2 = require('mysql2');

const dbConnection = mysql2.createPool({
  host: "localhost",
  user: "abudi-admin",
  password: "654321",
  database: "evangadiforem",
  connectionLimit: 10,
  port:3307
});

dbConnection.query("select 'test' ", (err, results) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ DB connected successfully");
  }
});