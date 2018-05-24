//logs.js
const util = require('../../utils/util.js')

import baseUrl from '../../config/config';

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    console.log(baseUrl);
    this.getData();
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    
  },

  getData() {
    let obj = {
      url:baseUrl.API_URL + 'getTags',
      method:'GET',
      dataType:'json',
      success:function(res) {
        console.log(res,'返回数据');
      }
    }
    wx.request(obj);
  }
})
