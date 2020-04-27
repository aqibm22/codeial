const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

//double check as to only signed in user can create a psot
router.post('/create' , passport.checkAuthentication, postsController.create);
//to delete a post
router.get('/destroy/:id',passport.checkAuthentication, postsController.destroy);

module.exports = router;