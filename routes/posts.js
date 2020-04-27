const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

//double check as to only signed in user can create a psot
router.post('/create' , passport.checkAuthentication, postsController.create);

module.exports = router;