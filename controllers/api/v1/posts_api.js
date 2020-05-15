//this will be printed when wo go http://localhost:8000/api/v1/posts
// this file is used by posts.js in rotes/api/v1/posts.js

module.exports.index = function(req,res){
    return res.json(200,{
        message: "List of posts",
        posts: []
    })
}