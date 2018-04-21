const express = require('express');

const Article = require('../../models/article');
let { responseClient } = require('../util');

const router = express.Router();

//获取文章
router.get('/list', function (req, res) {
  console.log(req.query);
  let tag = null || req.query.tag;
  let isPublish = true || req.query.isPublish;
  let searchCondition = {
    isPublish,
  };
  if (tag) {
    searchCondition.tags = tag;
  }
  if (isPublish === 'false') {
    searchCondition = null
  }
  let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
  let responseData = {
    total: 0,
    list: []
  };
  Article.count(searchCondition)
    .then(count => {
      responseData.total = count;
      Article.find(searchCondition, '_id title isPublish author viewCount commentCount time coverImg', {
        skip: skip,
        limit: 5
      })
        // Article.find()
        .then(result => {
          console.log(result, 'shit');
          responseData.list = result;
          responseClient(res, 200, 0, 'success', responseData);
        }).catch(err => {
          throw err
        })
    }).catch(err => {
      responseClient(res);
    });
});

module.exports = router;