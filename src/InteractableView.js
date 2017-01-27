import React, { Component } from 'react';
import { requireNativeComponent, Animated } from 'react-native';

const NativeInteractableView = requireNativeComponent('InteractableView', null);

export default class InteractableView extends Component {
  constructor(props) {
    super(props);
    if (this.props.animatedValueX || this.props.animatedValueY) {
      this._animatedEvent = Animated.event(
        [{ nativeEvent: {
          x: this.props.animatedValueX,
          y: this.props.animatedValueY
        }}],
        // { useNativeDriver: true }
      );
    }
  }
  render() {
    return (
      <NativeInteractableView
        {...this.props}
        animatedValueX={undefined}
        animatedValueY={undefined}
        onAnimatedEvent={this._animatedEvent}
      />
    );
  }
}
