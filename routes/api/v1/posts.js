const express = require('express');

const router = express.Router();
const passport = require('passport');

// acquire a controller called posts_api in thru controllers/api/v1/posts_api
const postsApi = require('../../../controllers/api/v1/posts_api');

// use the function called index of the posts_api
router.get('/',postsApi.index);
router.delete('/:id', passport.authenticate('jwt' , {session: false}) ,postsApi.destroy);
module.exports = router;