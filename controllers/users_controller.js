const User = require('../models/user');

// accessed via /users/profile
// changes done to display friends
module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: 'User Profile',
            profile_user: user
        });
    });
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){ //checking if user sending the request and the one whose credentials are to be updated are same
        // instead of req.body we could have writtern {name: req.body.name , email: req.body.email} but instead we update in db as all fields of body are same in db as well
        User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized'); // like 404 error etc.
    }
}

// render the sign Up page
module.exports.signUp = function(req,res){
     // to avoid accessing of sign in page if user is logged in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_up',{
        title : "Codeial | Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){
    // to avoid accessing of sign in page if user is logged in
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in',{
        title : "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err , user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }

        if(!user){
            User.create(req.body , function(err,user){
                if(err){
                    console.log("Error in creating user while signing up");
                    return;
                }

                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

//sign in and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in sucessfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}