import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import Feather from 'react-native-vector-icons/Feather';

//View
import home from '../views/home.js';
import page2 from '../views/page2.js';
import page3 from '../views/page3.js';
import page4 from '../views/page4.js';

// varCss
import varCss from '../css/var.js';

// 底部导航
const TabNavigator = createMaterialTopTabNavigator({
  page2: {
    screen: page2,
    navigationOptions: {
      tabBarLabel: '主页',
      tabBarIcon: ({ tintColor }) => (
        <Feather
          name="home"
          size={20}
          color={tintColor}
        />
      )
    },
  },
  page3: {
    screen: page3,
    navigationOptions: {
      tabBarLabel: '喜欢',
      tabBarIcon: ({ tintColor }) => (
        <Feather
          name="heart"
          size={20}
          color={tintColor}
        />
      )
    },
  },
  page4: {
    screen: page4,
    navigationOptions: {
      tabBarLabel: '用户中心',
      tabBarIcon: ({ tintColor }) => (
        <Feather
          name="user"
          size={20}
          color={tintColor}
        />
      )
    },
  },
}, {
    animationEnabled: false,
    lazy: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#f0edf6',
      inactiveTintColor: varCss.primaryActiveColor,
      style: {
        backgroundColor: varCss.primaryBg,
      },
      labelStyle: {
        padding: 0,
        margin: 0,
      },
      iconStyle: {
        padding: 0,
        margin: 0,
      },
      indicatorStyle: {
        height: 0,
      },
    },
  });

// 侧边栏
const DrawerNav = createDrawerNavigator({
  page2: { screen: page2 },
  page3: { screen: page3 },
  page4: { screen: page4 },
}, {
    initialRouteName: 'page2',
  });

// 整体路由控制
const AppNavigator = createStackNavigator({
  home: { screen: home },
  test2: {
    screen: TabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  test3: {
    screen: DrawerNav,
    navigationOptions: {
      header: null,
    },
  },
}, {
    initialRouteName: 'home',
    headerMode: 'float',
  });

export default createAppContainer(AppNavigator);
