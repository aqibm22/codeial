const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    //check if the post on which the comment, that post id exists in db Post
    Post.findById(req.body.post , function(err,post){ // post variable will hold the post whose id was queried by req.body.post
        if(post){
            Comment.create({
                content : req.body.content,
                post : req.body.post, // 1) place the post id in the comments as field post
                user: req.user._id
            }, function(err,comment){
                if(err){
                    console.log('Error in creating comment');
                    return;
                }
                post.comments.push(comment); // 2) push the created comment into the comments array of database Post
                post.save(); // as we updated in database Post  we use post.save();
                res.redirect('/');
            });
        }
    });
}