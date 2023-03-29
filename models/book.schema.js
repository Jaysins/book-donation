const mongoose = require('mongoose');
const userModel = require('./auth.schema');

const bookSchema = new mongoose.Schema({

    author:{
        type:String,
        require:true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        required:true
    },
    donated_at:{
        type:Date,
        default:Date.now()
    }
})

const bookModel = mongoose.model('book', bookSchema)

module.exports = bookModel