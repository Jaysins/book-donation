const bookModel = require('../models/book.schema');

const {AuthForbiddenException, NotFoundException} = require('../@helpers/errorHandlers')

const jwt = require('jsonwebtoken');
const userModel = require('../models/auth.schema');

async function donateBook(req, res, next){
    const {title, content, author} = req.body
    const userId = req.user.id
    try{

        if (title.length < 5 || content.length < 10 ) {
            return res.json({
                success:false,
                message:"title must be at least 10 charasters long and content must be at least 1000 characters long"
            })
        }

        const book = await new bookModel({
            title:title, content:content, author:author, user: userId
        }).save()

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

        const books = await bookModel.find().exec()
        console.log(books);

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

async function getBook(req, res, next){
    const {id} = req.params
    try{

        const isDonor = await bookModel.findById(req.params.id)

        if(!isDonor){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            })
        }

        const fetchBookInfo = await bookModel.findById(req.params.id).populate("user")


        return res.json({
            message:"books",
            success:true,
            books:fetchBookInfo
        })
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    donateBook,
    getBooks,
    getBook
}