const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');
const usersPostsController = require('../controllers/users_posts');

// so this will be accessed by /users/profile
router.get('/profile',usersController.profile);
// so this will be accessed by /users/posts
router.get('/posts',usersPostsController.posts);


router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create' ,  usersController.create);

module.exports = router;