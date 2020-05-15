const express = require('express');

const router = express.Router();

// acquire a controller called posts_api in thru controllers/api/v1/posts_api
const postsApi = require('../../../controllers/api/v1/posts_api');

// use the function called index of the posts_api
router.get('/',postsApi.index);

module.exports = router;