// this file was given control by the index.js of api folder
const express = require('express');

const router = express.Router();

//give control to the posts.js in this v1 folder itself
router.use('/posts',require('./posts'));

module.exports = router;