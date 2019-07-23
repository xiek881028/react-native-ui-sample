import React, { Component, Children } from 'react';
import {
  View,
} from 'react-native';

class BaseLayout extends Component {
  constructor(props) {
    super(props);
  }

  renderChildren() {
    const { children } = this.props;
    return [...children].sort((a, b) => {
      if(!a.props || !b.props) {
        console.error('BaseLayout排序必须要有prop');
      }
      let aIndex = isNaN(+a.props.slot) ? undefined : +a.props.slot;
      let bIndex = isNaN(+b.props.slot) ? undefined : +b.props.slot;
      if(aIndex == undefined && bIndex == undefined) {
        return 0;
      } else if(aIndex == undefined) {
        return 1;
      } else if(bIndex == undefined) {
        return -1;
      } else {
        return (+aIndex) - (+bIndex);
      }
    });
  }

  render() {
    return (
      <View
        {...this.props}
      >
        {this.renderChildren()}
      </View>
    );
  }
}

export default BaseLayout;
