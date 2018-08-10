/**
 * 注册登录api
 */

let express = require('express');
let User = require('../../models/user');
let { responseClient } = require('../util');
const router = express.Router();


router.post('/register', function (req, res) {
  let { user, password } = req.body;
  User.findOne({ user }).then(result => {
    if (!result) {
      let userInfo = new User({ user, password });

      userInfo.save().then(data => {
        console.log(data, 111);
        responseClient(res, 200, 0, '注册成功', data);
      }).catch(err => err)
    } else {
      responseClient(res, 200, 1, '该用户已存在，请登陆');
    }
  }).catch(err => {
    responseClient(res, 500, 1, )
  })
})

router.get('/login', function (req, res) {
  let { user, password } = req.query;
  User.findOne({ user, password }).then(result => {
    if (result) {
      let data = {
        username: result.user,
        password: result.password,
        id: result._id,
      }
      // 存session
      req.session.userInfo = data;

      console.log(req.session.userInfo, 'sas');
      responseClient(res, 200, 0, '登录成功', data);
    } else {
      responseClient(res, 500, 1, '登陆失败');

    }
  })
})

router.get('/userInfo', function (req, res) {
  if (req.session.userInfo) {
    let data = req.session.userInfo;
    responseClient(res, 200, 0, ' 可以登录', data);
  } else {
    responseClient(res, 500, 1, '请重新登录');
  }
})

module.exports = router;