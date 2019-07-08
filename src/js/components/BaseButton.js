import React, { Component, Children } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from 'react-native';
import {
  withTheme,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import color from 'color';

/*
  继承TouchableWithoutFeedback所有设置
  groupStyle：按钮有多个元素时包裹view层样式，继承view style(尽量不要在这一层加背景，否则会影响按键的涟漪效果)
  textStyle：按钮文本样式，继承text style
  disabledStyle：禁用按钮时TouchableWithoutFeedback的样式，继承view style
  disabledGroupStyle：按钮有多个元素时禁用的样式，继承view style
  disabledTextStyle：禁用按钮时文本样式，继承text style
  rippleColor：安卓下涟漪的颜色，dark为深色，tint为浅色，也可以直接为'#色值'
*/

class BasePage extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
  }

  state = {
    elevation: new Animated.Value(2),
  };


  _handlePressIn = () => {
    Animated.timing(this.state.elevation, {
      toValue: 8,
      duration: 200,
    }).start();
  };

  _handlePressOut = () => {
    Animated.timing(this.state.elevation, {
      toValue: 2,
      duration: 150,
    }).start();
  };

  renderChildren() {
    const { children, theme } = this.props;
    let outChildren = [];

    const textStyle = [
      style.text,
      { color: theme.colors.surface },
      ...theme.fonts.medium,
      this.props.disabled ? this.props.disabledTextStyle : '',
      this.props.textStyle,
    ];
    const groupStyle = [
      style.group,
      this.props.disabled ? this.props.disabledGroupStyle : '',
      this.props.groupStyle,
    ];
    Children.forEach(children, child => {
      // 如果不是react节点，加上text标签
      if (!React.isValidElement(child)) {
        outChildren.push(
          <Text style={textStyle} key={outChildren.length}>{child}</Text>
        );
      } else {
        outChildren.push(child);
      }
    });
    if (outChildren.length > 1) {
      return <View style={groupStyle}>{outChildren}</View>
    } else {
      return outChildren;
    }
  }

  render() {
    const { theme, rippleColor, shadow, ...rest } = this.props;
    let _rippleColor = null;
    if (rippleColor == 'dark') {
      _rippleColor = color('#000')
        .alpha(0.2)
        .rgb()
        .string();
    } else if (rippleColor == 'tint') {
      _rippleColor = color('#fff')
        .alpha(0.32)
        .rgb()
        .string();
    } else if (!rippleColor) {
      _rippleColor = theme.colors.primary;
    } else {
      _rippleColor = rippleColor;
    }
    const btnStyle = [
      style.button,
      { backgroundColor: theme.colors.primary, borderRadius: theme.roundness },
      this.props.disabled ? this.props.disabledStyle : '',
      this.props.style,
    ];
    const elevation = this.props.disabled || !shadow ? 0 : this.state.elevation;
    // 防止外层样式污染内层
    let _touchProp = {...this.props};
    delete _touchProp.style;
    return (
      <Surface
        {...rest}
        style={[
          { elevation },
          btnStyle,
        ]}
      >
        <TouchableRipple
          {..._touchProp}
          borderless
          accessibilityTraits='button'
          accessibilityComponentType='button'
          accessibilityRole='button'
          accessibilityStates={undefined}
          onPress={() => {
            _touchProp.onPress && _touchProp.onPress();
          }}
          onPressIn={() => {
            this._handlePressIn();
            _touchProp.onPressIn && _touchProp.onPressIn();
          }}
          onPressOut={() => {
            this._handlePressOut();
            _touchProp.onPressOut && _touchProp.onPressOut();
          }}
          rippleColor={_rippleColor}
        >
          {this.renderChildren()}
        </TouchableRipple>
      </Surface>
    );
  }
}

export default withTheme(BasePage);

const style = StyleSheet.create({
  button: {
    minWidth: 64,
    borderStyle: 'solid',
  },
  text: {
    textAlign: 'center',
    letterSpacing: 1,
    marginVertical: 9,
    marginHorizontal: 16,
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
