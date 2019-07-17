const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  value: String,
  text: String,
});

module.exports = mongoose.model('tags', TagSchema);