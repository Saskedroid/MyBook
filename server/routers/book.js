const Cors = require('koa-cors');

const MongoBook = require('../controllers/book.js');

exports.getBooksList = async (ctx) => {
  await Cors();
  let params = ctx.request.query;
  let count = await MongoBook.getAllCount()
    .then(data => {
      return data;
    })
    .catch(err => {
      return 0;
    });
  let listData = await MongoBook.getBooksList(params.index, params.offset)
    .then(data => {
      return data;
    })
    .catch(err => {
      return {};
    });
  ctx.response.body = {
    success: true,
    result: {
      list: listData,
      totalRecord: count,
    },
  };
};

exports.getBookDetail = async (ctx) => {
  await Cors();
  let params = ctx.request.query;
  let data = await MongoBook.getBookDetail(params.id).then(data => { return data }).catch(err => { return {} });
  ctx.response.body = { success: true, result: data };
};

exports.getAllCount = async (ctx) => {
  await Cors();
  let count = await MongoBook.getAllCount().then(data => { return data }).catch(err => { return 0 });
  ctx.response.body = { success: true, result: { "name": "总数", "value": count } };
};

exports.addBook = async (ctx) => {
  await Cors();
  let data = {
    title: ctx.request.body.title || '',
    origin_title: ctx.request.body.origin_title || '',
    isbn: ctx.request.body.isbn || '',
    auhtor: ctx.request.body.author || '',
    translator: ctx.request.body.translator || '',
    publisher: ctx.request.body.publisher || '',
    pubdate: ctx.request.body.pubdate || '',
    category: ctx.request.body.category || '',
    tags: ctx.request.body.tags || '',
    series: ctx.request.body.series || '',
    binding: ctx.request.body.binding || '',
    pages: ctx.request.body.pages || '',
    price: ctx.request.body.price || '',
    memo: ctx.request.body.memo || '',
    summary: ctx.request.body.summary || '',
  }
  ctx.response.body = await MongoBook.addBook(data).then(data => {
    return { success: true, result: "保存成功" };
  }).catch(err => {
    return { success: false, result: "保存失败" };
  });
};