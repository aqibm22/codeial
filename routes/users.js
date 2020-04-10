const express = require('express');
const router = express.Router();

const passport = require('passport');

const usersController = require('../controllers/users_controller');
const usersPostsController = require('../controllers/users_posts');

// so this will be accessed by /users/profile
router.get('/profile', passport.checkAuthentication,usersController.profile);
// so this will be accessed by /users/posts
router.get('/posts',usersPostsController.posts);


router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create' ,  usersController.create);

// use passport as a middleware to authenticate--
// middlware in {}
router.post('/create-session' , passport.authenticate(
    'local',
    { failureRedirect : '/users/sign-in'},
)  , usersController.createSession);

router.get('/sign-out' , usersController.destroySession);


module.exports = router;