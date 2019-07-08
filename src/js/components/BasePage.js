import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import hlpStorage from '../helper/storage.js';
import { connect } from 'react-redux';

class BasePage extends Component {
  constructor(props) {
    super(props);
  }

  // 登录权限判断
  async loginPermission(permission = undefined) {
    let loginToken = await hlpStorage.getStorage.call(this, 'loginToken');
    if(permission === true && !loginToken) {
      console.log(`未登录访问登录页面`);
    }else if(permission === false && loginToken) {
      console.log(`登录访问未登录页面`);
    }else {
      console.log(`--default--`);
    }
  }

  async componentWillMount() {
    await hlpStorage.setAll.call(this, 'loginToken', 'this is a test');
    await hlpStorage.setAll.call(this, 'deviceToken', 'this is a test B');
    // await hlpStorage.rmAll.call(this, 'loginToken');
    this.loginPermission(this.props.loginPermission);
  }

  async componentWillUpdate(nextProp, nextState) {
    // this.loginPermission(this.props.loginPermission);
  }

  render() {
    const { children } = this.props;
    return (
      <View
        {...this.props}
      >
        {children}
      </View>
    );
  }
}

const mapStateToProps = state => {
  // return state;
  return {
    HELPER_STORAGE: state.HELPER_STORAGE,
  };
}

export default connect(mapStateToProps)(BasePage);
