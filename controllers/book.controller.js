const bookModel = require('../models/book.schema');

const {AuthForbiddenException, NotFoundException} = require('../@helpers/errorHandlers')

const jwt = require('jsonwebtoken');
const userModel = require('../models/auth.schema');

async function donateBook(req, res, next){
    const {title, content} = req.body
    const token = req.headers.authorization.split(" ")[1]
    const author = jwt.verify(token, process.env.SECRET_KEY).name
    try{

        if (title.length < 5 || content.length < 10 ) {
            return res.json({
                success:false,
                message:"title must be at least 10 charasters long and content must be at least 1000 characters long"
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
        
        const isDonor = await userModel.findOne({_id:id}).exec()
        console.log(book);

        if(!isDonor){
            return res.status(404).json({
                success:false,
                message:"Author has no book"
            })
        }

        

        return res.json({
            message:"books",
            success:true,
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