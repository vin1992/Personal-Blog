let express = require('express');
let Article = require('../../models/article');
let { responseClient } = require('../util');
const router = express.Router();

router.post('/create', function (req, res) {
  let { title, content, time, tag, isPublish, description } = req.body;

  let _tag = tag;
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
    tag: _tag,
    description
  }

  let tempArticle = new Article(fields);

  tempArticle.save().then(data => {
    responseClient(res, 200, 0, '保存成功', data)
  }).catch(err => {
    console.log(err);
    responseClient(res);
  });
});

router.get('/list', function (req, res) {
  let { getDel } = req.query || false;
  console.log('dadaada', getDel);

  let responseData = {
    total: 0,
    list: []
  };
  Article.count({})
    .then(count => {
      responseData.total = count;
      Article.find({ isDel: getDel }, null)
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

// 恢复from 垃圾桶
router.get('/recover', function (req, res) {
  let { id } = req.query;

  Article.where({ _id: id })
    .update({ isDel: false })
    .then(result => {
      console.log(result, 'recover');
      if (result.n === 1) {
        responseClient(res, 200, 0, '恢复文章成功')
      } else {
        responseClient(res, 200, 1, '恢复文章失败');
      }
    }).catch(err => {
      responseClient(res);
    })
})

// 移入垃圾桶
router.get('/remove', function (req, res) {
  let { id } = req.query;

  Article.where({ _id: id })
    .update({ isDel: true })
    .then(result => {
      console.log()
      if (result.n === 1) {
        responseClient(res, 200, 0, '已成功移入回收站!')
      } else {
        responseClient(res, 200, 1, '移入回收站失败');
      }
    }).catch(err => {
      responseClient(res);
    })
})

// 彻底删除
router.get('/delete', function (req, res) {

  let { id } = req.query;
  Article.remove({ _id: id })
    .then(result => {
      console.log(result, 'fafaf')
      if (result.n === 1) {
        responseClient(res, 200, 0, '删除成功!')
      } else {
        responseClient(res, 200, 1, '文章不存在');
      }
    }).catch(err => {
      responseClient(res);
    });
})

router.post('/modify', function (req, res) {
  let { id, title, content, tag, description } = req.body;

  Article.where({ _id: id })
    .update({ title, content, tag, description })
    .then(result => {
      if (result.n === 1) {
        responseClient(res, 200, 0, '修改成功!')
      } else {
        responseClient(res, 200, 1, '修改失败');
      }
    }).catch(err => {
      responseClient(res);
    })
})

router.get('/details', function (req, res) {
  console.log(req.query);
  let { id } = req.query;

  Article.findOne({ _id: id }, '_id title content tag time description')
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



module.exports = router;