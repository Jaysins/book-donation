const userModel = require('../models/auth.schema')
const { AuthForbiddenException, ValidationException, NotFoundException } = require('../@helpers/errorHandlers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function signup(req, res, next) {
    const { firstname, lastname, email, password } = req.body;
    try {
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: `Invalid. All field required`
            })
        }
        const user = await userModel.findOne({ email: email }).exec()

        if (user) {
            // Return user already exists
            return res.status().json({
                success: false,
                message: `User already exists. login instead`
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            firstname,
            lastname,
            email,
            password: hashedPassword
        })

        const { pwd, ...results } = newUser
        res.status(201).json({
            status: 'success',
            message: "user created successfully",
            data: results._doc
        })


        await newUser.save()
        //
    }
    catch (error) {
        next(error)
    }
}

async function login(req, res, next) {
    const { email, password } = req.body

    const user = req.body

    try {

        const userInfo = await userModel.findOne({ email: email }).exec()


        if (!userInfo) {
            return res.status(403).json({
                success: false,
                message: `User not Found, sign up instead`,
            })
        }

        // const isCorrectPassword = await bcrypt.compareSync(password, userInfo.password)
        if (!await bcrypt.compareSync(password, userInfo.password)) {
            return res.status(403).json({
                success: false,
                message: `Incorrect credentials`,
            })
        }

        const tokenPayload = {
            email: user.email,
            id: userInfo._id.toString(),
            name: userInfo.firstname + " " + userInfo.lastname
        }

        console.log(tokenPayload);
        const access_token = await jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: "2h" })
        return res.status(200).json({
            sucess: true,
            message: `User has being logged in successfully`,
            access_token: access_token
        })

    }
    catch (error) {
        next(error)
    }

}

module.exports = {
    signup,
    login
}

