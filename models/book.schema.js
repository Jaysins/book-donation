const mongoose = require('mongoose');
// const userModel = require('./auth.schema');

const bookSchema = new mongoose.Schema({

    author:{
        type:String,
        ref:"user",
        require:true
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