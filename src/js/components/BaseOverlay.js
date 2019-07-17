import React, { Component, Children, cloneElement } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  UIManager,
  Animated,
} from 'react-native';
import color from 'color';

/*
  因为RN对于手势响应的限制，children不支持其他监听了手势的组件，否则将无法监听手势
  暴露方法portalShow，父级通过refs调用，手动控制蒙层显示隐藏，非特殊情况不建议直接调用
  props:
    fn beforeTouchStart 按下时视觉反馈处理前调用
    fn afterTouchStart 按下时视觉反馈处理后调用
    boolom disabledHeightlight 是否使用默认视觉反馈处理
    fn renderHeightlight 自定义视觉反馈效果，return一个react组件。组件将在按下时渲染，放开时隐藏
    color heightlightColor 自定义高亮时的色值
    fn beforeTouchEnd 放开时蒙层显示前调用
    fn afterTouchEnd 放开时蒙层显示后调用
    object modalCss 蒙层的样式
    number delayed 蒙层显示延时时间
    object fixedPoint 不使用计算偏移，固定显示位置，值为偏移量top、left、right、bottom，例如{top: 0, left: 0}
*/

class BaseOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      active: false,
      delayed: props.delayed ? props.delayed : 0,
      modalOffset: {x: 0, y: 0},
      switch: true, // 触摸在元素以外标识,true为触摸在元素内，false为触摸在元素外
      fadeAnim: new Animated.ValueXY(),
      opacityAnim: new Animated.Value(0.001),
      duration: 1,
    };
  }

  // 是否显示蒙层
  portalShow(bool = true) {
    if(bool) {
      this.setState({
        isShow: bool,
      });
      Animated.parallel([
        Animated.timing(this.state.fadeAnim, {
          toValue: {x: 1, y: 1},
          duration: this.state.duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.opacityAnim, {
          toValue: 1,
          duration: this.state.duration,
          useNativeDriver: true,
        }),
      ]).start();
    }else {
      Animated.parallel([
        Animated.timing(this.state.fadeAnim, {
          toValue: {x: 0, y: 0},
          duration: this.state.duration,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.opacityAnim, {
          toValue: 0.001,
          duration: this.state.duration,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({
          isShow: bool,
        });
      });
    }
  }

  // 计算蒙层显示偏移量
  setModalOffset(x, y) {
    this.setState({
      modalOffset: {
        x,
        y,
      },
    });
  }

  getmodalLayout(event) {
    this.modalLayout = event.nativeEvent.layout;
    if(this.props.fixedPoint) return;
    let {width, height} = event.nativeEvent.layout;
    let {x, y} = this.touchPoint;
    let {x: x0, y: y0} = this.state.modalOffset;
    let {width: winWidth, height: winHeight} = Dimensions.get('window');
    let outX;
    let outY;
    if(x > winWidth / 2 && y > winHeight / 2) {
      // console.log(`右下`);
      outX = x - width;
      outY = y - height;
    } else if(x > winWidth / 2 && y < winHeight / 2) {
      // console.log(`右上`);
      outX = x - width;
      outY = y;
    } else if(x < winWidth / 2 && y > winHeight / 2) {
      // console.log(`左下`);
      outX = x;
      outY = y - height;
    } else if(x < winWidth / 2 && y < winHeight / 2) {
      // console.log(`左上`);
      outX = x;
      outY = y;
    }
    // 对比上次渲染坐标，不一致才重渲染，减少无谓渲染消耗
    if(outX != x0 || outY != y0){
      this.setModalOffset(outX, outY);
    }
  }

  // 获取点击元素的宽高及绝对位置
  getTouchLayout(event) {
    UIManager.measure(event.target, (x, y, width, height, left, top) => {
      this.touchLayout = {
        height,
        width,
        left,
        top,
      };
    });
  }

  async componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // 开始响应
      onPanResponderGrant: (evt, gestureState) => {
        this.props.beforeTouchStart && this.props.beforeTouchStart(evt, gestureState);
        this.setState({
          active: true,
          switch: true,
        });
        // 如果有延时，则在按下延时时间到达时显示蒙层
        if(this.state.delayed) {
          this.timer = setTimeout(() => {
            this.touchPoint = {
              x: gestureState.x0,
              y: gestureState.y0,
            };
            this.portalShow(true);
          }, this.state.delayed);
        }
        this.props.afterTouchStart && this.props.afterTouchStart(evt, gestureState);
      },
      // 手势移动时反复触发，禁止在此放定时器或耗时运算！
      onPanResponderMove: (evt, gestureState) => {
        let {width, height, top, left} = this.touchLayout;
        let {pageX, pageY} = evt.nativeEvent;
        // 判断移动时手势是否在触发元素内
        if(pageX > left && pageX < left + width && pageY > top && pageY < top + height) {
          this.setState({
            active: true,
            switch: true,
          });
        } else {
          this.setState({
            active: false,
            switch: false,
          });
        }
      },
      // 结束响应
      onPanResponderRelease: (evt, gestureState) => {
        if(!this.state.switch) return;
        this.props.beforeTouchEnd && this.props.beforeTouchEnd(evt, gestureState);
        if(this.state.delayed) {
          clearTimeout(this.timer);
        }else {
          this.touchPoint = {
            x: gestureState.x0,
            y: gestureState.y0,
          };
          this.portalShow(true);
        }
        this.setState({
          active: false,
        });
        this.props.afterTouchEnd && this.props.afterTouchEnd(evt, gestureState);
      },
    });
  }

  render() {
    const { children, ...rest } = this.props;
    let {fadeAnim, opacityAnim} = this.state;
    let viewChildren = [];
    let modalChidren = [];
    Children.forEach(children, (item, index) => {
      if(item.props.slot == 'modal') {
        modalChidren.push(item);
      }else {
        let activeItem = null;
        // 响应视觉反馈处理
        if(this.props.disabledHeightlight) {
          if(this.props.renderHeightlight) {
            activeItem = this.props.renderHeightlight();
          }
        }else{
          let heightlightColor = this.props.heightlightColor;
          let _color = color(heightlightColor ? heightlightColor : item.props.style && item.props.style.backgroundColor ? item.props.style.backgroundColor : '#000').darken(heightlightColor ? 0 : .2).fade(.5).rgb().string();
          activeItem = this.state.active ? <View style={[style.active, {backgroundColor: _color}]} key={index}></View> : null;
        }
        // 复制view子主键，同时插入一个active view，用于实现按下视觉反馈效果
        viewChildren.push(cloneElement(item, {key: index}, [...Children.toArray(item.props.children), activeItem]));
      }
    });
    let {x, y} = this.props.fixedPoint ? {} : this.state.modalOffset;
    return (
      <View
        style={style.box}
        {...this._panResponder.panHandlers}
        {...rest}
        onLayout={this.getTouchLayout.bind(this)}
      >
        {viewChildren}
        <Modal
          transparent={true}
          visible={this.state.isShow}
          onRequestClose={() => this.portalShow(false)}
        >
          <View
            style={style.modalEventBox}
          >
            <TouchableWithoutFeedback
              onPress={() => this.portalShow(false)}
            >
              <View
                style={style.ghostBox}
              ></View>
            </TouchableWithoutFeedback>
            <Animated.View
              style={[style.modalBox, this.props.modalCss, {scaleX: fadeAnim.x, scaleY: fadeAnim.y, top: y, left: x, zIndex: 2, opacity: opacityAnim}, this.props.fixedPoint]}
              onLayout={this.getmodalLayout.bind(this)}
            >
              {modalChidren}
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default BaseOverlay;

const style = StyleSheet.create({
  box: {
    position: 'relative',
  },
  active: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .3)',
  },
  modalEventBox: {
    position: 'relative',
    flex: 1,
  },
  ghostBox: {
    flex: 1,
    zIndex: 1,
  },
  modalBox: {
    position: 'absolute',
  },
});
