// user 表

let mongoose = require("mongoose");

const table_struct = {
  username: String,
  password: String,
  type: String//管理员、普通用户
}

module.exports = new mongoose.Schema(table_struct);