//will be accessed by users/posts/
module.exports.posts = function(req,res){
    return res.end('<h1>User Posts</h1>');
}