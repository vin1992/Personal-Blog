let express = require('express');
let Article = require('../../models/article');
let { responseClient } = require('../util');
const router = express.Router();

router.post('/create', function (req, res) {
  const {
    title,
    content,
    time,
    tags,
    isPublish
  } = req.body;

  const author = 'vin_coder' || req.session.userInfo.username;
  const coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`;
  const viewCount = 0;
  const commentCount = 0;
  var _tags = tags.split(',');
  let tempArticle = new Article({
    title,
    content,
    isPublish,
    viewCount,
    commentCount,
    time,
    author,
    coverImg,
    tags: _tags,
  });
  tempArticle.save().then(data => {
    responseClient(res, 200, 0, '保存成功', data)
  }).cancel(err => {
    console.log(err);
    responseClient(res);
  });
});

module.exports = router;