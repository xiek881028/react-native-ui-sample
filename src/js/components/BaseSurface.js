import * as React from 'react';
import { Animated, StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import shadow from '../../css/shadow.js';
import { withTheme } from 'react-native-paper';

class Surface extends React.Component<Props> {
  render() {
    const { style, theme, ...rest } = this.props;
    const flattenedStyles = StyleSheet.flatten(style) || {};
    const { elevation } = flattenedStyles;

    return (
      <Animated.View
        {...rest}
        style={[
          { backgroundColor: theme.colors.surface },
          elevation && shadow(elevation),
          style,
        ]}
      />
    );
  }
}

export default withTheme(Surface);
