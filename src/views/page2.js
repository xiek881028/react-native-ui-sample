import React, { Component } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  View,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import {
  Button,
  Card,
} from 'react-native-paper';

import styleC from '../css/common.js';
import BasePage from '../js/components/BasePage.js';

class Page2 extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: 'page2',
  };
  render() {
    return (
      <BasePage style={style.box}>
        <Card style={style.cardBox}>
          <Card.Cover source={require('../images/demo_1.jpg')} />
          <Card.Title
            title="标题"
            subtitle="副标题"
          />
        </Card>
        <View style={styleC.btnBox}>
          <Button
            mode="contained"
            onPress={() => this.props.navigation.pop()}
          >
            回到主页
          </Button>
        </View>
      </BasePage>
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
    color: '#c00',
    fontSize: 24,
  },
  cardBox: {
    width: '90%',
    marginBottom: 10,
    marginTop: 10,
  },
});
