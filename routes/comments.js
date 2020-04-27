const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsController = require('../controllers/comments_controller');

//double check as to only signed in user can create a psot
router.post('/create' , passport.checkAuthentication, commentsController.create);
// to delete a comment-
router.get('/destroy/:id', passport.checkAuthentication, commentsController.destroy);

module.exports = router;