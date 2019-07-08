import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  Searchbar,
  Snackbar,
} from 'react-native-paper';

import styleC from '../css/common.js';

class Page2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVal: '',
      alertShow: false,
    };
  }
  static navigationOptions = {
    title: 'page3',
  };
  render() {
    return (
      <View style={style.box}>
        <Searchbar
          style={style.searchBox}
          placeholder="搜索"
          onChangeText={query => { this.setState({ searchVal: query }) }}
          value={this.state.searchVal}
        />
        <View style={styleC.btnBox}>
          <Button
            style={style.btn}
            mode="outlined"
            onPress={() => this.setState({ alertShow: true })}
          >
            alert提示
          </Button>
          <Button
            style={style.btn}
            mode="contained"
            onPress={() => this.props.navigation.pop()}
          >
            回到主页
          </Button>
        </View>
        <Snackbar
          visible={this.state.alertShow}
          onDismiss={() => this.setState({ alertShow: false })}
          action={{
            label: '知道了',
            onPress: () => this.setState({ alertShow: false }),
          }}
        >
          这里是一些提示
        </Snackbar>
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
    justifyContent: 'space-around',
  },
  text: {
    color: '#add',
    fontSize: 24,
  },
  searchBox: {
    maxWidth: '90%',
    marginBottom: 20,
  },
  btn: {
    marginBottom: 20,
  },
});
