import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Button,
  Avatar,
} from 'react-native-paper';
import { connect } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';

import styleC from '../css/common.js';
import BasePage from '../js/components/BasePage.js';
import BaseButton from '../js/components/BaseButton.js';
import BaseIcon from '../js/components/BaseIcon.js';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: '主页',
  };
  render() {
    return (
      <BasePage
        loginPermission={true}
        style={style.box}
        onStartShouldSetResponder={e => {
          console.log(`~~onStartShouldSetResponder~~`);
          return true;
        }}
      >
        <Avatar.Image
          size={120}
          source={{ uri: 'http://static.bagazhu.com/images/logo/avatar_admin.png' }}
        />
        <Text style={style.text}>MADAO</Text>
        <BaseIcon name="aaa"/>
        <View style={styleC.btnBox}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.push('test2')}
            style={style.btn}
          >
            去底部导航页
          </Button>
          <Button
            mode="outlined"
            onPress={() => this.props.navigation.push('test3')}
            style={style.btn}
          >
            去抽屉导航页
          </Button>
          <BaseButton
            style={style.btnBox}
            // groupStyle={style.groupBox}
            // textStyle={style.btnFont}
            // disabledStyle={style.disabledStyle}
            // disabledGroupStyle={style.disabledStyle}
            // disabledTextStyle={style.disabledTextStyle}
            // rippleColor='dark'
            // shadow={true}
            // disabled={true}
          >
            <Feather name="folder"/>
            去底部导航页
            <Image
              style={style.image}
              source={{ uri: 'http://static.bagazhu.com/images/logo/avatar_admin.png' }}/>
            <Text>2</Text>
          </BaseButton>
        </View>
      </BasePage>
    );
  }
}

const setProps = (state) => {
  return {
  }
}

export default connect(setProps)(Home);

const style = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    paddingTop: 30,
  },
  text: {
    color: '#333',
    fontSize: 24,
    marginTop: 6,
    marginBottom: 30,
  },
  btn: {
    marginBottom: 20,
    minWidth: '90%',
  },
  image: {
    width: 20,
    height: 20,
  },
  btnFont: {
    fontSize: 16,
    color: '#c00',
  },
  btnBox: {
    backgroundColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
  },
  groupBox: {
    // backgroundColor: '#dda',
  },
  disabledStyle: {
    backgroundColor: '#333',
  },
  disabledTextStyle: {
    color: '#866',
  },
});
