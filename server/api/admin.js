let express = require('express');
const { responseClient } = require('../util');
const router = express.Router();

const articleApi = require('./article');
const tagsApi = require('./tags');
const userApi = require('./user');


// 文章api
router.use('/article', articleApi);

// 标签api
router.use('/tags', tagsApi);

// 用户api
router.use('/user',userApi);


module.exports = router;