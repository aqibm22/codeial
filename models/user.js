const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
}, {
    // when it is created and updated
    timestamps : true
});

const user = mongoose.model('User' , userSchema);

module.exports = user;


