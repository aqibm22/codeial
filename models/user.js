const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
// the path of the avatar folder 
const AVATAR_PATH = path.join('/uploads/users/avatar'); 

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
    },
    avatar : {
        type : String
    }
}, {
    // when it is created and updated
    timestamps : true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..' , AVATAR_PATH));
      // this creates the path of parent of user.js + AVATAR_PATH we have above
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
})

const user = mongoose.model('User' , userSchema);

module.exports = user;


