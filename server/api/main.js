const express = require('express');

const Article = require('../../models/article');
const Tags = require('../../models/tags');
let { responseClient } = require('../util');
let dbHelper = require('../support');

const router = express.Router();


const fileApi = require('./file');

//获取文章列表
router.get('/list', function (req, res) {
  console.log(req.query, '列表');
  let size = Number(req.query.size) || 5;
  let tag = null || req.query.tag;
  let isPublish = req.query.isPublish || true;
  let page = req.query.page;
  let searchCondition = {
    isPublish,
    isDel: false, // 未删除的才筛选出来
  };
  if (tag) {
    searchCondition.tag = tag;
  }
  if (isPublish === 'false') {
    searchCondition = null
  }
  let skip = page < 1 ? 1 : (page - 1) * size;
  let responseData = {
    total: 0,
    list: [],
    page: page,
    size: size,
  };
  Article.count(searchCondition)
    .then(count => {
      responseData.total = count;
      Article.find(searchCondition, null, {
        skip: skip,
        limit: size,
      })
        .then(result => {
          responseData.list = result;
          responseClient(res, 200, 0, 'success', responseData);
        }).catch(err => {
          throw err
        })
    }).catch(err => {
      responseClient(res);
    });
});

// 获取文章详情

router.get('/details', function (req, res) {
  let { id } = req.query;

  Article.findOne({ _id: id }, '_id title content tag time author')
    .then(result => {
      if (result) {
        responseClient(res, 200, 0, '获取成功', result);
      } else {
        responseClient(res, 200, 1, '获取失败', result);
      }
    })
    .catch(err => {
      responseClient(res);
    })
})


router.get('/getTags', function (req, res) {
  Tags.find(null, 'name').then(result => {
    if (result) {
      console.log(result, '小程序请求');
      responseClient(res, 200, 0, '查询成功', result);
    } else {
      responseClient(res, 200, 1, '无数据');
    }
  }).catch(err => {
    responseClient(res);
  })
})


router.use('/file', fileApi);

module.exports = router;