// db connection
const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, fristname, lastname, email, password } = req.body;

  if (!username || !fristname || !lastname || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please fulfill all requirements" });
  }
  try{
    const [user] = await dbConnection.query("select userid,username from users where username =? or email = ?", 
        [username,email]
    )

        if(user.length > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"User already registered"})
        }
        if(password.length <= 8){
            return res.status(StatusCodes.BAD_REQUEST).json({msg:"Password must have to be at least 8 characters"})
        }
        
     // 🔐 HASH PASSWORD (IMPORTANT)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔐 STORE HASHED PASSWORD ONLY
    await dbConnection.query(
      `INSERT INTO users 
      (username, fristname, lastname, email, password) 
      VALUES (?, ?, ?, ?, ?)`,
      [username, fristname, lastname, email, hashedPassword]
    );    return res.status(StatusCodes.CREATED).json({ msg: "User registered successfully " });  

  }catch(error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({msg:"Something went wrong, try again!"})
  }

}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter all required fields" });
  }

  try {
    const [user] = await dbConnection.query(
      "SELECT username, userid, password FROM users WHERE email = ?",
      [email]
    );

    if (user.length == 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "invalid credential email" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "invalid credential password" });
    }
    const username = user[0].username
    const userid = user[0].userid

    const token = jwt.sign(
      { username,userid },
      "secret",
      { expiresIn: "30d" }
    );

    return res.status(StatusCodes.OK).json({
      msg: "Login successful",
      token,
      username
    });

  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again!" });
  }
  
}


async function checkUser(req,res){
  const username = req.user.username
  const userid = req.user.userid
  
  res.status(StatusCodes.OK).json({msg:"Valid User", username ,userid})
}

module.exports = {register,login,checkUser};