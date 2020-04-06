// accessed via /users/profile
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    });
}