const express = require("express");
const router = express.Router();
const {register,login,checkUser} = require("../controller/userController")


//authentication
const authMiddleware = require("../middleware/middleware")

// register user

router.post("/register",register)

// login user

router.post("/login",login)

// check user
router.get("/check", authMiddleware ,checkUser)

module.exports = router;