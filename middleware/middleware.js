const { StatusCodes } = require("http-status-codes")
const { route } = require("../routes/userRoute")
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res, next){
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Authentication is unregistered"})

    }
    const token = authHeader.split(' ')[1]
    try{
        const { username, userid } = jwt.verify(token, "secret")
        // return res.status(StatusCodes.OK).json({data})
        req.user = { username, userid }
        next() // to jump or see the next one in the user controller
    }catch(error){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication is invalid ab"})
    }
}
module.exports = authMiddleware;