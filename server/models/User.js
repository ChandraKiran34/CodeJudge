const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName :{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true,
        unique:true
    },
    password:{
        type:"String",
        required:true
    },
    phone:{
        type:"String",
        required:true,
        unique:true
    },
    github:{
        type:"String",
        required:true
    },
    linkedin:{
        type:"String",
        required:true
    }
})

const User = mongoose.model('User',userSchema);

module.exports = User;