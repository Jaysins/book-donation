const userModel = require('../models/auth.schema')
const bookModel = require('../models/book.schema')
const{NotFoundException, ValidationException} = require('../@helpers/errorHandlers')



async function getDonor(req, res, next){
    try{

        const donor = await bookModel.findOne({email:email}).populate('author').exec()

        if(!donor){
            return res.status(403).json({
                success:false,
                message:`Donor not found`
            })
        }

        return res.json({
            success:true,
            donor:donor
        })
    }

    catch(error){
        next(error)
    }
}
async function getDonorBooks(req, res, next){
    const {id} = req.params
    try{

        const userId = await userModel.findOne({_id:id}).exec()

        if(!userId){
            return res.status(403).json({
                success:false,
                message:`Donor not found`
            })
        }

        const books = await bookModel.findOne({_id:userId.id}).populate().exec()
        
        return res.status(201).json({
            success:true,
            books:books
        })
    }

    catch(error){
        next(error)
    }
}
async function getAllDonor(req, res, next){
    try{

        const donor = await bookModel.find().populate('author').exec()

        if(!donor){
            throw new NotFoundException('donor not found', 404)
        }

        return res.json({
            success:true,
            donor:donor
        })
    }

    catch(error){
        next(error)
    }
}

async function updateDonorEmail(req,res,next){
    const {email} = req.body.email
    try{
        const donorEmail = await userModel.findOne({email:email})

        if(!donorEmail){
            return res.status(400).json({
                success:false,
                message:`email field required`
            })
        }

        const emailUpdate = await userModel.updateOne({_id:id},{donorEmail:email})

        return emailUpdate
    }
    
    catch(error){
        next(error)
    }
}
async function updateDonorPassword(req,res,next){
    const {password} = req.body.password
    try{
        const donorEmail = await userModel.findOne({_id:id})

        if(!donorEmail){
            return res.status(400).json({
                success:false,
                message:`email field required`
            })
        }

        const emailUpdate = await userModel.updateOne({_id:id},{donorPasswod:password})

        return emailUpdate
    }
    
    catch(error){
        next(error)
    }
}

async function deleteDonor(req, res, next){
    
    const {id}= req.params.id
    try{
        if(!id){
            return res.status(400).json({
                success:false,
                message:`Donor not found`
            })
        }

        const results = await userModel.deleteOne({_id:id})

        return res.json({
            status:'success',
            message:"Donor deleted successfully",
            data:results
        })
    }
    catch (error){
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
