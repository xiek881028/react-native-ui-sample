import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import {
  ActivityIndicator,
  Button,
  Portal,
  Title,
} from 'react-native-paper';
import axios from '../config/http.js';

import styleC from '../css/common.js';

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
      modalIsShow: false,
      ajaxText: '',
    };
  }
  static navigationOptions = {
    title: 'page4',
  };
  async btnAjax() {
    let res;
    this.setState({
      btnLoading: true,
      ajaxText: 'ajax请求中',
    });
    try {
      res = await axios.get('http://web.bagazhu.com/api/user/info');
    } catch (error) {
      res = error.response;
    }
    this.setState({
      ajaxText: `${res.status}：${res.message}`,
      btnLoading: false,
    });
  }
  async modalAjax() {
    let res;
    this.setState({
      modalIsShow: true,
    });
    try {
      res = await axios.get('http://api.music.bagazhu.com/wy/list?key=%E5%90%8E%E6%9D%A5&page=1&limit=20');
    } catch (error) {
      res = error.response;
    }
    this.setState({
      ajaxText: `${res.status}：${res.message}`,
      modalIsShow: false,
    });
  }
  render() {
    return (
      <View style={style.box}>
        <Title>{this.state.ajaxText}</Title>
        <View style={styleC.btnBox}>
          <Button
            mode="contained"
            loading={this.state.btnLoading}
            onPress={this.btnAjax.bind(this)}
            style={style.btn}
          >
            按钮loading
          </Button>
          <Button
            mode="outlined"
            onPress={this.modalAjax.bind(this)}
            style={style.btn}
          >
            弹窗loading
          </Button>
          <Button
            style={style.btn}
            mode="text"
            onPress={() => this.props.navigation.pop()}
          >
            回到主页
          </Button>
        </View>
        {this.state.modalIsShow ? (<Portal>
          <View style={style.modal}>
            <ActivityIndicator
              animating={true}
              size={36}
            />
            <Text style={style.modalText}>假装自己在发ajax...</Text>
          </View>
        </Portal>) : null}
      </View>
    );
  }
}

const setProps = (state) => {
	return {
		test_index: state.AccountList,
	}
}

export default connect(setProps)(Page2);

const style = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#dad',
    fontSize: 24,
  },
  btn: {
    marginBottom: 20,
    minWidth: '90%',
  },
  modal: {
    backgroundColor: '#333',
    opacity: .9,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
  },
});
