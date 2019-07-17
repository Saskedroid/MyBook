const mongoose = require('../mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  isbn: String,
  title: String,
  origin_title: String,
  image: String,
  author: Array,
  translator: Array,
  category: String,
  publisher: String,
  pubdate: String,
  tags: Array,
  binding: String,
  price: String,
  series: Object,
  pages: String,
  memo: String,
  summary: String
});

module.exports = mongoose.model('books', BookSchema);