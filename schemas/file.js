/**
 * article 表结构
 */

let mongoose = require('mongoose');

const table_struct = {
  url: String,
  name: String,
  size: Number,
  type: String,
  path: String,
}

module.exports = new mongoose.Schema(table_struct);