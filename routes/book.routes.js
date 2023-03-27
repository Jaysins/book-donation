const bookRouter = require('express').Router()
const verifyAuth = require('../middlewares/basic_auth')

const {donateBook, getBooks, fetchBook} = require('../controllers/book.controller')

bookRouter.post('/donate',verifyAuth, donateBook)
bookRouter.get('/', getBooks)
bookRouter.get('/books/info/:id', fetchBook)



module.exports = bookRouter