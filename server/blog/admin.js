var express = require('express');
// import User from '../../models/user'
var { responseClient } = require('../util');
const router = express.Router();


// 文章api
router.use('/article', require('./article'));

module.exports = router;