let mongoose = require('mongoose');
let userSchema = require('../schemas/user');

module.exports = mongoose.model('Tags', userSchema);