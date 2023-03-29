const userModel = require('../models/auth.schema')
const bookModel = require('../models/book.schema')
const { NotFoundException, ValidationException } = require('../@helpers/errorHandlers')



async function getDonor(req, res, next) {
    const { id } = req.params
    console.log(req.user, "I am req.user");
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
                donor:donor,
                bookCount:bookCount
            })
        }

        catch (error) {
            next(error)
        }
}
async function getDonorBooks(req, res, next) {
    const { id } = req.params
    try {

        const userId = await userModel.findById(req.params.id)
        console.log(userId);

        if (!userId) {
            return res.status(403).json({
                success: false,
                message: `Donor not found`
            })
        }

        const books = await bookModel.find({ id: userId.id }).populate("title").exec()
        // console.log(books);

        return res.status(201).json({
            success: true,
            books: books
        })
    }
    catch (error) {
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
    }

    catch (error) {
        next(error)
    }
}

async function updateDonorEmail(req, res, next) {
    const { email } = req.body
    const { id } = req.params
    try {

        const isUserExists = await userModel.findOne({ _id: id }).exec()
        if (!isUserExists) {
            return res.status(400).json({
                success: false,
                message: ` User not found`
            })
        }
        if (email === "") {
            return res.status(400).json({
                success: false,
                message: `Email is required`
            })
        }
        const emailUpdate = await userModel.updateOne({ _id: id }, { email: email }, { new: true, useFindAndModify: false, upsert: false })

        if (!emailUpdate.acknowledged) {
            return res.status(400).json({
                success: false,
                message: `Email update failed`
            })
        }

        return res.json({
            success: true,
            message: `Email updated successfully`,
        })
    }

    catch (error) {
        next(error)
    }
}
async function updateDonorPassword(req, res, next) {
    const { password } = req.body
    const { id } = req.params
    try {
        const isDonorExist = await userModel.findOne({ _id: id }).exec()

        if (!isDonorExist) {
            return res.status(400).json({
                success: false,
                message: `password field required`
            })
        }

        const passwordUpdate = await userModel.updateOne({ _id: id }, { password: password }, { new: true, useFindAndModify: false, upsert: false })

        return res.json({
            success: true,
            message: `Password updated successfully`,
        })

    }

    catch (error) {
        next(error)
    }
}

async function deleteDonor(req, res, next) {

    const { id } = req.params
    try {
        const getUser = await userModel.findOne({ _id: id }).exec()
        if (!getUser) {
            return res.status(400).json({
                success: false,
                message: `Donor not found`
            })
        }

        const results = await userModel.findOneAndRemove({ _id: id })

        return res.json({
            status: 'success',
            message: "Donor deleted successfully"
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    getAllDonor,
    getDonor,
    getDonorBooks,
    deleteDonor,
    updateDonorPassword,
    updateDonorEmail
}
