const donorRouter = require('express').Router()
const verifyAuth = require('../middlewares/basic_auth')

const {
    getAllDonor,
    getDonor,
    getDonorBooks,
    deleteDonor,
    updateDonorPassword,
    updateDonorEmail
} = require('../controllers/donor.controller')

donorRouter.get('/profile',verifyAuth,getDonor)
donorRouter.get('/books/:id', verifyAuth, getDonorBooks)
donorRouter.get('/donors', getAllDonor)
donorRouter.patch('/updateEmail/:id', verifyAuth,updateDonorEmail)
donorRouter.patch('/updatePassword/:id', verifyAuth, updateDonorPassword)
donorRouter.delete('/delete/:id', verifyAuth, deleteDonor)

module.exports = donorRouter