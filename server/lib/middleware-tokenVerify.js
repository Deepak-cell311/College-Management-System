const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization")
    if(!authHeader){
        return res.status(401).json({message: "Access Denied. No Token Is Provided"})
    }
    const token = authHeader.replace("Bearer ", "")
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        return res.status(400).json({message: "Invalid Token"})
    }
}

module.exports = verifyToken