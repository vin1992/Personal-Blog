/**
 * article 表结构
 */

let mongoose = require('mongoose');

const table_struct = {
  title: String, // 文章标题
  content: String,
  time: Number,
  author: String,
  viewCount: Number,// 浏览次数
  commentCount: Number,// 评论次数
  coverImg: String,// 封面图片
  tag: String,// 标签
  isPublish: Boolean,// 是否发布
  isDel: {
    type: Boolean,
    default: false, // true 表示 移入垃圾桶 false 为 未进行任何操作
  },
}

module.exports = new mongoose.Schema(table_struct);