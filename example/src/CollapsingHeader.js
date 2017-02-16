import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Interactable from 'react-native-interactable';

export default class CollapsingHeader extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(0);
  }
  render() {
    return (
      <View style={styles.container}>

          <View style={{backgroundColor: 'red', height: 250, alignItems: 'center'}}>
            <Animated.View style={{
              transform: [
                {
                  translateY: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [-50, -50, 0, 0]
                  })
                },
                {
                  scale: this._deltaY.interpolate({
                    inputRange: [-150, -150, 0, 0],
                    outputRange: [0.3, 0.3, 1, 1]
                  })
                }
              ]
            }}>
              <View style={{width: 150, height: 150, backgroundColor: 'blue', borderRadius: 75, marginTop: 50, borderWidth: 0.5}} />
            </Animated.View>
          </View>

          <Interactable.View
            verticalOnly={true}
            snapTo={[{y: 0}, {y: -150}]}
            limitY={{min: -150}}
            animatedValueY={this._deltaY}>
            <View style={{left: 0, right: 0, height: 650, backgroundColor: '#e0e0e0'}} />
          </Interactable.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
