import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
// 如果android生产打包图标展示异常，将shell/svg2xml.js中生成的json文件改为生成js
import iconfontSymbolData from '../../icons/iconfont/iconfont_symbol.json';
import UnicodeIcon from '../../config/iconfont.js';

/*
  组件主要为支持使用阿里iconfont
  入参：
    name（必传）：图标名称，不带'.'不带'#'
    type：不传默认为font class模式，传symbol则为Symbol模式
    size：字体图标大小，组件默认图标大小为16
  注意：
    font class模式下，继承组件react-native-vector-icons下所有设置
    目前组件中图标无法在UI库react-native-paper的默认组件下使用
*/

class BaseIcon extends Component {
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
  }

  state = {
    defaultSize: 16,
  };

  render() {
    const { name, type, size, ...rest } = this.props;
    let svgXmlData = iconfontSymbolData[name];
    if(!svgXmlData && type == 'symbol') {
      console.warn('没有找到对应的symbol图标');
      throw new Error('没有找到对应的symbol图标');
    }
    return (
      type == 'symbol' ?
      <SvgUri
        width={+size || +this.state.defaultSize}
        height={+size || +this.state.defaultSize}
        svgXmlData={svgXmlData}
        {...rest}
      />
      :
      <UnicodeIcon
        name={name}
        size={+this.state.defaultSize}
        {...rest}
      />
    );
  }
}

export default BaseIcon;

const style = StyleSheet.create({
  icon: {
    fontFamily: 'iconfont',
  },
});
