const express = require('express');

const router = express.Router();

const usersContoller = require('../controllers/users_controller');
const usersPostsController = require('../controllers/users_posts');

// so this will be accessed by /users/profile
router.get('/profile',usersContoller.profile);
// so this will be accessed by /users/posts
router.get('/posts',usersPostsController.posts);
module.exports = router;