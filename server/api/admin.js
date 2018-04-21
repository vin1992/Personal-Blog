let express = require('express');
const { responseClient } = require('../util');
const router = express.Router();

const articleApi = require('./article');
const tagsApi = require('./tags');


// 文章api
router.use('/article', articleApi);
// 标签api



module.exports = router;