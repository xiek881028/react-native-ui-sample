// helper/storage在redux中的全局命名空间
const stateName = 'HELPER_STORAGE';

// 同时存入storage redux
async function setAll(key, data) {
  if(!data) {
    throw `调用setAll方法，data不能为undefined`
  }
  await STORAGE.save({
    key,
    data,
  });
  setRedux.call(this, key, data);
  return true;
}
// 存入storage
async function setStorage(key, data) {
  await STORAGE.save({
    key,
    data,
  });
  return true;
}
// 存入redux
async function setRedux(key, data) {
  if(!this.props || !this.props.dispatch) {
    throw '没找到dispatch方法，请使用call改变this指向';
  }
  let prevData = await getRedux.call(this, key);
  // 存入redux时与之前数据进行比较，完全一致则不操作，避免重复渲染
  if(prevData !== data) {
    this.props.dispatch({
      type: 'helper_storage_add',
      key,
      data,
    });
  }
  return true;
}
// 从storage中获取
async function getStorage(key) {
  let out;
  try {
    out = await STORAGE.load({key});
  } catch (error) {
    out = new Promise(resolve => resolve(undefined));
  }
  return out;
}
// 从redux中获取
async function getRedux(key) {
  if(!this.props || !this.props.dispatch) {
    throw '没找到dispatch方法，请使用call改变this指向';
  }else if(!this.props[stateName] || !this.props[stateName].data) {
    throw '页面没有监听相关属性，请在connect方法第一个参数中监听相关属性';
  }
  return new Promise(resolve => resolve(this.props[stateName].data[key]));
}
// 同步storage redux，默认将storage覆写redux。mode为true，将redux覆写storage
async function sync(key, mode=false) {
  let data = null;
  if(mode) {
    data = await getRedux.call(this, key);
  }else {
    data = await getStorage.call(this, key);
  }
  return setAll.call(this, key, data);
}
// 从storage中删除
async function rmStorage(key) {
  await STORAGE.remove({
    key,
  });
  return true;
}
// 从redux中删除
async function rmRedux(key) {
  if(!this.props || !this.props.dispatch) {
    throw '没找到dispatch方法，请使用call改变this指向';
  }
  this.props.dispatch({
    type: 'helper_storage_del',
    key,
  });
  return true;
}
// 从storage redux中删除
async function rmAll(key) {
  await rmStorage(key);
  return rmRedux.bind(this, key);
}

export default {
  setAll,
  setStorage,
  setRedux,
  getStorage,
  getRedux,
  sync,
  rmStorage,
  rmRedux,
  rmAll,
};
