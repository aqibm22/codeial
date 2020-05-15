// this file was accessed by the root/main index.js
const express = require('express');

const router = express.Router();

// this will give control to the index.js of v1 folder
router.use('/v1', require('./v1'));

module.exports = router;