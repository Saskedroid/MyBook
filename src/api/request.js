import axios from 'axios'
import qs from 'qs'
import { util } from './util';

// axios 实例
var mAxios = axios.create({
  baseURL: util.BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  },
  withCredentials: true
})

// request 拦截器
mAxios.interceptors.request.use(
  config => {
    config.method == 'get'? config.data = JSON.stringify(config.data) : config.data = qs.stringify(config.data)
    return config;
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
mAxios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 基础get请求
 * @param url
 * @param params
 * @returns {Promise}
 */
const baseGet = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    mAxios.get(url, {
      params: params
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}

/**
 * 基础post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const basePost = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    mAxios.post(url, data)
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error)
    })
  })
}

// 封装GET请求
export function getRequest(url, params, callback) {
  baseGet(url, processParams(params))
  .then(data => {
    console.log("GET请求成功：" + JSON.stringify(data))
    if (data.success == true) {
      return callback(true, data.result ? data.result : {})
    }
    return codeValidate(data.result, callback)
  })
  .catch(error => {
    console.log("GET请求失败：" + error)
    return errorValidate(error, callback)
  })
}

// 封装POST请求
export function postRequest(url, params, callback) {
  basePost(url, processParams(params))
  .then(data => {
    console.log("POST请求成功：" + JSON.stringify(data))
    if (data.success == true) {
      return callback(true, data.result ? data.result : {})
    }
    return codeValidate(data.result, callback)
  })
  .catch(error => {
    console.log("POST请求失败：" + error)
    return errorValidate(error, callback)
  })
}

// 过滤参数(param)值(value)为空的键(key)
const processParams = (oldData) => {
  let newData = {};
  for (var attr in oldData) {
    if (oldData[attr] !== null && oldData[attr] !== undefined && oldData[attr] !== "") {
      newData[attr] = oldData[attr];
    }
  }
  return newData
}

// 错误码处理（暂未定义）
const codeValidate = (error, callback) => {
  switch (error.errorCode) {
    default:
      return callback(false, error.errorMessage)
  }
}

// 错误处理
const errorValidate = (error, callback) => {
  if (error.response) {
    if (error.response.data) {
      if (error.response.data.result) {
        return callback(false, `[${error.response.status}] ${error.response.data.result.errorCode}: ${error.response.data.result.errorMessage}`)
      }
      return callback(false, `[${error.response.status}] 请求失败`)
    }
    return callback(false, `[${error.response.status}] 请求无结果`)
  }
  return callback(false, "请求未响应")
}