const userModel = require('../models/auth.schema')
const bookModel = require('../models/book.schema')
const {NotFoundException, ValidationException} = require('../@helpers/errorHandlers')
const bcrypt = require("bcryptjs");


async function getDonor(req, res, next) {
    const {id} = req.params
    try {

        const donor = await userModel.findById(req.user.id)

        if (!donor) {
            return res.status(403).json({
                success: false,
                message: `Donor not found`
            })
        }

        const bookCount = await bookModel.countDocuments({user: req.user.id}).exec()

        return res.json({
            success: true,
            message: "Results gotten successfully",
            data: {
                firstname: donor.firstname,
                lastname: donor.lastname,
                access_role: donor.access_role,
                email: donor.email,
                donatedBooks: bookCount
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getDonorBooks(req, res, next) {
    const userId = req.query.user_id ? req.query.user_id : req.user.id

    console.log(userId)
    try {

        const user = await userModel.findOne({_id: userId})

        if (!user) {
            return res.status(403).json({
                success: false,
                message: `Donor not found`
            })
        }

        const books = await bookModel.find(
            {user: user.id}).populate("title").exec()
        // console.log(books);

        return res.status(201).json({
            success: true,
            books: books
        })
    } catch (error) {
        next(error)
    }
}

async function getAllDonor(req, res, next) {
    try {

        const donor = await userModel.find().exec()

        if (!donor) {
            throw new NotFoundException('donor not found', 404)
        }

        return res.json({
            success: true,
            donor: donor
        })
    } catch (error) {
        next(error)
    }
}

async function updateDonorInfo(req, res, next) {

    let fieldName = req.query.field
    let fieldValue = req.body[fieldName]
    const userId = req.user.id
    try {
        if (!fieldValue || fieldValue === "") {
            return res.status(400).json({
                success: false,
                message: `${fieldName} is required`
            })
        }
        const isUserExists = await userModel.findOne({_id: userId}).exec()

        if (!isUserExists) {
            return res.status(400).json({
                success: false,
                message: `User not found`
            })
        }
        if (fieldName === "pwd") {
            fieldName = "password"
            fieldValue = await bcrypt.hash(fieldValue, 10)
        }
        const updateData = {}

        updateData[fieldName] = fieldValue

        console.log(updateData)

        const updatedDonor = await userModel.findOneAndUpdate({_id: userId}, updateData, {
            new: true,
            useFindAndModify: false,
            upsert: false
        })
        console.log(updatedDonor)

        if (updatedDonor[fieldName] !== fieldValue) {
            return res.status(400).json({
                success: false,
                message: `${fieldName} update failed`
            })
        }

        return res.json({
            success: true,
            message: `${fieldName} updated successfully`,
            data: {
                firstname: updatedDonor.firstname,
                lastname: updatedDonor.lastname,
                access_role: updatedDonor.access_role,
                email: updatedDonor.email
            }
        })
    } catch (error) {
        next(error)
    }
}

async function deleteDonor(req, res, next) {

    const userId = req.user.id
    try {
        const getUser = await userModel.findOne({_id: userId}).exec()
        if (!getUser) {
            return res.status(400).json({
                success: false,
                message: `Donor not found`
            })
        }

        const results = await userModel.findOneAndRemove({_id: userId})

        return res.json({
            status: 'success',
            message: "Donor deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllDonor,
    getDonor,
    getDonorBooks,
    deleteDonor,
    updateDonorInfo
}
