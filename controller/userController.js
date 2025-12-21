// db connection
const dbConnection = require("../db/dbConfig");



async function register(req, res) {
  const { username, fristname, lastname, email, password } = req.body;

  if (!username || !fristname || !lastname || !email || !password) {
    return res.status(400).json({ msg: "Please fulfill all requirements" });
  }
  try{
    const [user] = await dbConnection.query("select userid,username from users where username =? or email = ?", 
        [username,email]
    )

        if(user.length>0){
            return res.status(400).json({msg:"User already registered"})
        }
        if(password.length <= 8){
            return res.status(400).json({msg:"Password must have to be at least 8 characters"})
        }
        
        // decripting PASWORD>>>>>>>>>>>>> next

    await dbConnection.query("INSERT INTO users ( username, fristname, lastname, email, password ) VALUES (?,?,?,?,?)",
        [ username, fristname, lastname, email, password ]
    )
         return res.status(201).json({ msg: "User registered successfully " });  

  }catch(error){
    console.log({msg:"Something went wrong, try again!"})
  }


}






async function login(req,res){
    res.send("login")
}
async function checkUser(req,res){
    res.send("checkUser")
}

module.exports = {register,login,checkUser};