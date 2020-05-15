const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

// see JWT article for more details 
// secretOrKey is the encoding key
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey = 'codeial'
}

passport.use( new JWTStrategy(opts , function(jwtPayLoad , done){
    
    // fetching the id from the payload and checking if such a user exists in db
    User.findById(jwtPayLoad._id , function(err , user){
        if(err){
            console.log('Error in fiding user from JWT');
            return;
        }

        if(user){
            return done(null , user);
        }
        else{
            return done(null , false);
        }
    });

}));

module.exports = passport;



