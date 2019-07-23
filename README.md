## 插件安装

### 图标相关

安装步骤参照官方文档
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 一款封装了多个开源图标库的RN组件
- [react-native-svg](https://github.com/react-native-community/react-native-svg) RN支持SVG图标组件
- [react-native-svg-uri](https://github.com/vault-development/react-native-svg-uri) RN支持SVG图标uri形式引入组件，依赖于react-native-svg

### 存储相关
- [@react-native-community/async-storage](https://www.npmjs.com/package/@react-native-community/async-storage) RN的持久存储插件
- [react-native-storage](https://www.npmjs.com/package/react-native-storage) 基于`@react-native-community/async-storage`二次封装的本地存储插件

### 设备信息
- [react-native-device-info](https://www.npmjs.com/package/react-native-device-info) 用于获取常见硬件信息

### 路由管理
- [react-native-gesture-handler](https://www.npmjs.com/package/react-native-gesture-handler) RN手势控制插件，react-navigation依赖项
- [react-navigation](https://reactnavigation.org/zh-Hans/) RN官方推荐路由管理插件

### redux相关
- [redux](https://www.redux.org.cn/) JS状态管理器，类似vuex
- [redux-logger](https://www.npmjs.com/package/redux-logger) redux日志展示插件
- [redux-thunk](https://www.npmjs.com/package/redux-thunk) redux中间件，为了支持redux的ajax异步处理

### UI相关
- [react-native-paper](https://callstack.github.io/react-native-paper/index.html) 一套RN的开源UI组件库，基于google标准
- [color](https://www.npmjs.com/package/color) JS处理转换色值插件

## 项目初始化

```
// 安装插件，尽量不要使用npm，容易报错
yarn install

// link相关RN组件
react-native link react-native-vector-icons
react-native link react-native-svg
react-native link @react-native-community/async-storage
react-native link react-native-device-info
react-native link react-native-gesture-handler

// 如果项目使用了阿里图标库iconfont，在初始化以及每次更新图标库时都需要运行以下命令，同时重启RN(因为原生端需要重载字体资源，不重启RN会看不到图标)
npm run iconfont
```

## 采坑记录
1. Attempted to transition from state \`RESPONDER_INACTIVE_PRESS_IN\` to \`RESPONDER_ACTIVE_LONG_PRESS_IN\`, which is not supported. This is most likely due to \`Touchable.longPressDelayTimeout\` not being cancelled.
> 原因是chrome调试时间与手机时间不一致导致，解决方案是同步PC与手机时间，误差越小报错频率越低。一般误差低于1s即不影响开发。具体详见[github](https://github.com/facebook/react-native/issues/11989#issuecomment-314111441)
2. redux会在每次dispatch时重渲染，需要手动做优化处理
3. 安装时不要使用`npm`或`cnpm`，使用`yarn`，否则项目运行时会有诸多问题
4. android编译失败有时是缓存引起的。可以删除`android/app/build`文件夹下所有内容重新运行
5. css编写不支持多选择器、父子选择器等，注意组件内css命名唯一。css属性采用小驼峰的命名方式，请注意
