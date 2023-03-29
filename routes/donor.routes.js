const donorRouter = require('express').Router()
const verifyAuth = require('../middlewares/basic_auth')

const {
    getAllDonor,
    getDonor,
    getDonorBooks,
    deleteDonor,
    updateDonorInfo,
} = require('../controllers/donor.controller')

donorRouter.get('/profile',verifyAuth,getDonor)
donorRouter.get('/books', verifyAuth, getDonorBooks)
donorRouter.get('/donors', getAllDonor)
donorRouter.patch('/update', verifyAuth,updateDonorInfo)
donorRouter.delete('/delete', verifyAuth, deleteDonor)

module.exports = donorRouter