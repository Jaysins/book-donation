const { InvalidOrExpiredToken, AuthForbiddenException} = require('../@helpers/errorHandlers')
const userModel = require('../models/auth.schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function verifyAuth(req, res, next){
   try{
        if(!req.headers.authorization){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Operations"
            })
    }

    const token = req.headers.authorization.split(" ")[1]

    const splitUser = jwt.verify(token, process.env.SECRET_KEY)
    console.log(splitUser);
    const userId = splitUser.id
    if(!userId){
        return res.status(401).json({
            success:false,
            message:`Unathorized operation`
        })
    }


    const auth = await userModel.findById(userId)

    if(!auth){
        return res.status(401).json({
            success:false,
            message:`Unauthorized operation`
        })
    }
    req.user = splitUser

    next()
}
catch(error){
    
    next(error)
}

}

module.exports = verifyAuth