//this will be printed when wo go http://localhost:8000/api/v1/posts
// this file is used by posts.js in rotes/api/v1/posts.js

const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){
    
    let posts = await Post.find({})
        .sort('-createdAt') 
        .populate('user') 
        .populate({
            path: 'comments',
            populate: {
                path: 'user' 
            }
        });
    // this will display all the posts in postman when u give the above url
    return res.json(200,{
        message: "List of posts",
        posts: posts
    });
}

//destroy function taken from posts controller and modified accordingly
module.exports.destroy = async function(req,res){
    
    try{
        let post = await Post.findById(req.params.id);
        
        if(post.user == req.user.id){ 
            post.remove();
    
            await Comment.deleteMany({post: req.params.id});

            return res.json(200,{
                message : "Post and associated comments deleted successfully"
            });
        }else{
            return res.json(401 , {
                message: "You cannot delete this post"
            });
        }

    }catch(err){
        console.log('*********',err);
        return res.json(500, {
            message : "Internal Server Error"
        });
    }
}