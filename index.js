import {
  AppRegistry,
  Platform,
  YellowBox,
} from 'react-native';
import { name as appName } from './app.json';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';
import App from './src/js/components/BaseApp.js';

// 生产环境不输出日志
if (!__DEV__) {
  global.console = {
    info() { },
    log() { },
    warn() { },
    debug() { },
    error() { },
  };
}

global.STORAGE = new Storage({
  // 最大容量，默认值1000条数据循环存储
  // size: 1000,
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,
  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: null,
  // 读写时在内存中缓存数据。默认启用。
  // enableCache: true,
});
global.APP_NAME = appName;
global.OS = Platform.OS;
global.ENV = process.env.NODE_ENV;

// 忽略错误
// ViewPagerAndroid has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-community/viewpager' instead of 'react-native'
YellowBox.ignoreWarnings(['Warning: ViewPagerAndroid has been extracted']);

AppRegistry.registerComponent(appName, () => App);
