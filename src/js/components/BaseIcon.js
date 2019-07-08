import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import svgUri from 'react-native-svg-uri';
import iconfontData from '../../icons/iconfont/iconfont.json';

class BaseIcon extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
  }

  render() {
    return (
      // <Text
      //   style={[
      //     style.icon,
      //     ...this.props,
      //   ]}
      // >
      //   {this.props.name}
      // </Text>
      <svgUri
        svgXmlData=
      />
    );
  }
}

export default withTheme(BaseIcon);

const style = StyleSheet.create({
  icon: {
    fontFamily: 'iconfont',
  },
});
