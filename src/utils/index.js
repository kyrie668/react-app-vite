import axios from "axios";

/**
 * @description 函数防抖
 * @param func 需要进行防抖的函数
 * @param delay 时间间隔
 * @returns
 */
export const debounce = (func, delay) => {
  let timer;

  return function (...args) {
    // 如果存在定时器，则清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 创建一个新的定时器
    timer = setTimeout(() => {
      // 执行被防抖的函数，并绑定正确的 this 上下文
      func.apply(this, args);
    }, delay);
  };
};

/**
 * @description 函数节流
 * @param func 需要进行节流的函数
 * @param delay 时间间隔
 * @returns
 */
export const throttle = (func, delay) => {
  let timer;
  let lastExecTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecTime;

    if (!timer || elapsedTime >= delay) {
      // 如果没有定时器或者已经过了节流时间，则执行函数
      func.apply(this, args);
      lastExecTime = currentTime;
    } else {
      // 如果还在节流时间内，则清除之前的定时器并重新设置定时器
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
        lastExecTime = Date.now();
      }, delay - elapsedTime);
    }
  };
};

// 超时时间是5秒
axios.defaults.timeout = 5000;
// 允许跨域
axios.defaults.withCredentials = true;
// Content-Type 响应头
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";
// 基础url
// axios.defaults.baseURL = 后台接口地址;
// 添加公共前缀 方便在vite.config.js配置接口代理地址
axios.defaults.baseURL = "api";

/**
 * 封装get方法
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then((response) => {
        console.log("response", response);
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 封装post方法
 */
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers: {
          // "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 配置请求拦截器
 */
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么（通常是设置 headers或者检查用户登录状态）
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

/**
 * 配置响应拦截器
 */

axios.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么（通常是对状态码例如401跳转至首页）
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
