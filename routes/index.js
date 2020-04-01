const express = require('express');
// it will fetch same express what main index.js did


const router = express.Router();
const homeContoller = require('../controllers/home_contoller');
console.log("Router Loaded");


//format to access the fucntion in Contoller
// router.get('/urlname',homeContoller.actionName)
router.get('/',homeContoller.home);

module.exports = router;
