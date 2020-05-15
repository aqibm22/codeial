const Post = require('../models/post');
const User = require('../models/user');

// all functiomn here is accesed by controller
///format- 
// module.exports.actionName = function(req,res){
//    ....
//} // see routers as to how and when to use functions

// this is after  async await is done , if you want to see the prevoius versions see the comment on or  before 28th April, 2020

module.exports.home = async function(req,res){
    
    try{
        let posts = await Post.find({})
        .sort('-createdAt') // to sort according to the latest
        .populate('user') // user sent along with the post as done above
        .populate({
            path: 'comments',
            populate: {
                path: 'user' // the author of the comment is sent for every post
            }
        });
        let users =  await User.find({});

        return res.render('home',{
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
        
    }catch(err){
        console.log('Error' , err);
        return;
    } 
}

