import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
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
import BaseOverlay from '../js/components/BaseOverlay.js';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: '主页',
    headerRight: (
      <BaseOverlay
        fixedPoint={{right: 0, top: 60}}
        heightlightColor='#ededed'
      >
        <View slot="view" style={{height: 56, width: 56, alignItems: 'center', justifyContent: 'center'}}>
          <Feather name="more-vertical" size={20}/>
        </View>
        <View
          slot="modal"
          style={{backgroundColor: '#fff', width: 100}}
        >
          <FlatList
            data={[
              {key: 'a'},
              {key: 'b'},
              {key: 'c'},
              {key: 'd'},
              {key: 'b1'},
            ]}
            renderItem={({item}) => <Text>{item.key}</Text>}
          />
        </View>
      </BaseOverlay>
    ),
  };

  componentDidMount() {
    // this.refs.test.portalShow(true);
  }

  render() {
    return (
      <BasePage
        loginPermission={true}
        style={style.box}
      >
        <Avatar.Image
          size={120}
          source={{ uri: 'http://static.bagazhu.com/images/logo/avatar_admin.png' }}
        />
        <Text style={style.text}>MADAO</Text>
        <BaseOverlay
          // ref="test"
          // _onPanResponderGrant={(evt, gestureState) => {
          //   console.log(`~~~evt~~~~`, evt);
          //   console.log(`~~~gestureState~~~~`, gestureState);
          // }}
          // fixedPoint={{x: 20, y: 20}}
        >
          <View
            style={style.overlay}
            slot="view"
          >
            <Text>居然没有事件顺序触发！！！</Text>
          </View>
          <View
            slot="modal"
            style={style.modalView}
          >
            <FlatList
              data={[
                {key: 'a'},
                {key: 'b'},
                {key: 'c'},
                {key: 'd'},
                {key: 'b1'},
              ]}
              renderItem={({item}) => <Text>{item.key}</Text>}
            />
          </View>
        </BaseOverlay>
        <View style={styleC.btnBox}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.push('test2')}
            style={style.btn}
          >
            <Image
              style={style.image}
              source={{ uri: 'http://static.bagazhu.com/images/logo/avatar_admin.png' }}/>
            <Text>去底部导航页</Text>
            {/* <BaseIcon name="icon-jinggaoicon" type="symbol" size={28}/> */}
            <Text>2</Text>
          </Button>
          <Button
            mode="outlined"
            onPress={() => this.props.navigation.push('test3')}
            style={style.btn}
            onPressIn={() => console.log(`~~~onPressIn~~~`)}
          >
            去抽屉导航页
          </Button>
          <BaseButton
            style={style.btnBox}
            onPressIn={(a, b, c, d) => {
              console.log(`a: ${a},  b: ${b},  c: ${c},  d: ${d}`);
              console.log(`~~~onPressIn~~~`);
            }}
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
            <BaseIcon name="icon-jinggaoicon" type="symbol" size={28}/>
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
  overlay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    minWidth: 64,
    maxWidth: 200,
    marginTop: 20,
    borderStyle: 'solid',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#333',
    backgroundColor: '#4cb4e7',
  },
  modalView: {
    backgroundColor: '#c00',
    width: 100,
  },
});
