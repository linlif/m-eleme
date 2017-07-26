// 通用localStorage 存数据方法
export function saveToLocal (id, key, value) {
  if (!window.localStorage) {
    return false;
  } else {
    let store = window.localStorage.__store__;
    if (!store) {
      // 如果store不存在，先创建
      store = {};
      store[id] = {};
    } else {
      store = JSON.parse(store);
      if (!store[id]) {
        store[id] = {};
      }
    }
    store[id][key] = value;
    localStorage.__store__ = JSON.stringify(store);
  }
}

// 取数据方法
export function loadFormLocal (id, key, def) {
  if (!window.localStorage) {
    return false;
  } else {
    let store = window.localStorage.__store__;
    if (!store) {
      return def;
    }
    store = JSON.parse(store)[id];
    if (!store) {
      return def;
    }
    let ret = store[key];
    return ret || def;
  }
};
