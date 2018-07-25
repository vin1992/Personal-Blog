let mongoose = require('mongoose');
let fileSchema = require('../schemas/file');

module.exports = mongoose.model('File', fileSchema);