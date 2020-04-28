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

//same as delete post.
module.exports.destroy = function(req,res){
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){ //.id here converts it to string

            let postId = comment.post; // this is the post where we have to delete the current comment
            // removing the desired comment from db Comment
            comment.remove(); 
            // pulling out desired comment which is in req.params.id from postId/comments array by using the below function - 
            Post.findByIdAndUpdate(postId , { $pull: {comments: req.params.id} }, function(err, post){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}