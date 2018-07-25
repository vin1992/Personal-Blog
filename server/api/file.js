const express = require('express');
let File = require('../../models/file');
let { responseClient, randomWord } = require('../util');


const path = require('path')
const fse = require('fs-extra')
const multer = require('multer')
const moment = require('moment')


const router = express.Router();


// multer 文件本地写入
const storageActivity = multer.diskStorage({
  destination: function (req, file, cb) {
    let year = moment().get('year')
    let month = moment().get('month') + 1
    let day = moment().get('date')
    let filePath = path.resolve(__dirname, `../../resource/wx/assets/image/${year}/${month}/${day}`)

    fse.ensureDir(filePath, function () {
      cb(null, filePath)
    })
  },
  filename: function (req, file, cb) {
    let name = randomWord(false, 12)
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      name = name + '.jpg'
    } else if (file.mimetype === 'image/png') {
      name = name + '.png'
    }
    cb(null, name)
  }
})
const uploadImg = multer({ storage: storageActivity })


router.post('/upload', uploadImg.single('image'), function (req, res) {
  if (req.file) {
    let { size, type, path } = req.file;

    let name = '';

    if (req.body.fileName !== undefined) {
      name = req.body.fileName;
    }

    let url = path.substring(path.indexOf('/wx/') + 3);
    File.create({ name, size, type, path, url }, function (err, file) {
      if (err) {
        responseClient(res, 200, 1, '上传失败', err);
      } else {
        responseClient(res, 200, 0, '上传成功', file);
      }
    })
  }

})


router.get('/getImg', function (req, res) {
  console.log('小程序请求1');
  File.find(null, null).then(result => {
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

module.exports = router;




