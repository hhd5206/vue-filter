export const deepClone = (obj, hash = new WeakMap()) => {
  if (hash.has(obj)) {
    return obj;
  }
  let res = null;
  const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];

  if (reference.includes(obj?.constructor)) {
    res = new obj.constructor(obj);
  } else if (Array.isArray(obj)) {
    res = [];
    obj.forEach((e, i) => {
      res[i] = deepClone(e);
    });
  } else if (typeof obj === "object" && obj !== null) {
    hash.set(obj);
    res = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        res[key] = deepClone(obj[key], hash);
      }
    }
  } else {
    res = obj;
  }
  return res;
}

// 日期格式化
export const parseTime = (time, pattern) => {
  if (!time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.length === 29 ? time : time.replace(new RegExp(/-/gm), '/');
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })

  return time_str
}

const equalsIgnoreOrder = (arr1, arr2) => {
  if (arr1 === arr2) {
    return true
  }
  if (arr1.length !== arr2.length) {
    return false
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr1) {
    if (arr2.indexOf(item) === -1) {
      return false
    }
  }
  return true
}
export const isActivesEquals = (actives, lastActives) => {
  if (actives === lastActives) {
    return true;
  }
  const keys = Object.keys(actives);
  const lastKeys = Object.keys(lastActives);
  if (keys.length !== lastKeys.length) {
    return false;
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (lastActives.hasOwnProperty(key)) {
      const val = actives[key];
      const lastVal = lastActives[key];
      if (Array.isArray(val) && Array.isArray(lastVal)) {
        if (!equalsIgnoreOrder(val, lastVal)) {
          return false;
        }
      } else if (val !== lastVal) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}