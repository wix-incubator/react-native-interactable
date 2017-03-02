import React, { Component } from 'react';
import { requireNativeComponent, Animated } from 'react-native';

// const NativeInteractableView = requireNativeComponent('InteractableView', null);

// this is required in order to support native events
const NativeInteractableView = Animated.createAnimatedComponent(requireNativeComponent('InteractableView', null));

export default class InteractableView extends Component {
  constructor(props) {
    super(props);
    if (this.props.animatedValueX || this.props.animatedValueY) {
      this._animatedEvent = Animated.event(
        [{
          nativeEvent: {
            x: this.props.animatedValueX,
            y: this.props.animatedValueY
          }
        }],
        { useNativeDriver: !!this.props.animatedNativeDriver }
      );
    }
  }

  componentWillMount() {
    // this.chokeTheBridge();
  }

  // this helps us verify that useNativeDriver actually works and we don't rely on the bridge
  chokeTheBridge() {
    let j = 0;
    setInterval(() => {
      for (var index = 0; index < 1e9; index++) {
        j++;
      }
    }, 500);
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
