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

        const donor = await userModel.find().exec()

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
    const {email} = req.body
    const {id} = req.params
    try{

        const isUserExists = await userModel.findOne({_id:id}).exec()
        if(!isUserExists){
            return res.status(400).json({
                success:false,
                message:` User not found`
            })
        }
        if(email === ""){
            return res.status(400).json({
                success:false,
                message:`Email is required`
            })
        }
        const emailUpdate = await userModel.updateOne({_id:id},{email:email}, {new:true, useFindAndModify:false, upsert:false})

        if(!emailUpdate.acknowledged){
            return res.status(400).json({
                success:false,
                message:`Email update failed`
            })
        }
       
        return res.json({
            success:true,
            message:`Email updated successfully`,
            email:emailUpdate
        })
    }
    
    catch(error){
        next(error)
    }
}
async function updateDonorPassword(req,res,next){
    const {password} = req.body
    const{id} = req.params.id
    try{
        const donorPassword = await userModel.findOne({_id:id})

        if(!donorPassword){
            return res.status(400).json({
                success:false,
                message:`password field required`
            })
        }

        const passwordUpdate = await userModel.updateOne({_id:id},{donorPasswod:password})

        return res.json({
            success:true,
            message:`Password updated successfully`,
            password:passwordUpdate
        })

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
