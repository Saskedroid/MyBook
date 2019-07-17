import { getRequest, postRequest } from './request'
import storage from './storage'

const LOGIN = '/login'
const GET_BOOKS_LIST = '/getBooksList'
const GET_BOOK_DETAIL = '/getBookDetail'
const ADD_BOOK = '/addBook'
const REPORT_TOTAL = '/report/total'
const GET_TAGS_LIST = '/getTagsList'

// 以下api请求
export const fetch = {
  // 登录
  apiLogin: function(username, password, callback) {
    let data = {
      username: username,
      password: password
    }
    postRequest(LOGIN, data, callback)
  },
  // 图书列表
  apiGetBooksList: function(index, offset, callback) {
    let data = {
      index: ((index - 1) * offset),
      offset: offset
    }
    getRequest(GET_BOOKS_LIST, data, callback)
  },
  // 图书详情
  apiGetBookDetail: function(id, callback) {
    let data = {
      id: id
    }
    getRequest(GET_BOOK_DETAIL, data, callback)
  },
  // 添加图书
  apiAddBook: function(title, origin_title, isbn, author, translator, publisher, pubdate, category, tags, series, binding, pages, price, memo, summary, callback) {
    let data = {
      title: title,
      origin_title: origin_title,
      isbn: isbn,
      author: author,
      translator: translator,
      publisher: publisher,
      pubdate: pubdate,
      category: category,
      tags: tags,
      series: series,
      binding: binding,
      pages: pages,
      price: price,
      memo: memo,
      summary: summary
    }
    postRequest(ADD_BOOK, data, callback)
  },
  // 数据统计
  apiReportTotal: function(callback) {
    let data = {}
    getRequest(REPORT_TOTAL, data, callback)
  },
  // 标签列表
  apiGetTagsList: function(callback) {
    let data = {}
    getRequestOrStorage(GET_TAGS_LIST, data, callback)
  }
}

// 处理会话数据存储
var getRequestOrStorage = function(key, data, callback) {
  let localData = storage.get(key);
  if (!!localData) {
    return callback(true, localData);
  } else {
    getRequest(key, data, (success, rsp) => {
      if (success) {
        storage.set(key, rsp);
      }
      return callback(success, rsp);
    })
  }
}