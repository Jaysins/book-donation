const bookRouter = require('express').Router()
const verifyAuth = require('../middlewares/basic_auth')

const {donateBook, getBooks, getBook} = require('../controllers/book.controller')

bookRouter.post('/donate',verifyAuth, donateBook)
bookRouter.get('/', getBooks)
bookRouter.get('/info/:id', getBook)



module.exports = bookRouter