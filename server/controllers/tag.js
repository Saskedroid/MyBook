const Tags = require('../models/tag.js');

class MongoTag {
  // 获取标签列表
  getTagsList() {
    return new Promise((resolve, reject) => {
      Tags.find((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
}

module.exports = new MongoTag()