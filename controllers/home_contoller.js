const Post = require('../models/post');


// all functiomn here is accesed by controller
///format- 
// module.exports.actionName = function(req,res){
//    ....
//} // see routers as to how and when to use functions
module.exports.home = function(req,res){
    //to see cookies--
    //console.log(req.cookies);
    //to change a cookie --
    // res.cookie('yoo',90); //yoo is id , 90 is value
    // to display all the posts -
    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: "Codeilal | Home",
    //         posts: posts 
    //     });
    // }); 

    // populate the user of this post, whole user will be sent along with the post, we just display the name there in homee.ejs
    // Post.find({}).populate('user').exec(function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts 
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts 
        });
    });
}

