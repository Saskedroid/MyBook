const Books = require('../models/book.js');

class MongoBook {
  // 查询所有图书
  getBooksList(index, offset) {
    return new Promise((resolve, reject) => {
      // 注：index 和 offset 是数字类型
      Books.find({}).skip(Number(index)).limit(Number(offset)).exec((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  // 查看图书详情
  getBookDetail(id) {
    return new Promise((resolve, reject) => {
      Books.findById(id, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
  // 添加图书
  addBook(data) {
    var book = new Books({
      isbn: data.isbn,
      title: data.title,
      origin_title: data.origin_title,
      image: data.image,
      author: data.author,
      translator: data.translator,
      category: data.category,
      publisher: data.publisher,
      pubdate: data.pubdate,
      tags: data.tags,
      binding: data.binding,
      price: data.price,
      series: data.series,
      pages: data.pages,
      memo: data.memo,
      summary: data.summary
    });
    return new Promise((resolve, reject) => {
      book.save({}, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
  // 编辑图书
  updateBook(id, data) {
    return new Promise((resolve, reject) => {
      Books.update({}, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
  // 删除图书
  deleteBook(id) {
    return new Promise((resolve, reject) => {
      Books.remove({}, (err, doc) => {
        if (err) {
          reject(err);
        } else {
          resolve(doc);
        }
      });
    });
  }
  // 统计图书总数
  getAllCount() {
    return new Promise((resolve, reject) => {
      Books.countDocuments({}, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  }
}

module.exports = new MongoBook()