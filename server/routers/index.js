const Router = require('koa-router');

const UserRouter = require('./user.js');
const BookRouter = require('./book.js');
const TagRouter = require('./tag.js');

const LOGIN = '/login'
const GET_BOOKS_LIST = '/getBooksList'
const GET_BOOK_DETAIL = '/getBookDetail'
const ADD_BOOK = '/addBook'
const EDIT_BOOK = '/editBook'
const DELETE_BOOK = '/deleteBook'
const REPORT_TOTAL = '/report/total'
const GET_TAGS_LIST = '/getTagsList'

let router = new Router();

// 登录
router.post(LOGIN, UserRouter.login);
// 获取图书列表
router.get(GET_BOOKS_LIST, BookRouter.getBooksList);
// 获取图书详情
router.get(GET_BOOK_DETAIL, BookRouter.getBookDetail);
// 新增图书
router.post(ADD_BOOK, BookRouter.addBook);
// 统计书籍总数
router.get(REPORT_TOTAL, BookRouter.getAllCount);
// 获取标签列表
router.get(GET_TAGS_LIST, TagRouter.getTagsList);

module.exports = router