const { InvalidOrExpiredToken, AuthForbiddenException} = require('../@helpers/errorHandlers')
const authModel = require('../models/auth.schema')
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
    console.log(splitUser.name);
    const email = splitUser.email
    if(!email){
        return res.status(401).json({
            success:false,
            message:`Unathorized operation`
        })
    }


    const auth = await authModel.findOne({email:email}).exec()

    if(!auth){
        return res.status(401).json({
            success:false,
            message:`Unauthorized operation`
        })
    }
    next()
}
catch(error){
    
    next(error)
}

}

module.exports = verifyAuth