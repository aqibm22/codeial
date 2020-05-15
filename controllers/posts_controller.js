const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        }); 
        // checking if the request is coming through ajax or not
        if(req.xhr){
            post=await post.populate('user').execPopulate();// tbis line displayed the name of the author of the post 
            return res.status(200).json({
                data : {
                    post: post
                },
                message: "Post created!"
            });
        }
        // success flash message - 
        req.flash('success', 'Post published');
        return res.redirect('back');
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}

//params as in the url is of form /destroy/:id
module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){ 
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});

            if(req.xhr){
                return res.status(200).json({
                    data : {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');
            return res.redirect('back');
        }else{

            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}