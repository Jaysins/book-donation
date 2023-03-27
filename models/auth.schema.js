const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    access_role:{
        type: String,
        enum:["donor", "admin"],
        default:"donor"
    },

    api_key:String,

    created_at:{
        type: Date,
        require:true,
        default:Date.now()
    }
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel