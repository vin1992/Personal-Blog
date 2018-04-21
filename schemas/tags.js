/**
 * tags 
 */

let mongoose = require('mongoose');

const table_struct = {
  name: String
}

module.exports = new mongoose.Schema(table_struct);