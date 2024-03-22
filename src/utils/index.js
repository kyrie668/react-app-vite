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
