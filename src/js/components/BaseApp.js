import React, { Component } from 'react';
// 路由
import Nav from '../../config/routers.js';

// redux相关
import { Provider as StoreProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from '../redux';
import hlpStorage from '../helper/storage.js';
// 硬件信息
import DeviceInfo from 'react-native-device-info';
const logger = createLogger();
const store = createStore(
  reducer,
  applyMiddleware(thunk, logger),
);

// paper-ui框架
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// ui自定义主题
import caihTheme from '../../css/theme.js';

// 暂时用比较low的方法的解决无法深拷贝问题
const theme = {
  ...DefaultTheme,
  ...caihTheme,
  colors: {...DefaultTheme.colors, ...caihTheme.colors},
  fonts: {...DefaultTheme.fonts, ...caihTheme.fonts},
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      color: null,
    };
  }

  async componentWillMount() {
    // 这里无法调用hlpStorage中有关redux的操作，如要存入redux，请直接使用store
    // 将设备唯一识别码写入storage
    let uniqueID = await hlpStorage.getStorage('uniqueID');
    if(!uniqueID) {
      await hlpStorage.setStorage('uniqueID', DeviceInfo.getUniqueID());
    }
  }

  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <Nav/>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
