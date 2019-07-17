const Cors = require('koa-cors');

const MongoTag = require('../controllers/tag.js');

exports.getTagsList = async (ctx) => {
  await Cors();
  let listData = await MongoTag.getTagsList()
  .then(data => { 
    return data;
  })
  .catch(err => { 
    return {};
  });
  ctx.response.body = { 
    success: true,
    result: listData,
  };
}