let express = require('express');
let Article = require('../../models/article');
let { responseClient } = require('../util');
const router = express.Router();

router.post('/create', function (req, res) {
  let { title, content, time, tags, isPublish } = req.body;

  let _tags = tags.split(',');
  const author = 'vin_coder' || req.session.userInfo.username;
  const coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`;
  const viewCount = 0;
  const commentCount = 0;

  const fields = {
    title,
    content,
    isPublish,
    viewCount,
    commentCount,
    time,
    author,
    coverImg,
    tags: _tags,
  }

  let tempArticle = new Article(fields);

  tempArticle.save().then(data => {
    responseClient(res, 200, 0, '保存成功', data)
  }).catch(err => {
    console.log(err);
    responseClient(res);
  });
});




module.exports = router;