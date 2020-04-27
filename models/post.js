const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the id's of all the comments in this post schema itself in an array called comments
    // for quick fetching on comments when a  post is displayed
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;