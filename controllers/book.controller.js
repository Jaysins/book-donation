const bookModel = require('../models/book.schema');

const {AuthForbiddenException, NotFoundException} = require('../@helpers/errorHandlers')

const jwt = require('jsonwebtoken')

async function donateBook(req, res, next){
    const {title, content} = req.body
    const token = req.headers.authorization.split(" ")[1]
    const author = jwt.verify(token, process.env.SECRET_KEY).name
    console.log(author);
    try{

        if (title.length < 5 || content.length < 10 ) {
            return res.json({
                success:false,
                message:"title must be at least 10 charasters long and content must be at least 1000 characters long"
            })
        }

        if(author === null){
            return res.json({
                success:false,
                message:`Input Author's name.`
            })
        }

        const book = new bookModel({
            title:title,
            content:content,
            author:author
        })

        await book.save()
        return res.json({
            message:"Book donated successfully",
            success:true,
            book:book
        })

    }
    catch(error){
        next(error)
    }
}


async function getBooks(req, res, next){

    try{

        const books = await bookModel.find().populate('author').exec()

        return res.json({
            message:"books",
            success:true,
            books:books
        })
    }
    catch(error){
        next(error)
    }
}

async function fetchBook(req, res, next){
    const {id} = req.params
    try{
        
        const book = await bookModel.findOne({_id:id}).populate().exec()
        if(!book){
            throw new NotFoundException(`An error occured while fetching book with id ${id}: ${error.message}`, 404)
        }
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    donateBook,
    getBooks,
    fetchBook
}