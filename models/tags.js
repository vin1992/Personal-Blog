let mongoose = require('mongoose');
let tagsSchema = require('../schemas/tags');

module.exports = mongoose.model('Tags', tagsSchema);