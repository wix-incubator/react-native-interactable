import React, { Component } from 'react';
import { requireNativeComponent, Animated } from 'react-native';

const NativeInteractableView = requireNativeComponent('InteractableView', null);

/*
// is this required in order to support native events?
const NativeInteractableView = Animated.createAnimatedComponent(requireNativeComponent('InteractableView', null));

// this is a good test to check if our events are native or not
setInterval(() => {
  for (let i=0; i<1e9; i++) {
    let j = 4;
  }
}, 1000);
*/

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
        dragToss={0.1}
        {...this.props}
        animatedValueX={undefined}
        animatedValueY={undefined}
        onAnimatedEvent={this._animatedEvent}
      />
    );
  }
}
