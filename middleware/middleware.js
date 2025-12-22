const { StatusCodes } = require("http-status-codes")
const { route } = require("../routes/userRoute")
const jwt = require("jsonwebtoken");

async function authMiddleware(req,res, next){
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(StatusCodes.BAD_REQUEST).json({msg:"Authentication is invalid"})

    }
    try{
        const data = jwt.verify(authHeader, "secret")
        // return res.status(StatusCodes.OK).json({data})
        next()
    }catch(error){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"Authentication is invalid ab"})
    }
}
module.exports = authMiddleware;