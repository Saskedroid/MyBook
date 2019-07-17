const Router = require('koa-router');

const UserRouter = require('./user.js');
const BookRouter = require('./book.js');
const TagRouter = require('./tag.js');

let router = new Router();

router.post('/login', UserRouter.login);

router.get('/getBooksList', BookRouter.getBooksList);
router.get('/getBookDetail', BookRouter.getBookDetail);
router.post('/addBook', BookRouter.addBook);
router.get('/report/total', BookRouter.getAllCount);

router.get('/getTagsList', TagRouter.getTagsList);

module.exports = router