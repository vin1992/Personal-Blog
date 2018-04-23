/**
 * 后端 标签管理api
 */

let express = require('express');
let Tags = require('../../models/tags');
let { responseClient } = require('../util');
const router = express.Router();


router.post('/create', function (req, res) {
  let { name } = req.body;
  Tags.findOne({ name }).then(result => {
    if (!result) {
      let tag = new Tags({ name });

      tag.save().then(data => {
        console.log(data, 111);
        responseClient(res, 200, 0, '添加成功', data);
      }).catch(err => {
        // console.log(err);
      })
    } else {
      responseClient(res, 200, 1, '该标签已存在');
    }
  }).catch(err => {
    responseClient(res)
  })
});

router.post('/delete', function (req, res) {
  console.log(req.query, req.body);

  let { name } = req.body;
  Tags.remove({ name })
    .then(result => {
      console.log(result, 'fafaf')
      if (result.n === 1) {
        responseClient(res, 200, 0, '删除成功!')
      } else {
        responseClient(res, 200, 1, '标签不存在');
      }
    }).catch(err => {
      responseClient(res);
    });
})

router.get('/getTags', function (req, res) {
  Tags.find(null, 'name').then(result => {
    if (result) {
      result = getArray(result);
      console.log(result, '返回结果');
      responseClient(res, 200, 0, '查询成功', result);
    } else {
      responseClient(res, 200, 1, '无数据');
    }
  }).catch(err => {
    responseClient(res);
  })
})

function getArray(list) {
  if (!list || (list && list.length == 0)) return;

  let result = [];
  list.forEach(item => {
    result.push(item.name);
  })

  return result;
}

module.exports = router;